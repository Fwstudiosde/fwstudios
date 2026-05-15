import "server-only";
import {
  callClaude,
  CHATBOT_TOOLS,
  ClaudeMessage,
  ContentBlock,
  extractText,
  extractToolUses,
} from "./claude";
import { ChatbotConfig } from "./types";
import { buildSystemPrompt } from "./prompt";
import { createLead } from "@/lib/storage";
import {
  createBooking,
  defaultSlotWindow,
  formatSlotForHumans,
  getCalApiBase,
  listAvailableSlots,
} from "./cal";
import { getDecryptedCalApiKey } from "./storage";

export type HandleInput = {
  config: ChatbotConfig;
  apiKey: string;
  history: { role: "user" | "assistant"; content: string }[];
  userMessage: string;
  source: string;
  onLead?: (lead: {
    name?: string;
    email?: string;
    message?: string;
  }) => Promise<void>;
};

export type HandleOutput = {
  reply: string;
  inputTokens: number;
  outputTokens: number;
  leadCaptured?: { name?: string; email?: string; message?: string };
  bookingCreated?: {
    slotIso: string;
    name: string;
    email: string;
    bookingId?: string;
  };
};

export async function handleChat(input: HandleInput): Promise<HandleOutput> {
  const { config, apiKey, history, userMessage, source, onLead } = input;

  const { system } = await buildSystemPrompt(config);

  const messages: ClaudeMessage[] = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: userMessage },
  ];

  let inputTokens = 0;
  let outputTokens = 0;
  let leadCaptured: HandleOutput["leadCaptured"];
  let bookingCreated: HandleOutput["bookingCreated"];

  const calLive = Boolean(config.cal.hasApiKey && config.cal.eventTypeId);
  const activeTools = config.toolsEnabled
    ? calLive
      ? CHATBOT_TOOLS.filter((t) => t.name !== "book_meeting")
      : CHATBOT_TOOLS
    : undefined;

  for (let hop = 0; hop < 5; hop++) {
    const res = await callClaude({
      apiKey,
      model: config.model,
      system,
      messages,
      tools: activeTools,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
    });

    inputTokens += res.usage.input_tokens;
    outputTokens += res.usage.output_tokens;

    const toolUses = extractToolUses(res.content);
    if (toolUses.length === 0 || res.stop_reason !== "tool_use") {
      return {
        reply: extractText(res.content),
        inputTokens,
        outputTokens,
        leadCaptured,
        bookingCreated,
      };
    }

    messages.push({ role: "assistant", content: res.content });

    const toolResults: ContentBlock[] = [];
    for (const tu of toolUses) {
      if (tu.name === "capture_lead") {
        const email =
          typeof tu.input.email === "string" ? tu.input.email : undefined;
        const name =
          typeof tu.input.name === "string" ? tu.input.name : undefined;
        const msg =
          typeof tu.input.message === "string" ? tu.input.message : undefined;
        if (!email) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: "error: email is required",
            is_error: true,
          });
          continue;
        }
        try {
          await createLead({
            email,
            name,
            message: msg,
            source: `chatbot:${source}`,
          });
          leadCaptured = { email, name, message: msg };
          if (onLead) await onLead(leadCaptured);
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: "ok: lead saved",
          });
        } catch (err) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: `error: ${
              err instanceof Error ? err.message : String(err)
            }`,
            is_error: true,
          });
        }
      } else if (tu.name === "list_available_slots") {
        const calKey = await getDecryptedCalApiKey();
        if (!calKey || !config.cal.eventTypeId) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content:
              "error: cal_not_configured — fall back to book_meeting and offer the booking URL.",
            is_error: true,
          });
          continue;
        }
        const fromDate =
          typeof tu.input.from_date === "string" ? tu.input.from_date : undefined;
        const toDate =
          typeof tu.input.to_date === "string" ? tu.input.to_date : undefined;
        const window = defaultSlotWindow(config.cal.defaultDaysAhead);
        const startIso = fromDate
          ? new Date(`${fromDate}T00:00:00Z`).toISOString()
          : window.startIso;
        const endIso = toDate
          ? new Date(`${toDate}T23:59:59Z`).toISOString()
          : window.endIso;

        const slotsRes = await listAvailableSlots({
          apiKey: calKey,
          apiBase: getCalApiBase(config.bookingUrl),
          eventTypeId: config.cal.eventTypeId,
          durationMinutes: config.cal.eventDurationMinutes,
          timezone: config.cal.timezone,
          startIso,
          endIso,
        });
        if (!slotsRes.ok) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: `error: ${slotsRes.error}`,
            is_error: true,
          });
          continue;
        }
        const limited = slotsRes.slots.slice(0, 6);
        const formatted = limited.map((s, i) => ({
          n: i + 1,
          start_iso: s.start,
          label: formatSlotForHumans(s.start, config.cal.timezone),
        }));
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: JSON.stringify({
            timezone: config.cal.timezone,
            slots: formatted,
            note:
              formatted.length === 0
                ? "no slots in window — propose a different timeframe or send book_meeting URL"
                : "show 3-4 of these in plain text, ask user which fits",
          }),
        });
      } else if (tu.name === "book_slot") {
        const slotIso =
          typeof tu.input.slot_start_iso === "string"
            ? tu.input.slot_start_iso
            : undefined;
        const name =
          typeof tu.input.name === "string" ? tu.input.name.trim() : undefined;
        const email =
          typeof tu.input.email === "string" ? tu.input.email.trim() : undefined;
        const notes =
          typeof tu.input.notes === "string" ? tu.input.notes : undefined;
        if (!slotIso || !name || !email) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: "error: slot_start_iso, name and email are required",
            is_error: true,
          });
          continue;
        }
        const calKey = await getDecryptedCalApiKey();
        if (!calKey || !config.cal.eventTypeId) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: "error: cal_not_configured",
            is_error: true,
          });
          continue;
        }
        const bookRes = await createBooking({
          apiKey: calKey,
          apiBase: getCalApiBase(config.bookingUrl),
          eventTypeId: config.cal.eventTypeId,
          startIso: slotIso,
          name,
          email,
          timezone: config.cal.timezone,
          notes,
        });
        if (!bookRes.ok) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tu.id,
            content: `error: ${bookRes.error}`,
            is_error: true,
          });
          continue;
        }
        bookingCreated = {
          slotIso,
          name,
          email,
          bookingId: bookRes.bookingId,
        };
        try {
          await createLead({
            email,
            name,
            message: notes ?? `Termin gebucht: ${slotIso}`,
            source: `chatbot-booking:${source}`,
          });
          leadCaptured = { email, name, message: notes };
        } catch {
          // lead creation is best-effort; booking succeeded
        }
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: JSON.stringify({
            ok: true,
            booking_id: bookRes.bookingId,
            confirmation_for: formatSlotForHumans(slotIso, config.cal.timezone),
            note:
              "confirm to user in 1-2 sentences, mention they'll get a Cal email shortly",
          }),
        });
      } else if (tu.name === "book_meeting") {
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: `booking_url: ${config.bookingUrl}`,
        });
      } else {
        toolResults.push({
          type: "tool_result",
          tool_use_id: tu.id,
          content: "error: unknown tool",
          is_error: true,
        });
      }
    }

    messages.push({ role: "user", content: toolResults });
  }

  return {
    reply: calLive
      ? "Hmm, das hat gerade nicht geklappt. Magst du es nochmal kurz anders formulieren? Dann schauen wir gemeinsam, welcher Termin passt."
      : "Hmm, das hat gerade nicht geklappt. Magst du es nochmal kurz anders formulieren — oder ich schick dir den direkten Buchungslink?",
    inputTokens,
    outputTokens,
    leadCaptured,
    bookingCreated,
  };
}

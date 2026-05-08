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

  for (let hop = 0; hop < 3; hop++) {
    const res = await callClaude({
      apiKey,
      model: config.model,
      system,
      messages,
      tools: config.toolsEnabled ? CHATBOT_TOOLS : undefined,
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
    reply:
      "Entschuldigung — die Konversation wurde abgebrochen, weil zu viele Tool-Aufrufe nacheinander nötig waren. Bitte stell deine Frage nochmal kürzer oder buche direkt einen Termin.",
    inputTokens,
    outputTokens,
    leadCaptured,
  };
}

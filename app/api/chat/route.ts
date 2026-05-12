import { NextResponse } from "next/server";
import {
  appendMessage,
  getChatbotConfig,
  getConversationBySession,
  getDecryptedApiKey,
  markConversationBooking,
  markConversationLead,
} from "@/lib/chatbot/storage";
import { handleChat } from "@/lib/chatbot/handle";

export const dynamic = "force-dynamic";

const MAX_INPUT = 4000;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    sessionId?: string;
    message?: string;
  } | null;

  if (
    !body ||
    typeof body.sessionId !== "string" ||
    body.sessionId.length < 8 ||
    typeof body.message !== "string" ||
    !body.message.trim()
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const sessionId = body.sessionId.slice(0, 64);
  const userMessage = body.message.slice(0, MAX_INPUT).trim();

  const config = await getChatbotConfig();
  const apiKey = await getDecryptedApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "Der Chatbot ist gerade nicht konfiguriert. Bitte schreibe uns kurz an hello@fwstudios.de — wir melden uns innerhalb von 24h.",
        configured: false,
      },
      { status: 200 }
    );
  }

  const existing = await getConversationBySession(sessionId);
  const history =
    existing?.messages.map((m) => ({ role: m.role, content: m.content })) ??
    [];

  const meta = {
    ua: req.headers.get("user-agent") ?? undefined,
    referer: req.headers.get("referer") ?? undefined,
  };

  const userTs = new Date().toISOString();
  await appendMessage(
    sessionId,
    { role: "user", content: userMessage, ts: userTs },
    meta
  );

  try {
    const out = await handleChat({
      config,
      apiKey,
      history,
      userMessage,
      source: meta.referer ?? "widget",
    });

    await appendMessage(sessionId, {
      role: "assistant",
      content: out.reply,
      ts: new Date().toISOString(),
      inputTokens: out.inputTokens,
      outputTokens: out.outputTokens,
    });

    if (out.leadCaptured) {
      await markConversationLead(sessionId, out.leadCaptured);
    }
    if (out.bookingCreated) {
      await markConversationBooking(sessionId, out.bookingCreated);
    }

    return NextResponse.json({
      reply: out.reply,
      leadCaptured: out.leadCaptured ?? null,
      bookingCreated: out.bookingCreated ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        reply:
          "Sorry — beim Verarbeiten ist ein Fehler aufgetreten. Probier es bitte gleich noch mal oder schreib uns an hello@fwstudios.de.",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 200 }
    );
  }
}

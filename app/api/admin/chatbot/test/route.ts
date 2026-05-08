import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getChatbotConfig,
  getDecryptedApiKey,
} from "@/lib/chatbot/storage";
import { handleChat } from "@/lib/chatbot/handle";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as {
    history?: { role: "user" | "assistant"; content: string }[];
    message?: string;
  } | null;

  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const config = await getChatbotConfig();
  const apiKey = await getDecryptedApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "API-Key nicht gesetzt." },
      { status: 400 }
    );
  }

  try {
    const out = await handleChat({
      config,
      apiKey,
      history: body.history ?? [],
      userMessage: body.message.slice(0, 4000).trim(),
      source: "playground",
    });
    return NextResponse.json(out);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

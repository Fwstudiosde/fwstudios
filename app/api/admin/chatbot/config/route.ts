import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getChatbotConfig,
  setChatbotConfig,
} from "@/lib/chatbot/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cfg = await getChatbotConfig();
  return NextResponse.json({
    ...cfg,
    apiKeyEnc: undefined,
  });
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Record<string, unknown>;
  const patch: Parameters<typeof setChatbotConfig>[0] = {};

  if (typeof body.model === "string") patch.model = body.model;
  if (typeof body.temperature === "number") patch.temperature = body.temperature;
  if (typeof body.maxTokens === "number") patch.maxTokens = body.maxTokens;
  if (typeof body.systemPrompt === "string") patch.systemPrompt = body.systemPrompt;
  if (typeof body.welcomeMessage === "string")
    patch.welcomeMessage = body.welcomeMessage;
  if (typeof body.toolsEnabled === "boolean") patch.toolsEnabled = body.toolsEnabled;
  if (typeof body.bookingUrl === "string") patch.bookingUrl = body.bookingUrl;
  if (
    body.leadCapture &&
    typeof body.leadCapture === "object" &&
    body.leadCapture !== null
  ) {
    const lc = body.leadCapture as Record<string, unknown>;
    patch.leadCapture = {
      enabled: typeof lc.enabled === "boolean" ? lc.enabled : true,
      triggerHint:
        typeof lc.triggerHint === "string" ? lc.triggerHint : "",
    };
  }

  if ("apiKey" in body) {
    if (body.apiKey === null || body.apiKey === "") {
      patch.apiKey = null;
    } else if (typeof body.apiKey === "string" && body.apiKey.startsWith("sk-")) {
      patch.apiKey = body.apiKey;
    }
  }

  const next = await setChatbotConfig(patch);
  return NextResponse.json({ ...next, apiKeyEnc: undefined });
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getChatbotConfig,
  setChatbotConfig,
} from "@/lib/chatbot/storage";

export const dynamic = "force-dynamic";

function sanitize<T extends { apiKeyEnc?: unknown; cal?: { apiKeyEnc?: unknown } }>(
  cfg: T
) {
  return {
    ...cfg,
    apiKeyEnc: undefined,
    cal: cfg.cal ? { ...cfg.cal, apiKeyEnc: undefined } : undefined,
  };
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cfg = await getChatbotConfig();
  return NextResponse.json(sanitize(cfg));
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

  if (body.cal && typeof body.cal === "object" && body.cal !== null) {
    const c = body.cal as Record<string, unknown>;
    const current = (await getChatbotConfig()).cal;
    patch.cal = {
      apiKeyEnc: current.apiKeyEnc,
      hasApiKey: current.hasApiKey,
      eventTypeId:
        typeof c.eventTypeId === "string"
          ? c.eventTypeId.trim()
          : current.eventTypeId,
      eventDurationMinutes:
        typeof c.eventDurationMinutes === "number"
          ? c.eventDurationMinutes
          : current.eventDurationMinutes,
      timezone:
        typeof c.timezone === "string" && c.timezone.trim()
          ? c.timezone.trim()
          : current.timezone,
      defaultDaysAhead:
        typeof c.defaultDaysAhead === "number"
          ? Math.max(1, Math.min(60, c.defaultDaysAhead))
          : current.defaultDaysAhead,
    };
  }

  if (body.teaser && typeof body.teaser === "object" && body.teaser !== null) {
    const t = body.teaser as Record<string, unknown>;
    patch.teaser = {
      enabled: typeof t.enabled === "boolean" ? t.enabled : true,
      message:
        typeof t.message === "string" && t.message.trim()
          ? t.message.slice(0, 200)
          : "Hi, kann ich dir helfen?",
      delaySeconds:
        typeof t.delaySeconds === "number"
          ? Math.max(0, Math.min(120, Math.round(t.delaySeconds)))
          : 5,
    };
  }

  if ("apiKey" in body) {
    if (body.apiKey === null || body.apiKey === "") {
      patch.apiKey = null;
    } else if (typeof body.apiKey === "string" && body.apiKey.startsWith("sk-")) {
      patch.apiKey = body.apiKey;
    }
  }

  if ("calApiKey" in body) {
    if (body.calApiKey === null || body.calApiKey === "") {
      patch.calApiKey = null;
    } else if (typeof body.calApiKey === "string" && body.calApiKey.length >= 8) {
      patch.calApiKey = body.calApiKey;
    }
  }

  const next = await setChatbotConfig(patch);
  return NextResponse.json(sanitize(next));
}

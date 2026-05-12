import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  getChatbotConfig,
  getDecryptedCalApiKey,
} from "@/lib/chatbot/storage";
import {
  defaultSlotWindow,
  formatSlotForHumans,
  listAvailableSlots,
} from "@/lib/chatbot/cal";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const config = await getChatbotConfig();
  const apiKey = await getDecryptedCalApiKey();

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Kein Cal API-Key hinterlegt." },
      { status: 200 }
    );
  }
  if (!config.cal.eventTypeId) {
    return NextResponse.json(
      { ok: false, error: "Event-Type-ID fehlt." },
      { status: 200 }
    );
  }

  const { startIso, endIso } = defaultSlotWindow(config.cal.defaultDaysAhead);
  const res = await listAvailableSlots({
    apiKey,
    eventTypeId: config.cal.eventTypeId,
    durationMinutes: config.cal.eventDurationMinutes,
    timezone: config.cal.timezone,
    startIso,
    endIso,
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: res.error }, { status: 200 });
  }

  const preview = res.slots.slice(0, 5).map((s) => ({
    iso: s.start,
    label: formatSlotForHumans(s.start, config.cal.timezone),
  }));

  return NextResponse.json({
    ok: true,
    totalSlots: res.slots.length,
    preview,
    timezone: config.cal.timezone,
  });
}

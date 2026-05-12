import "server-only";

const CAL_API_BASE = "https://api.cal.com/v2";
const SLOTS_API_VERSION = "2024-09-04";
const BOOKINGS_API_VERSION = "2024-08-13";

export type CalSlot = {
  start: string;
  end?: string;
};

export type CalListSlotsInput = {
  apiKey: string;
  eventTypeId: string;
  durationMinutes: number;
  timezone: string;
  startIso: string;
  endIso: string;
};

export type CalListSlotsResult = {
  ok: true;
  slots: CalSlot[];
} | {
  ok: false;
  error: string;
};

type SlotsResponse = {
  status?: string;
  data?:
    | Record<string, Array<{ time?: string; start?: string }>>
    | Array<{ time?: string; start?: string }>;
  error?: { message?: string };
};

export async function listAvailableSlots(
  input: CalListSlotsInput
): Promise<CalListSlotsResult> {
  const params = new URLSearchParams({
    eventTypeId: String(input.eventTypeId),
    start: input.startIso,
    end: input.endIso,
    timeZone: input.timezone,
  });

  let res: Response;
  try {
    res = await fetch(`${CAL_API_BASE}/slots?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "cal-api-version": SLOTS_API_VERSION,
      },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "network error",
    };
  }

  const text = await res.text();
  let json: SlotsResponse;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: `Cal API ${res.status}: ${text.slice(0, 200)}` };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: json.error?.message ?? `Cal API ${res.status}`,
    };
  }

  const flat: CalSlot[] = [];
  const data = json.data;
  if (Array.isArray(data)) {
    for (const entry of data) {
      const t = entry.time ?? entry.start;
      if (t) flat.push({ start: t });
    }
  } else if (data && typeof data === "object") {
    for (const list of Object.values(data)) {
      for (const entry of list) {
        const t = entry.time ?? entry.start;
        if (t) flat.push({ start: t });
      }
    }
  }

  flat.sort((a, b) => a.start.localeCompare(b.start));
  return { ok: true, slots: flat };
}

export type CalCreateBookingInput = {
  apiKey: string;
  eventTypeId: string;
  startIso: string;
  name: string;
  email: string;
  timezone: string;
  notes?: string;
};

export type CalCreateBookingResult =
  | { ok: true; bookingId: string; rescheduleUrl?: string }
  | { ok: false; error: string };

type BookingResponse = {
  status?: string;
  data?: {
    id?: number | string;
    uid?: string;
    rescheduleUri?: string;
    rescheduleUrl?: string;
  };
  error?: { message?: string };
};

export async function createBooking(
  input: CalCreateBookingInput
): Promise<CalCreateBookingResult> {
  const body = {
    start: input.startIso,
    eventTypeId: Number(input.eventTypeId) || input.eventTypeId,
    attendee: {
      name: input.name,
      email: input.email,
      timeZone: input.timezone,
      language: "de",
    },
    bookingFieldsResponses: input.notes ? { notes: input.notes } : undefined,
  };

  let res: Response;
  try {
    res = await fetch(`${CAL_API_BASE}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "cal-api-version": BOOKINGS_API_VERSION,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "network error",
    };
  }

  const text = await res.text();
  let json: BookingResponse;
  try {
    json = JSON.parse(text);
  } catch {
    return { ok: false, error: `Cal API ${res.status}: ${text.slice(0, 200)}` };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: json.error?.message ?? `Cal API ${res.status}`,
    };
  }

  const id = json.data?.uid ?? (json.data?.id ? String(json.data.id) : "");
  if (!id) {
    return { ok: false, error: "Cal API returned no booking id" };
  }
  return {
    ok: true,
    bookingId: id,
    rescheduleUrl: json.data?.rescheduleUrl ?? json.data?.rescheduleUri,
  };
}

export function defaultSlotWindow(daysAhead: number): {
  startIso: string;
  endIso: string;
} {
  const now = new Date();
  const end = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);
  return { startIso: now.toISOString(), endIso: end.toISOString() };
}

export function formatSlotForHumans(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(d);
  } catch {
    return iso;
  }
}

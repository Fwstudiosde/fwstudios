import "server-only";

const SLOTS_API_VERSION = "2024-09-04";
const BOOKINGS_API_VERSION = "2024-08-13";
const EVENT_TYPES_API_VERSION = "2024-06-14";

export function getCalApiBase(bookingUrl: string): string {
  try {
    const host = new URL(bookingUrl).hostname.toLowerCase();
    if (host === "cal.eu" || host.endsWith(".cal.eu")) {
      return "https://api.cal.eu/v2";
    }
  } catch {
    // fall through to default
  }
  return "https://api.cal.com/v2";
}

export type ParsedEventType =
  | { kind: "id"; id: string }
  | { kind: "slug"; username: string; slug: string }
  | { kind: "invalid"; reason: string };

export function parseEventTypeInput(raw: string): ParsedEventType {
  const trimmed = raw.trim();
  if (!trimmed) return { kind: "invalid", reason: "leer" };
  if (/^\d+$/.test(trimmed)) return { kind: "id", id: trimmed };

  let pathPart = trimmed;
  const looksLikeUrl =
    trimmed.includes("://") || /^(www\.|cal\.|app\.cal\.)/i.test(trimmed);
  if (looksLikeUrl) {
    try {
      const url = new URL(
        trimmed.includes("://") ? trimmed : `https://${trimmed}`
      );
      pathPart = url.pathname;
    } catch {
      // fall through; treat as path
    }
  }

  const parts = pathPart
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);
  if (parts.length >= 2) {
    return { kind: "slug", username: parts[0], slug: parts[1] };
  }
  return {
    kind: "invalid",
    reason: "Erwartet: Zahl, username/event-slug oder vollständige Cal-URL",
  };
}

export type ResolveEventTypeInput = {
  apiKey: string;
  apiBase: string;
  raw: string;
};

export type ResolveEventTypeResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function resolveEventTypeId(
  input: ResolveEventTypeInput
): Promise<ResolveEventTypeResult> {
  const parsed = parseEventTypeInput(input.raw);
  if (parsed.kind === "id") return { ok: true, id: parsed.id };
  if (parsed.kind === "invalid") return { ok: false, error: parsed.reason };

  const params = new URLSearchParams({ username: parsed.username });
  let res: Response;
  try {
    res = await fetch(`${input.apiBase}/event-types?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        "cal-api-version": EVENT_TYPES_API_VERSION,
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
  let json: {
    data?:
      | Array<{ id?: number | string; slug?: string }>
      | { eventTypes?: Array<{ id?: number | string; slug?: string }> };
    error?: { message?: string };
  };
  try {
    json = JSON.parse(text);
  } catch {
    return {
      ok: false,
      error: `Cal event-types ${res.status}: ${text.slice(0, 200)}`,
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      error: json.error?.message ?? `Cal event-types ${res.status}`,
    };
  }

  const list = Array.isArray(json.data)
    ? json.data
    : json.data?.eventTypes ?? [];
  const match = list.find((et) => et.slug === parsed.slug);
  if (!match || match.id == null) {
    const available = list
      .map((et) => et.slug)
      .filter(Boolean)
      .slice(0, 5)
      .join(", ");
    return {
      ok: false,
      error: available
        ? `Event-Type "${parsed.slug}" nicht gefunden für "${parsed.username}". Verfügbar: ${available}`
        : `Keine Event-Types für User "${parsed.username}" gefunden — stimmt der Username?`,
    };
  }
  return { ok: true, id: String(match.id) };
}

export type CalSlot = {
  start: string;
  end?: string;
};

export type CalListSlotsInput = {
  apiKey: string;
  apiBase: string;
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
  const resolved = await resolveEventTypeId({
    apiKey: input.apiKey,
    apiBase: input.apiBase,
    raw: input.eventTypeId,
  });
  if (!resolved.ok) return { ok: false, error: resolved.error };

  const params = new URLSearchParams({
    eventTypeId: resolved.id,
    start: input.startIso,
    end: input.endIso,
    timeZone: input.timezone,
  });

  let res: Response;
  try {
    res = await fetch(`${input.apiBase}/slots?${params.toString()}`, {
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
  apiBase: string;
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
  const resolved = await resolveEventTypeId({
    apiKey: input.apiKey,
    apiBase: input.apiBase,
    raw: input.eventTypeId,
  });
  if (!resolved.ok) return { ok: false, error: resolved.error };

  const body = {
    start: input.startIso,
    eventTypeId: Number(resolved.id),
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
    res = await fetch(`${input.apiBase}/bookings`, {
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

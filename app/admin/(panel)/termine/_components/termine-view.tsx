"use client";

import * as React from "react";
import {
  Clock,
  Mail,
  User,
  Bot,
  ExternalLink,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  CalendarDays,
  CalendarClock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { CalBooking, CalSlot } from "@/lib/chatbot/cal";
import type { ChatbotBookingRef } from "../page";
import { StatCard } from "../../../_components/page-header";

type Tab = "upcoming" | "past" | "free";

export function TermineView({
  bookings,
  slots,
  timezone,
  bookingUrl,
  chatbotRefs,
  bookingsError,
  slotsError,
  eventDurationMinutes,
  slotWindowDays,
}: {
  bookings: CalBooking[];
  slots: CalSlot[];
  timezone: string;
  bookingUrl: string;
  chatbotRefs: ChatbotBookingRef[];
  bookingsError: string | null;
  slotsError: string | null;
  eventDurationMinutes: number;
  slotWindowDays: number;
}) {
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("upcoming");
  const [refreshing, setRefreshing] = React.useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      router.refresh();
      await new Promise((r) => setTimeout(r, 400));
    } finally {
      setRefreshing(false);
    }
  }

  const now = Date.now();
  const upcoming = bookings
    .filter(
      (b) =>
        new Date(b.start).getTime() >= now &&
        b.status !== "cancelled" &&
        b.status !== "rejected"
    )
    .sort((a, b) => a.start.localeCompare(b.start));
  const past = bookings
    .filter((b) => new Date(b.start).getTime() < now)
    .sort((a, b) => b.start.localeCompare(a.start));
  const cancelled = bookings.filter(
    (b) => b.status === "cancelled" || b.status === "rejected"
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const weekEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const todayCount = upcoming.filter((b) => {
    const t = new Date(b.start);
    return t >= today && t < tomorrow;
  }).length;
  const weekCount = upcoming.filter(
    (b) => new Date(b.start) < weekEnd
  ).length;
  const monthCount = upcoming.filter(
    (b) => new Date(b.start) < monthEnd
  ).length;

  const refByBookingId = new Map(
    chatbotRefs.filter((r) => r.bookingId).map((r) => [r.bookingId!, r])
  );
  const refByEmailSlot = new Map(
    chatbotRefs.map((r) => [`${r.email.toLowerCase()}|${r.slotIso}`, r])
  );
  function lookupRef(b: CalBooking): ChatbotBookingRef | undefined {
    const bookingKey = b.uid ?? (b.id != null ? String(b.id) : "");
    if (bookingKey && refByBookingId.has(bookingKey)) {
      return refByBookingId.get(bookingKey);
    }
    const attendee = b.attendees?.[0];
    if (attendee?.email) {
      const k = `${attendee.email.toLowerCase()}|${b.start}`;
      if (refByEmailSlot.has(k)) return refByEmailSlot.get(k);
    }
    return undefined;
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Heute"
          value={todayCount}
          hint={todayCount === 0 ? "Kein Termin heute" : "Termine heute"}
        />
        <StatCard
          label="Diese Woche"
          value={weekCount}
          hint="Nächste 7 Tage"
        />
        <StatCard
          label="Diesen Monat"
          value={monthCount}
          hint="Bis Monatsende"
        />
        <StatCard
          label="Freie Slots"
          value={slots.length}
          hint={`In ${slotWindowDays} Tagen`}
        />
      </div>

      {(bookingsError || slotsError) && (
        <div className="mt-6 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <div className="space-y-1">
            {bookingsError && <div>Buchungen: {bookingsError}</div>}
            {slotsError && <div>Slots: {slotsError}</div>}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-border bg-white/[0.02] p-1">
          <TabButton
            active={tab === "upcoming"}
            onClick={() => setTab("upcoming")}
            icon={<CalendarClock className="size-3.5" />}
            label={`Anstehend (${upcoming.length})`}
          />
          <TabButton
            active={tab === "free"}
            onClick={() => setTab("free")}
            icon={<Clock className="size-3.5" />}
            label={`Freie Slots (${slots.length})`}
          />
          <TabButton
            active={tab === "past"}
            onClick={() => setTab("past")}
            icon={<CalendarDays className="size-3.5" />}
            label={`Vergangen (${past.length})`}
          />
        </div>
        <button
          onClick={refresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-white/[0.02] px-3 py-2 text-xs font-medium text-fg-muted hover:bg-white/[0.04] hover:text-fg disabled:opacity-60"
        >
          <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
          Aktualisieren
        </button>
      </div>

      <div className="mt-5">
        {tab === "upcoming" && (
          <BookingList
            bookings={upcoming}
            timezone={timezone}
            emptyText="Keine anstehenden Termine. Sobald jemand bucht, taucht's hier auf."
            lookupRef={lookupRef}
            highlightToday
          />
        )}
        {tab === "past" && (
          <BookingList
            bookings={past}
            timezone={timezone}
            emptyText="Noch keine vergangenen Termine."
            lookupRef={lookupRef}
            muted
          />
        )}
        {tab === "free" && (
          <FreeSlotsGrid
            slots={slots}
            timezone={timezone}
            bookingUrl={bookingUrl}
            durationMinutes={eventDurationMinutes}
          />
        )}
      </div>

      {tab === "upcoming" && cancelled > 0 && (
        <p className="mt-4 text-xs text-fg-subtle">
          {cancelled} abgesagte/abgelehnte Termine im Zeitraum ausgeblendet.
        </p>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-white/[0.08] text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
          : "text-fg-muted hover:text-fg"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function BookingList({
  bookings,
  timezone,
  emptyText,
  lookupRef,
  highlightToday,
  muted,
}: {
  bookings: CalBooking[];
  timezone: string;
  emptyText: string;
  lookupRef: (b: CalBooking) => ChatbotBookingRef | undefined;
  highlightToday?: boolean;
  muted?: boolean;
}) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/[0.01] p-10 text-center text-sm text-fg-muted">
        {emptyText}
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  const groups = new Map<string, CalBooking[]>();
  for (const b of bookings) {
    const key = dayKey(b.start, timezone);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(b);
  }

  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([day, items]) => {
        const firstStart = new Date(items[0].start);
        const isToday =
          highlightToday && firstStart >= today && firstStart < tomorrow;
        return (
          <div key={day}>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                {formatDayHeading(items[0].start, timezone)}
              </h3>
              {isToday && (
                <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand">
                  Heute
                </span>
              )}
              <span className="text-xs text-fg-subtle">· {items.length}</span>
            </div>
            <div className="space-y-2.5">
              {items.map((b) => (
                <BookingCard
                  key={String(b.uid ?? b.id) + b.start}
                  booking={b}
                  timezone={timezone}
                  ref_={lookupRef(b)}
                  muted={muted}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BookingCard({
  booking,
  timezone,
  ref_,
  muted,
}: {
  booking: CalBooking;
  timezone: string;
  ref_?: ChatbotBookingRef;
  muted?: boolean;
}) {
  const attendee = booking.attendees?.[0];
  const start = new Date(booking.start);
  const end = booking.end ? new Date(booking.end) : null;
  const cancelled =
    booking.status === "cancelled" || booking.status === "rejected";
  const pending = booking.status === "pending";

  const timeLabel = end
    ? `${formatTime(start, timezone)} – ${formatTime(end, timezone)}`
    : formatTime(start, timezone);

  return (
    <div
      className={`group relative rounded-2xl border bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] ${
        cancelled
          ? "border-border opacity-60"
          : pending
            ? "border-warning/30"
            : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex shrink-0 flex-col items-center rounded-xl border border-border bg-bg/40 px-3 py-2 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg-subtle">
            {start.toLocaleDateString("de-DE", {
              weekday: "short",
              timeZone: timezone,
            })}
          </span>
          <span className="font-display text-xl font-semibold text-fg">
            {start.toLocaleDateString("de-DE", {
              day: "2-digit",
              timeZone: timezone,
            })}
          </span>
          <span className="text-[10px] uppercase text-fg-subtle">
            {start.toLocaleDateString("de-DE", {
              month: "short",
              timeZone: timezone,
            })}
          </span>
        </div>

        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h4
              className={`font-display text-base font-semibold ${
                muted ? "text-fg-muted" : "text-fg"
              } ${cancelled ? "line-through" : ""}`}
            >
              {booking.title?.trim() ||
                booking.eventType?.slug ||
                "Termin"}
            </h4>
            <StatusBadge status={booking.status} />
            {ref_ && (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-brand"
                title="Aus Chatbot-Gespräch gebucht"
              >
                <Bot className="size-3" />
                Chatbot
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {timeLabel}
              {booking.duration ? ` · ${booking.duration} Min` : ""}
            </span>
            {attendee?.name && (
              <span className="inline-flex items-center gap-1.5">
                <User className="size-3.5" />
                {attendee.name}
              </span>
            )}
            {attendee?.email && (
              <a
                href={`mailto:${attendee.email}`}
                className="inline-flex items-center gap-1.5 hover:text-fg"
              >
                <Mail className="size-3.5" />
                {attendee.email}
              </a>
            )}
            {attendee?.timeZone &&
              attendee.timeZone !== timezone && (
                <span className="text-fg-subtle">TZ: {attendee.timeZone}</span>
              )}
          </div>

          {booking.description && (
            <p className="line-clamp-2 text-xs text-fg-muted">
              {booking.description}
            </p>
          )}

          {booking.cancellationReason && (
            <p className="text-xs text-danger">
              Grund: {booking.cancellationReason}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {booking.meetingUrl && !cancelled && (
            <a
              href={booking.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/[0.02] px-2.5 py-1.5 text-xs text-fg hover:bg-white/[0.06]"
            >
              <ExternalLink className="size-3.5" />
              Meeting öffnen
            </a>
          )}
          {(booking.rescheduleUrl ?? booking.rescheduleUri) && !cancelled && (
            <CopyLinkButton
              url={(booking.rescheduleUrl ?? booking.rescheduleUri) as string}
              label="Reschedule-Link"
            />
          )}
          {booking.uid && (
            <span className="font-mono text-[10px] text-fg-subtle">
              {booking.uid.slice(0, 10)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const map: Record<string, { label: string; cls: string }> = {
    accepted: { label: "Bestätigt", cls: "bg-success/15 text-success" },
    pending: { label: "Ausstehend", cls: "bg-warning/15 text-warning" },
    cancelled: { label: "Abgesagt", cls: "bg-danger/15 text-danger" },
    rejected: { label: "Abgelehnt", cls: "bg-danger/15 text-danger" },
    awaiting_host: {
      label: "Wartet auf Host",
      cls: "bg-warning/15 text-warning",
    },
  };
  const entry = map[status] ?? {
    label: status,
    cls: "bg-white/[0.06] text-fg-muted",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${entry.cls}`}
    >
      {entry.label}
    </span>
  );
}

function CopyLinkButton({ url, label }: { url: string; label: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white/[0.02] px-2.5 py-1.5 text-xs text-fg-muted hover:text-fg"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-success" /> Kopiert
        </>
      ) : (
        <>
          <Copy className="size-3.5" /> {label}
        </>
      )}
    </button>
  );
}

function FreeSlotsGrid({
  slots,
  timezone,
  bookingUrl,
  durationMinutes,
}: {
  slots: CalSlot[];
  timezone: string;
  bookingUrl: string;
  durationMinutes: number;
}) {
  if (slots.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-white/[0.01] p-10 text-center text-sm text-fg-muted">
        Keine freien Slots im konfigurierten Fenster. Prüf deine
        Verfügbarkeit in Cal.com.
      </div>
    );
  }

  const groups = new Map<string, CalSlot[]>();
  for (const s of slots) {
    const key = dayKey(s.start, timezone);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs text-fg-subtle">
        <span>
          {slots.length} freie Slots · Termindauer {durationMinutes} Min
        </span>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-fg-muted hover:text-fg"
        >
          <ExternalLink className="size-3.5" />
          Buchungsseite öffnen
        </a>
      </div>
      {Array.from(groups.entries()).map(([day, items]) => (
        <div key={day}>
          <h3 className="font-display mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            {formatDayHeading(items[0].start, timezone)}
            <span className="ml-2 normal-case text-fg-subtle">
              · {items.length} Slots
            </span>
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {items.map((s) => (
              <div
                key={s.start}
                className="rounded-lg border border-border bg-white/[0.02] px-2.5 py-1.5 text-center text-xs text-fg"
              >
                {formatTime(new Date(s.start), timezone)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function dayKey(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: timezone,
    }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
}

function formatDayHeading(iso: string, timezone: string): string {
  const d = new Date(iso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
  const dayAfter = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

  if (d >= today && d < tomorrow) return "Heute";
  if (d >= tomorrow && d < dayAfter) return "Morgen";
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: timezone,
  }).format(d);
}

function formatTime(d: Date, timezone: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  }).format(d);
}


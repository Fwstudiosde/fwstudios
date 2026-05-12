import Link from "next/link";
import { CalendarX } from "lucide-react";
import {
  getCalApiBase,
  listAvailableSlots,
  listBookings,
  type CalBooking,
  type CalSlot,
} from "@/lib/chatbot/cal";
import {
  getChatbotConfig,
  getDecryptedCalApiKey,
  listConversations,
} from "@/lib/chatbot/storage";
import { PageHeader } from "../../_components/page-header";
import { TermineView } from "./_components/termine-view";

export const metadata = { title: "Termine" };
export const dynamic = "force-dynamic";

export type ChatbotBookingRef = {
  conversationId: string;
  sessionId: string;
  slotIso: string;
  email: string;
  bookingId?: string;
};

export default async function TerminePage() {
  const config = await getChatbotConfig();
  const apiKey = await getDecryptedCalApiKey();

  if (!apiKey || !config.cal.eventTypeId) {
    return (
      <>
        <PageHeader
          title="Termine"
          description="Anstehende und vergangene Termine — direkt aus Cal.com."
        />
        <div className="rounded-2xl border border-dashed border-border bg-white/[0.02] p-10 text-center">
          <CalendarX className="mx-auto mb-3 size-8 text-fg-subtle" />
          <h2 className="font-display text-lg font-semibold text-fg">
            Cal.com noch nicht verbunden
          </h2>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-fg-muted">
            Hinterleg in der Chatbot-Konfiguration deinen Cal API-Key und
            Event-Type, damit hier deine Termine erscheinen.
          </p>
          <Link
            href="/admin/chatbot"
            className="mt-4 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand/90"
          >
            Zur Chatbot-Konfiguration
          </Link>
        </div>
      </>
    );
  }

  const apiBase = getCalApiBase(config.bookingUrl);
  const now = new Date();
  const past = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const future = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  const slotWindowEnd = new Date(
    now.getTime() + config.cal.defaultDaysAhead * 24 * 60 * 60 * 1000
  );

  const [bookingsRes, slotsRes, conversations] = await Promise.all([
    listBookings({
      apiKey,
      apiBase,
      afterStartIso: past.toISOString(),
      beforeStartIso: future.toISOString(),
      take: 100,
    }),
    listAvailableSlots({
      apiKey,
      apiBase,
      eventTypeId: config.cal.eventTypeId,
      durationMinutes: config.cal.eventDurationMinutes,
      timezone: config.cal.timezone,
      startIso: now.toISOString(),
      endIso: slotWindowEnd.toISOString(),
    }),
    listConversations(),
  ]);

  const bookings: CalBooking[] = bookingsRes.ok ? bookingsRes.bookings : [];
  const slots: CalSlot[] = slotsRes.ok ? slotsRes.slots : [];
  const bookingsError = bookingsRes.ok ? null : bookingsRes.error;
  const slotsError = slotsRes.ok ? null : slotsRes.error;

  const chatbotRefs: ChatbotBookingRef[] = conversations
    .filter((c) => c.bookingCreated)
    .map((c) => ({
      conversationId: c.id,
      sessionId: c.sessionId,
      slotIso: c.bookingCreated!.slotIso,
      email: c.bookingCreated!.email,
      bookingId: c.bookingCreated!.bookingId,
    }));

  return (
    <>
      <PageHeader
        title="Termine"
        description={`Live aus Cal.com (${config.cal.timezone}). Hier siehst du, was gebucht ist und was offen ist.`}
      />
      <TermineView
        bookings={bookings}
        slots={slots}
        timezone={config.cal.timezone}
        bookingUrl={config.bookingUrl}
        chatbotRefs={chatbotRefs}
        bookingsError={bookingsError}
        slotsError={slotsError}
        eventDurationMinutes={config.cal.eventDurationMinutes}
        slotWindowDays={config.cal.defaultDaysAhead}
      />
    </>
  );
}

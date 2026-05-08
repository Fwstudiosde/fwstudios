import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, ExternalLink } from "lucide-react";
import { getLead, listActivities } from "@/lib/storage";
import { LeadTimeline } from "./_components/lead-timeline";

export const metadata = { title: "Lead" };
export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const activities = await listActivities(id);

  return (
    <>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-3.5" /> Zurück zum Dashboard
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-fg">
            {lead.name || lead.company || lead.email}
          </h1>
          <div className="mt-1 text-sm text-fg-muted">
            Lead-ID: <span className="font-mono text-xs">{lead.id}</span>
          </div>

          {lead.message && (
            <div className="mt-6 rounded-2xl border border-border bg-white/[0.02] p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Nachricht
              </div>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-fg">
                {lead.message}
              </p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display mb-4 text-lg font-semibold text-fg">
              Timeline
            </h2>
            <LeadTimeline leadId={lead.id} initial={activities} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Kontakt
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {lead.email && (
                <li>
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-2 text-fg hover:text-brand"
                  >
                    <Mail className="size-3.5 text-fg-muted" /> {lead.email}
                  </a>
                </li>
              )}
              {lead.phone && (
                <li>
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center gap-2 text-fg hover:text-brand"
                  >
                    <Phone className="size-3.5 text-fg-muted" /> {lead.phone}
                  </a>
                </li>
              )}
              {lead.website && (
                <li>
                  <a
                    href={
                      lead.website.startsWith("http")
                        ? lead.website
                        : `https://${lead.website}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-fg hover:text-brand"
                  >
                    <ExternalLink className="size-3.5 text-fg-muted" />{" "}
                    {lead.website}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Details
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <Pair label="Status" value={lead.status} />
              <Pair label="Quelle" value={lead.source} />
              <Pair
                label="Eingegangen"
                value={new Date(lead.createdAt).toLocaleString("de-DE")}
              />
              {lead.company && <Pair label="Unternehmen" value={lead.company} />}
            </dl>
          </div>
        </aside>
      </div>
    </>
  );
}

function Pair({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-fg-muted">{label}</dt>
      <dd className="text-fg">{value}</dd>
    </div>
  );
}

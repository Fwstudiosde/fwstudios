import { listNewsletter } from "@/lib/storage";
import { PageHeader, StatCard } from "../../_components/page-header";

export const metadata = { title: "Newsletter" };
export const dynamic = "force-dynamic";

export default async function NewsletterPage() {
  const subs = await listNewsletter();
  return (
    <>
      <PageHeader
        title="Newsletter"
        description="Liste aller Anmeldungen — Export per CSV-Copy."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Abonnenten" value={subs.length} />
        <StatCard
          label="Diese Woche"
          value={
            subs.filter(
              (s) =>
                Date.now() - new Date(s.createdAt).getTime() <
                7 * 24 * 3600_000
            ).length
          }
        />
        <StatCard
          label="Diesen Monat"
          value={
            subs.filter(
              (s) =>
                Date.now() - new Date(s.createdAt).getTime() <
                30 * 24 * 3600_000
            ).length
          }
        />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
        {subs.length === 0 ? (
          <div className="p-12 text-center text-sm text-fg-muted">
            Noch keine Anmeldungen.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-white/[0.02] text-left text-xs uppercase tracking-wider text-fg-subtle">
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Quelle</th>
                <th className="px-4 py-3 font-medium">Eingegangen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-fg">{s.email}</td>
                  <td className="px-4 py-3 text-xs text-fg-muted">
                    {s.source ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-fg-muted">
                    {new Date(s.createdAt).toLocaleString("de-DE")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

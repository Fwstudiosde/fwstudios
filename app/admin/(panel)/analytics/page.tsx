import { listLeads, listCustomers, listNewsletter } from "@/lib/storage";
import { PageHeader, StatCard } from "../../_components/page-header";
import { AnalyticsCharts } from "./_components/analytics-charts";

export const metadata = { title: "Analytics" };
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const [leads, customers, newsletter] = await Promise.all([
    listLeads(),
    listCustomers(),
    listNewsletter(),
  ]);

  // Funnel
  const funnel = {
    neu: leads.filter((l) => l.status === "neu").length,
    kontaktiert: leads.filter((l) => l.status === "kontaktiert").length,
    qualifiziert: leads.filter((l) => l.status === "qualifiziert").length,
    gewonnen: leads.filter((l) => l.status === "gewonnen").length,
    verloren: leads.filter((l) => l.status === "verloren").length,
  };

  // Sources
  const sourceMap = new Map<string, number>();
  for (const l of leads) {
    sourceMap.set(l.source ?? "unknown", (sourceMap.get(l.source ?? "unknown") ?? 0) + 1);
  }
  const sources = Array.from(sourceMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count);

  // Leads per month (last 6 months)
  const months: { label: string; count: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const count = leads.filter((l) => l.createdAt.startsWith(key)).length;
    months.push({
      label: d.toLocaleDateString("de-DE", { month: "short" }),
      count,
    });
  }

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Lead-Funnel, Quellen und Trends — wo Wachstum entsteht."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Leads insgesamt" value={leads.length} />
        <StatCard
          label="Conversion → Kunde"
          value={
            leads.length > 0
              ? `${Math.round((funnel.gewonnen / leads.length) * 100)}%`
              : "—"
          }
          hint={`${funnel.gewonnen} gewonnen`}
        />
        <StatCard label="Newsletter" value={newsletter.length} />
        <StatCard
          label="Aktive Kunden"
          value={customers.filter((c) => c.status === "active").length}
        />
      </div>

      <div className="mt-8">
        <AnalyticsCharts funnel={funnel} sources={sources} months={months} />
      </div>
    </>
  );
}

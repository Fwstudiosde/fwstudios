import { listCustomers, listLeads } from "@/lib/storage";
import { PageHeader, StatCard } from "../_components/page-header";
import { LeadsTable } from "./_components/leads-table";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [leads, customers] = await Promise.all([listLeads(), listCustomers()]);

  const mrr = customers
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + (c.monthlyRevenue ?? 0), 0);

  const newLeads = leads.filter((l) => l.status === "neu").length;
  const wonLeads = leads.filter((l) => l.status === "gewonnen").length;
  const conversionRate =
    leads.length > 0 ? Math.round((wonLeads / leads.length) * 100) : 0;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Übersicht über Leads, Kunden und Umsatz."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Leads gesamt"
          value={leads.length}
          hint={`${newLeads} neu`}
        />
        <StatCard
          label="Aktive Kunden"
          value={customers.filter((c) => c.status === "active").length}
          hint={`${customers.length} insgesamt`}
        />
        <StatCard
          label="MRR"
          value={`${mrr.toLocaleString("de-DE")} €`}
          hint="Wiederkehrender Monatsumsatz"
        />
        <StatCard
          label="Conversion"
          value={`${conversionRate}%`}
          hint={`${wonLeads} gewonnen`}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-display mb-4 text-lg font-semibold text-fg">
          Letzte Leads
        </h2>
        <LeadsTable initialLeads={leads.slice(0, 25)} />
      </div>
    </>
  );
}

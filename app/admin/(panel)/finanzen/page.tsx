import { listCustomers } from "@/lib/storage";
import { PageHeader, StatCard } from "../../_components/page-header";
import { CustomersTable } from "./_components/customers-table";

export const metadata = { title: "Finanzen" };
export const dynamic = "force-dynamic";

export default async function FinanzenPage() {
  const customers = await listCustomers();
  const active = customers.filter((c) => c.status === "active");
  const mrr = active.reduce((s, c) => s + c.monthlyRevenue, 0);
  const arr = mrr * 12;
  const setupRevenue = customers.reduce((s, c) => s + (c.setupFee ?? 0), 0);
  const avg = active.length > 0 ? mrr / active.length : 0;

  return (
    <>
      <PageHeader
        title="Finanzen"
        description="Umsatz-Übersicht und Kunden-Verwaltung."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="MRR"
          value={`${mrr.toLocaleString("de-DE")} €`}
          hint="Wiederkehrender Monatsumsatz"
        />
        <StatCard
          label="ARR"
          value={`${arr.toLocaleString("de-DE")} €`}
          hint="Hochgerechneter Jahresumsatz"
        />
        <StatCard
          label="Setup-Umsatz"
          value={`${setupRevenue.toLocaleString("de-DE")} €`}
          hint="Einmalige Einnahmen"
        />
        <StatCard
          label="Ø Kundenwert"
          value={`${Math.round(avg).toLocaleString("de-DE")} €`}
          hint="MRR / Aktive Kunden"
        />
      </div>

      <div className="mt-10">
        <h2 className="font-display mb-4 text-lg font-semibold text-fg">
          Kunden
        </h2>
        <CustomersTable initialCustomers={customers} />
      </div>
    </>
  );
}

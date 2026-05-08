import { listCustomers, listInvoices } from "@/lib/storage";
import { PageHeader, StatCard } from "../../_components/page-header";
import { InvoicesTable } from "./_components/invoices-table";

export const metadata = { title: "Rechnungen" };
export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const [invoices, customers] = await Promise.all([
    listInvoices(),
    listCustomers(),
  ]);
  const total = invoices.reduce(
    (s, i) =>
      s + i.items.reduce((x, it) => x + it.quantity * it.unitPrice, 0),
    0
  );
  const paid = invoices
    .filter((i) => i.status === "paid")
    .reduce(
      (s, i) =>
        s + i.items.reduce((x, it) => x + it.quantity * it.unitPrice, 0),
      0
    );
  const open = invoices
    .filter((i) => i.status === "sent")
    .reduce(
      (s, i) =>
        s + i.items.reduce((x, it) => x + it.quantity * it.unitPrice, 0),
      0
    );

  return (
    <>
      <PageHeader
        title="Rechnungen"
        description="Übersicht über erstellte Rechnungen, Status und offene Posten."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Rechnungen gesamt" value={invoices.length} />
        <StatCard label="Gesamtsumme" value={`${total.toLocaleString("de-DE")} €`} />
        <StatCard label="Bezahlt" value={`${paid.toLocaleString("de-DE")} €`} />
        <StatCard label="Offen" value={`${open.toLocaleString("de-DE")} €`} />
      </div>
      <div className="mt-10">
        <InvoicesTable initial={invoices} customers={customers} />
      </div>
    </>
  );
}

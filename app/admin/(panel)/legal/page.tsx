import { getLegal } from "@/lib/storage";
import { PageHeader } from "../../_components/page-header";
import { LegalEditor } from "./_components/legal-editor";

export const metadata = { title: "Rechtstexte" };
export const dynamic = "force-dynamic";

export default async function LegalAdminPage() {
  const legal = await getLegal();
  return (
    <>
      <PageHeader
        title="Rechtstexte"
        description="Bearbeite Impressum, Datenschutz, AGB und Widerruf."
      />
      <LegalEditor initial={legal} />
    </>
  );
}

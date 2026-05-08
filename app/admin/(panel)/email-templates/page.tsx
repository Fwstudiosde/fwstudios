import { listTemplates } from "@/lib/storage";
import { PageHeader } from "../../_components/page-header";
import { TemplatesEditor } from "./_components/templates-editor";

export const metadata = { title: "Email-Vorlagen" };
export const dynamic = "force-dynamic";

export default async function TemplatesPage() {
  const templates = await listTemplates();
  return (
    <>
      <PageHeader
        title="Email-Vorlagen"
        description="Wiederverwendbare Templates für Erstkontakt, Termine und Follow-ups."
      />
      <TemplatesEditor initial={templates} />
    </>
  );
}

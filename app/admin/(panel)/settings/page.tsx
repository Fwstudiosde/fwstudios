import { getSettings } from "@/lib/storage";
import { PageHeader } from "../../_components/page-header";
import { SettingsEditor } from "./_components/settings-editor";

export const metadata = { title: "Einstellungen" };
export const dynamic = "force-dynamic";

export default async function SettingsAdminPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHeader
        title="Einstellungen"
        description="Chatbot-Preise, Setup-Gebühren und Sale-Banner."
      />
      <SettingsEditor initial={settings} />
    </>
  );
}

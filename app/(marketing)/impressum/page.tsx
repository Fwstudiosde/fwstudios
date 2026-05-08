import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = { title: "Impressum" };
export const dynamic = "force-dynamic";

export default async function ImpressumPage() {
  const legal = await getLegal();
  return (
    <LegalPage title={legal.impressum.title} html={legal.impressum.content} />
  );
}

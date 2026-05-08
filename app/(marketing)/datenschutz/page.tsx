import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = { title: "Datenschutz" };
export const dynamic = "force-dynamic";

export default async function DatenschutzPage() {
  const legal = await getLegal();
  return (
    <LegalPage
      title={legal.datenschutz.title}
      html={legal.datenschutz.content}
    />
  );
}

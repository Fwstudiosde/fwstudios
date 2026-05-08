import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = { title: "AGB" };
export const dynamic = "force-dynamic";

export default async function AGBPage() {
  const legal = await getLegal();
  return <LegalPage title={legal.agb.title} html={legal.agb.content} />;
}

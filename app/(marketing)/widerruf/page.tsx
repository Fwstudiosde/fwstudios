import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = { title: "Widerruf" };
export const dynamic = "force-dynamic";

export default async function WiderrufPage() {
  const legal = await getLegal();
  return (
    <LegalPage title={legal.widerruf.title} html={legal.widerruf.content} />
  );
}

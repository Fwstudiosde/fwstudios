import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PilotDatenschutzPage() {
  const legal = await getLegal();
  return (
    <LegalPage
      title={legal.datenschutz.title}
      html={legal.datenschutz.content}
      sectionClassName="pt-16 sm:pt-20"
    />
  );
}

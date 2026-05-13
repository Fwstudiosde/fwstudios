import { LegalPage } from "@/components/sections/legal-page";
import { getLegal } from "@/lib/storage";

export const metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function PilotImpressumPage() {
  const legal = await getLegal();
  return (
    <LegalPage
      title={legal.impressum.title}
      html={legal.impressum.content}
      sectionClassName="pt-16 sm:pt-20"
    />
  );
}

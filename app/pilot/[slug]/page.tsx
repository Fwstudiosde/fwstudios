import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSettings } from "@/lib/storage";
import type { PilotSlug } from "@/lib/storage";
import { PILOT_CONTENT } from "@/lib/content/pilot";
import { FoundingBanner } from "@/components/pilot/founding-banner";
import { PilotHero } from "@/components/pilot/pilot-hero";
import { PilotProblems } from "@/components/pilot/pilot-problems";
import { PilotDeliverables } from "@/components/pilot/pilot-deliverables";
import { PilotOffer } from "@/components/pilot/pilot-offer";
import { PilotWhyFounding } from "@/components/pilot/pilot-why-founding";
import { PilotProcess } from "@/components/pilot/pilot-process";
import { PilotFAQ } from "@/components/pilot/pilot-faq";
import { EmbeddedBooking } from "@/components/pilot/embedded-booking";

const VALID_SLUGS: PilotSlug[] = ["plattform", "chatbot", "app", "ki"];

function isPilotSlug(value: string): value is PilotSlug {
  return (VALID_SLUGS as string[]).includes(value);
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isPilotSlug(slug)) return { robots: { index: false, follow: false } };
  const content = PILOT_CONTENT[slug];
  return {
    title: `Pilot · ${content.shortLabel}`,
    description: content.heroSubline,
    robots: { index: false, follow: false },
  };
}

export default async function PilotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isPilotSlug(slug)) notFound();

  const content = PILOT_CONTENT[slug];
  const settings = await getSettings();
  const program = settings.pilot[slug];

  if (!program.active) notFound();

  return (
    <>
      <FoundingBanner
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        discountPercent={program.discountPercent}
        phrase={content.bannerPhrase}
      />
      <PilotHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        highlight={content.heroHighlight}
        description={content.heroSubline}
        primaryCta={content.primaryCta}
        secondaryCta={content.secondaryCta}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        discountPercent={program.discountPercent}
      />
      <PilotProblems
        title={content.problemsTitle}
        problems={content.problems}
      />
      <PilotDeliverables
        title={content.deliverablesTitle}
        deliverables={content.deliverables}
      />
      <PilotOffer
        pilotLabel={content.pilotLabel}
        discountPercent={program.discountPercent}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        note={content.offerNote}
        include={content.offerInclude}
        exclude={content.offerExclude}
      />
      <PilotWhyFounding
        title={content.whyFoundingTitle}
        points={content.whyFoundingPoints}
      />
      <PilotProcess title={content.processTitle} steps={content.process} />
      <PilotFAQ title={content.faqTitle} faq={content.faq} />
      <EmbeddedBooking
        calLink={content.calLink}
        topic={content.calTopic}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        pilotLabel={content.pilotLabel}
        discountPercent={program.discountPercent}
      />
    </>
  );
}

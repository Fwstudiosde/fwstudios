import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSettings } from "@/lib/storage";
import type { PilotSlug } from "@/lib/storage";
import { PILOT_CONTENT } from "@/lib/content/pilot";
import { FoundingBanner } from "@/components/pilot/founding-banner";
import { PilotHero } from "@/components/pilot/pilot-hero";
import { PilotDemo } from "@/components/pilot/pilot-demo";
import { PilotTrustLogos } from "@/components/pilot/pilot-trust-logos";
import { PilotProblems } from "@/components/pilot/pilot-problems";
import { PilotDeliverables } from "@/components/pilot/pilot-deliverables";
import { PilotTestimonial } from "@/components/pilot/pilot-testimonial";
import { PilotOffer } from "@/components/pilot/pilot-offer";
import { PilotWhyFounding } from "@/components/pilot/pilot-why-founding";
import { PilotProcess } from "@/components/pilot/pilot-process";
import { PilotFAQ } from "@/components/pilot/pilot-faq";
import { PilotFounder } from "@/components/pilot/pilot-founder";
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
        pricePhrase={content.bannerPricePhrase}
      />
      <PilotHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        highlight={content.heroHighlight}
        titleMobile={content.heroTitleMobile}
        description={content.heroSubline}
        priceLine={content.heroPriceLine}
        primaryCta={content.ctas?.heroPrimary ?? content.primaryCta}
        secondaryCta={content.secondaryCta}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        discountPercent={program.discountPercent}
        phoneDisplay={content.phoneDisplay}
        phoneTel={content.phoneTel}
      />
      {content.demo && (
        <PilotDemo
          welcomeMessage={content.demo.welcomeMessage}
          quickQuestions={content.demo.quickQuestions}
          caption={content.demo.caption}
        />
      )}
      {content.trustLogos && content.trustLogos.length > 0 && (
        <PilotTrustLogos
          caption={content.trustLogosCaption}
          logos={content.trustLogos}
          footnote={content.trustLogosFootnote}
        />
      )}
      <PilotProblems
        title={content.problemsTitle}
        problems={content.problems}
      />
      <PilotDeliverables
        title={content.deliverablesTitle}
        deliverables={content.deliverables}
      />
      {content.testimonial && (
        <PilotTestimonial
          eyebrow={content.testimonialEyebrow}
          headline={content.testimonialHeadline}
          testimonial={content.testimonial}
        />
      )}
      <PilotOffer
        pilotLabel={content.pilotLabel}
        discountPercent={program.discountPercent}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        note={content.offerNote}
        include={content.offerInclude}
        exclude={content.offerExclude}
        pricing={content.pricing}
        pricingFooterNote={content.pricingFooterNote}
        ctaLabel={content.ctas?.afterOffer}
      />
      <PilotWhyFounding
        title={content.whyFoundingTitle}
        points={content.whyFoundingPoints}
      />
      <PilotProcess title={content.processTitle} steps={content.process} />
      <PilotFAQ title={content.faqTitle} faq={content.faq} />
      {content.founder && <PilotFounder founder={content.founder} />}
      <EmbeddedBooking
        calLink={content.calLink}
        topic={content.calTopic}
        spotsLeft={program.spotsLeft}
        spotsTotal={program.spotsTotal}
        pilotLabel={content.pilotLabel}
        discountPercent={program.discountPercent}
        takeaways={content.bookingTakeaways}
        eyebrowOverride={content.ctas?.afterFaq}
      />
    </>
  );
}

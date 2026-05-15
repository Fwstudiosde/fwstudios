import { Container, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowDown, Phone, Sparkles } from "lucide-react";

export function PilotHero({
  eyebrow,
  title,
  highlight,
  titleMobile,
  description,
  priceLine,
  primaryCta,
  secondaryCta,
  spotsLeft,
  spotsTotal,
  discountPercent,
  phoneDisplay,
  phoneTel,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  titleMobile?: { line1: string; line2: string };
  description: string;
  priceLine?: string;
  primaryCta: string;
  secondaryCta: string;
  spotsLeft: number;
  spotsTotal: number;
  discountPercent: number;
  phoneDisplay?: string;
  phoneTel?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-28">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="orb left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 bg-brand/25"
        aria-hidden
      />
      <div
        className="orb right-[-15%] top-32 h-[400px] w-[400px] bg-accent-purple/25"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight text-fg sm:mt-6 sm:text-5xl md:text-6xl">
            {titleMobile ? (
              <>
                <span className="sm:hidden">
                  <span className="text-gradient">{titleMobile.line1}</span>
                  <br />
                  <span className="text-gradient-brand">
                    {titleMobile.line2}
                  </span>
                </span>
                <span className="hidden sm:inline">
                  <span className="text-gradient">{title}</span>
                  <br />
                  <span className="text-gradient-brand">{highlight}</span>
                </span>
              </>
            ) : (
              <>
                <span className="text-gradient">{title}</span>
                <br />
                <span className="text-gradient-brand">{highlight}</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:mt-6 sm:text-lg">
            {description}
          </p>

          {priceLine && (
            <div className="mt-6 max-w-xl rounded-xl border border-brand/30 bg-brand/[0.06] px-4 py-3 text-sm leading-relaxed text-fg sm:text-base">
              {priceLine}
            </div>
          )}

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
            <Button href="#termin" variant="brand" size="lg">
              <Sparkles className="size-4" />
              {primaryCta}
            </Button>
            <Button href="#angebot" variant="secondary" size="lg">
              {secondaryCta}
              <ArrowDown className="size-4" />
            </Button>
          </div>

          {phoneDisplay && phoneTel && (
            <a
              href={`tel:${phoneTel}`}
              className="mt-4 inline-flex items-center gap-2 text-xs text-fg-muted transition-colors hover:text-brand sm:text-sm"
            >
              <Phone className="size-3.5" />
              <span>Oder direkt anrufen: </span>
              <span className="font-medium text-fg">{phoneDisplay}</span>
            </a>
          )}

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/[0.06] px-4 py-1.5 text-xs font-medium text-fg-muted backdrop-blur sm:text-sm">
            <span
              className="size-1.5 animate-pulse rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]"
              aria-hidden
            />
            {spotsLeft > 0 ? (
              <>
                <span className="font-semibold text-fg">
                  {spotsLeft} von {spotsTotal} Pilot-Plätzen frei
                </span>
                <span className="text-fg-subtle">·</span>
                <span>
                  <span className="font-semibold text-brand">
                    {discountPercent} %
                  </span>{" "}
                  Setup-Vorteil
                </span>
              </>
            ) : (
              <span className="font-semibold text-fg">
                Alle Pilot-Plätze vergeben — Warteliste offen
              </span>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

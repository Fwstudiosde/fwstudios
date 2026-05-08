import { TEAM, COMPANY } from "@/lib/content/team";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "Über uns",
  description:
    "FWStudios entwickelt KI-Lösungen, Plattformen und Mobile-Apps für Unternehmen, die echte Wirkung wollen statt Hype.",
};

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        title="KI ist nicht das Problem."
        highlight="Sie ehrlich anzuwenden ist die Kunst."
        description={`Seit ${COMPANY.founded} bauen wir KI-Lösungen, Plattformen und Mobile-Apps für Unternehmen aus dem DACH-Raum. Klein genug, um Sie zu kennen — gut genug, um zu liefern.`}
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          Ehrliches Gespräch
        </Button>
        <Button href="/projekte" variant="secondary" size="lg">
          Unsere Arbeit
        </Button>
      </PageHero>

      {/* Values */}
      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Unsere Werte</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Was uns{" "}
              <span className="text-gradient-brand">anders macht.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {COMPANY.values.map((v) => (
              <div
                key={v.title}
                className="bg-bg p-7 transition-colors hover:bg-white/[0.02]"
              >
                <h3 className="font-display text-xl font-semibold text-fg">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Team</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Klein, fokussiert,{" "}
              <span className="text-gradient-brand">erreichbar.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-6 transition-colors hover:border-border-strong"
              >
                <div className="flex size-14 items-center justify-center rounded-full border border-brand/30 bg-brand/10 font-display text-base font-semibold text-brand">
                  {m.initials}
                </div>
                <div className="mt-5 font-display text-lg font-semibold text-fg">
                  {m.name}
                </div>
                <div className="text-sm text-brand">{m.role}</div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}

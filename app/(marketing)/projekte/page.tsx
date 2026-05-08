import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/content/projects";
import { PageHero } from "@/components/sections/page-hero";
import { Container, Section } from "@/components/ui/container";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projekte",
  description:
    "Ausgewählte Cases: KI-Chatbots, Plattformen und Mobile-Apps, die wir für unsere Kunden umgesetzt haben.",
};

const ACCENT_GRADIENTS: Record<string, string> = {
  brand: "from-brand/30 to-brand-2/10",
  purple: "from-accent-purple/30 to-brand-3/10",
  orange: "from-warning/30 to-warning/5",
  green: "from-success/30 to-success/5",
};

export default function ProjekteIndex() {
  return (
    <>
      <PageHero
        eyebrow="Projekte"
        title="Cases, die"
        highlight="wirklich funktionieren."
        description="Auszug unserer letzten Projekte — KI-Chatbots, Plattformen, Mobile-Apps. Alle mit echten Zahlen, kein Marketing-Märchen."
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          Eigenes Projekt besprechen
        </Button>
      </PageHero>

      <Section className="!pt-8">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/projekte/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-7 transition-all duration-300 hover:border-border-strong"
              >
                <div
                  className={`absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]} opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-border bg-bg/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                      {p.category}
                    </span>
                    <ArrowUpRight className="size-5 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-semibold leading-tight tracking-tight text-fg">
                    {p.title}
                  </h3>
                  <div className="mt-1.5 text-xs text-fg-subtle">
                    {p.client} · {p.year}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                    {p.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4">
                    {p.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-lg font-semibold tracking-tight text-fg">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-fg-subtle">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}

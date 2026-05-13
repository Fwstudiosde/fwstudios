import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";

export function PilotOffer({
  pilotLabel,
  discountPercent,
  spotsLeft,
  spotsTotal,
  note,
  include,
  exclude,
}: {
  pilotLabel: string;
  discountPercent: number;
  spotsLeft: number;
  spotsTotal: number;
  note: string;
  include: string[];
  exclude: string[];
}) {
  const allTaken = spotsLeft <= 0;
  return (
    <Section id="angebot" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Founding-Angebot</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            <span className="text-gradient">5 Pilotkunden für</span>
            <br />
            <span className="text-gradient-brand">{pilotLabel}.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">{note}</p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-b from-surface-2 to-surface p-6 sm:p-10 lg:p-12">
            <div
              className="orb left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand/30"
              aria-hidden
            />
            <div
              className="orb right-0 bottom-0 h-[260px] w-[360px] translate-x-1/3 translate-y-1/3 bg-accent-purple/30"
              aria-hidden
            />

            <div className="relative">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
                    <Sparkles className="size-3.5" aria-hidden />
                    Founding-Kunde
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-semibold text-fg sm:text-3xl">
                    {discountPercent} % Setup-Vorteil
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted">
                    Auf den einmaligen Setup-Anteil. Reguläre Monats-/Wartungs­kosten bleiben.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-bg/60 px-5 py-4 text-center backdrop-blur">
                  <div className="text-3xl font-display font-semibold text-fg sm:text-4xl">
                    {allTaken ? "0" : spotsLeft}
                    <span className="text-fg-subtle">/{spotsTotal}</span>
                  </div>
                  <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                    {allTaken ? "Alle vergeben" : "Plätze frei"}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                    Im Pilot enthalten
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {include.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-fg-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                    Nicht im Pilot
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {exclude.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.04] text-fg-subtle">
                          <X className="size-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm text-fg-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-fg-subtle sm:max-w-md">
                  Festpreis kommt nach dem 30-Min-Discovery-Call. Erst dann unterschreiben Sie etwas.
                </p>
                <Button href="#termin" variant="brand" size="lg">
                  {allTaken
                    ? "Auf die Warteliste"
                    : "Pilot-Platz sichern"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

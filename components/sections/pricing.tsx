import { Check, Cpu, Gauge, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const FEATURES_CHATBOT = [
  "Unbegrenzte Nachrichten",
  "Website-Integration",
  "Training auf Ihren Website-Daten",
  "Backend-Datenintegration",
  "Email-Flow-Trigger",
  "Über 40 Sprachen",
  "Analytics Dashboard",
  "Lead-Generierung",
  "Priority Support",
  "EU-Hosting & DSGVO",
];

const FEATURES_CUSTOM = [
  "Use-Case-Analyse & Konzept",
  "Custom RAG, Agents, Workflows",
  "Plattform & Backend-Entwicklung",
  "Mobile-App-Entwicklung",
  "Integration in Ihren Stack",
  "Dedizierter Ansprechpartner",
  "SLA-basierter Support",
  "Wartung & Weiterentwicklung",
];

export function Pricing() {
  return (
    <Section id="preise" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Preise</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            KI-getrieben gebaut.{" "}
            <span className="text-gradient-brand">Unschlagbar im Preis.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">
            Wir arbeiten hochmodern mit KI in jedem Schritt — von Konzept und
            Architektur über Code-Generierung bis zu Tests und Deployment. Was
            klassische Agenturen Wochen kostet, liefern wir in Tagen. Diesen
            Effizienzvorsprung geben wir 1:1 an Sie weiter — als faire,
            transparente Festpreise, die mit konventionellen Anbietern schlicht
            nicht zu schlagen sind.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/[0.06] px-3.5 py-1.5 text-fg">
              <Sparkles className="size-3.5 text-brand" />
              KI-gestützter Workflow
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-fg-muted">
              <Gauge className="size-3.5 text-brand" />
              Lieferung in Tagen statt Wochen
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3.5 py-1.5 text-fg-muted">
              <Cpu className="size-3.5 text-brand" />
              Verbindlicher Festpreis
            </span>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-2">
          {/* Plan 1: Chatbot */}
          <div className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/[0.06] to-transparent p-6 sm:p-8">
            <div
              className="orb -right-20 -top-20 size-72 bg-brand/40 opacity-60"
              aria-hidden
            />
            <div className="relative">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-semibold text-fg">
                  KI-Chatbot
                </h3>
                <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                  Productized
                </span>
              </div>
              <p className="mt-2 text-sm text-fg-muted">
                Productized SaaS — Live in 7 Tagen.
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                  Auf Anfrage
                </span>
              </div>
              <div className="mt-2 text-sm text-fg-subtle">
                Festpreis nach kostenloser Erstberatung — monatlich oder
                jährlich abrechenbar.
              </div>

              <Button
                href="/#kontakt"
                variant="brand"
                size="lg"
                className="mt-7 w-full"
              >
                Beratung anfragen
              </Button>

              <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                {FEATURES_CHATBOT.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-fg"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan 2: Custom */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 sm:p-8">
            <h3 className="font-display text-2xl font-semibold text-fg">
              Custom-Projekt
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              Maßgeschneiderte KI-Lösungen, Plattformen oder Mobile-Apps.
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                Auf Anfrage
              </span>
            </div>
            <div className="mt-2 text-sm text-fg-subtle">
              Verbindlicher Festpreis nach Spec &amp; Erstberatung.
            </div>

            <Button
              href="/#kontakt"
              variant="secondary"
              size="lg"
              className="mt-7 w-full"
            >
              Projekt besprechen
            </Button>

            <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
              {FEATURES_CUSTOM.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-fg"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-fg-muted" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-fg-subtle">
          Jeder Preis wird individuell auf Ihren Use-Case zugeschnitten — kein
          Standard-Tarif, kein Kleingedrucktes. 30 Minuten Erstberatung ohne
          Verkaufsgespräch.
        </p>
      </Container>
    </Section>
  );
}

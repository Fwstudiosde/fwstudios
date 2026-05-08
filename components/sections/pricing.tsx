import { Check } from "lucide-react";
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
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Konditionen</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Konditionen{" "}
            <span className="text-gradient-brand">auf Anfrage.</span>
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Jedes Projekt ist anders — wir geben einen verbindlichen Festpreis
            nach kostenloser Erstberatung. Kein Standard-Tarif, kein
            Kleingedrucktes.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Plan 1: Chatbot */}
          <div className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/[0.06] to-transparent p-8">
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
                <span className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
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
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-8">
            <h3 className="font-display text-2xl font-semibold text-fg">
              Custom-Projekt
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              Maßgeschneiderte KI-Lösungen, Plattformen oder Mobile-Apps.
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
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
          Alle Konditionen werden individuell vereinbart. 30 Minuten
          Erstberatung — ohne Verkaufsgespräch.
        </p>
      </Container>
    </Section>
  );
}

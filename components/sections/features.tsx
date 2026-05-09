import {
  Brain,
  Zap,
  ShieldCheck,
  Workflow,
  BarChart3,
  Globe,
} from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const FEATURES = [
  {
    icon: Brain,
    title: "Auf Ihre Daten trainiert",
    body: "Unsere KI lernt Ihren kompletten Website-Inhalt, FAQs, Produktdaten und Backend-Quellen — antwortet im Ton Ihrer Marke.",
  },
  {
    icon: Workflow,
    title: "Workflow-Trigger",
    body: "Email-Sequenzen, CRM-Eintrag, Slack-Notification, Kalender-Buchung — Ihr Chatbot löst echte Aktionen aus.",
  },
  {
    icon: BarChart3,
    title: "Analytics in Echtzeit",
    body: "Conversion, Themen, Drop-offs, Lead-Quellen. Wissen, was funktioniert, statt zu raten.",
  },
  {
    icon: Globe,
    title: "Über 40 Sprachen",
    body: "Automatische Spracherkennung. Kunden auf der ganzen Welt fühlen sich verstanden.",
  },
  {
    icon: ShieldCheck,
    title: "DSGVO & EU-Hosting",
    body: "Alle Daten bleiben in der EU. Auftragsverarbeitungsvertrag inklusive, Audit-Logs auf Wunsch.",
  },
  {
    icon: Zap,
    title: "Live in 7 Tagen",
    body: "Setup, Training, Integration und Launch — innerhalb einer Woche. Keine monatelangen Projekte.",
  },
];

export function Features() {
  return (
    <Section className="border-t border-border" id="features">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Plattform</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Alles, was eine echte
            <br />
            <span className="text-gradient-brand">KI-Plattform</span> braucht.
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Kein Spielzeug-Bot. Eine produktionsreife Plattform, die mit Ihrem
            Business mitwächst.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative bg-bg p-6 transition-colors hover:bg-white/[0.02] sm:p-7"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-white/[0.04] text-brand transition-all group-hover:border-brand/40 group-hover:shadow-[0_0_24px_-4px_rgba(0,212,255,0.4)]">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-fg">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

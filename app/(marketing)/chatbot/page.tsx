import {
  Bot,
  Globe,
  Mail,
  BarChart3,
  ShieldCheck,
  Zap,
  MessageSquare,
  Database,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Process } from "@/components/sections/process";
import { ChatbotPreview } from "@/components/sections/chatbot-preview";
import { Container, Section } from "@/components/ui/container";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "KI-Chatbot",
  description:
    "Productized KI-Chatbot, trainiert auf Ihre Website. Live in 7 Tagen. Lead-Capture, Email-Trigger, Analytics inklusive — Preise auf Anfrage.",
};

export default function ChatbotPage() {
  return (
    <>
      <PageHero
        eyebrow="KI-Chatbot"
        title="Der Chatbot, der"
        highlight="Ihre Website verkauft."
        description="Trainiert auf Ihre kompletten Inhalte. Antwortet 24/7 in der Sprache Ihres Kunden, fängt Leads ein und triggert Workflows. Live in 7 Tagen."
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          Beratung anfragen
        </Button>
        <Button href="/#kontakt" variant="secondary" size="lg">
          Demo anfragen
        </Button>
      </PageHero>

      {/* Live preview */}
      <Section className="!pt-0">
        <Container>
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-x-12 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-b from-brand/20 via-accent-purple/10 to-transparent blur-3xl" />
            <ChatbotPreview />
          </div>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Funktionen"
        title={
          <>
            Was Ihren Bot{" "}
            <span className="text-gradient-brand">unschlagbar macht.</span>
          </>
        }
        features={[
          {
            icon: Bot,
            title: "Auf Ihre Marke trainiert",
            body: "Wir crawlen und embedden Ihre Website. Antworten in Ihrem Ton, nie generisch.",
          },
          {
            icon: Database,
            title: "Backend-Integration",
            body: "Datenbank-Lookup, CRM-Eintrag, Order-Status — der Bot kennt mehr als nur Marketing-Text.",
          },
          {
            icon: Mail,
            title: "Email-Workflow-Trigger",
            body: "Bot löst Sequenzen aus, bucht Termine, eröffnet Tickets. Echte Arbeit, kein Smalltalk.",
          },
          {
            icon: Globe,
            title: "40+ Sprachen",
            body: "Automatische Spracherkennung. Kunden weltweit in ihrer Sprache abholen.",
          },
          {
            icon: BarChart3,
            title: "Analytics-Dashboard",
            body: "Conversions, Themen, Engpässe in Echtzeit. Sie wissen, was funktioniert.",
          },
          {
            icon: MessageSquare,
            title: "Lead-Capture",
            body: "Bot qualifiziert Anfragen und übergibt heiße Leads direkt in Ihr CRM.",
          },
          {
            icon: ShieldCheck,
            title: "DSGVO & EU-Hosting",
            body: "Alle Daten in der EU. AVV inklusive, Audit-Logs auf Wunsch.",
          },
          {
            icon: Zap,
            title: "Live in 7 Tagen",
            body: "Setup, Training, Branding, Integration — innerhalb einer Woche produktiv.",
          },
          {
            icon: Sparkles,
            title: "A/B-Testing",
            body: "Verschiedene Persönlichkeiten und CTAs testen. Datengetriebene Optimierung.",
          },
        ]}
      />

      <Process
        title={
          <>
            Vom Onboarding zum Launch —{" "}
            <span className="text-gradient-brand">7 Tage.</span>
          </>
        }
        steps={[
          {
            title: "Tag 1 — Onboarding",
            body: "Kick-off-Call, Zugänge, Branding-Briefing. Wir beginnen mit dem Crawl Ihrer Website.",
          },
          {
            title: "Tag 2–4 — Training & Tuning",
            body: "Wir trainieren das Modell, justieren Persönlichkeit und Antwortverhalten.",
          },
          {
            title: "Tag 5 — Integration",
            body: "Widget-Embed, Backend-Endpoints, Email-Trigger. Sie testen auf Staging.",
          },
          {
            title: "Tag 6–7 — Go Live",
            body: "Übergabe Analytics-Dashboard, Schulung, Launch. Wir bleiben im Standby.",
          },
        ]}
      />

      <CTA />
    </>
  );
}

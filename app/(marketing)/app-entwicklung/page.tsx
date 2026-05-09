import {
  Smartphone,
  Zap,
  Layers,
  ShieldCheck,
  Bell,
  CreditCard,
  Sparkles,
  Apple,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { PhoneMockup } from "@/components/sections/phone-mockup";

export const metadata = {
  title: "App-Entwicklung",
  description:
    "Native iOS- und Android-Apps mit React Native und Expo. Von der Idee bis zum App-Store-Launch — Festpreis, klarer Prozess, Production-ready.",
};

const STACK = [
  "React Native",
  "Expo",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Supabase",
  "Stripe / RevenueCat",
  "OneSignal",
  "Firebase",
  "Sentry",
  "App Store Connect",
  "Google Play Console",
];

export default function AppEntwicklungPage() {
  return (
    <>
      <PageHero
        eyebrow="Mobile App-Entwicklung"
        title="Native Apps,"
        highlight="für iOS & Android."
        description="Wir bauen produktive Mobile-Apps mit React Native und Expo — schneller als Native, mit nativer Performance. Vom MVP bis zum 5-Sterne-Rating."
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          App-Idee besprechen
        </Button>
        <Button href="/projekte" variant="secondary" size="lg">
          App-Cases ansehen
        </Button>
      </PageHero>

      {/* Phone showcase */}
      <Section className="!pt-8">
        <Container>
          <PhoneMockup />
        </Container>
      </Section>

      {/* App store badges */}
      <section className="border-y border-border bg-bg-subtle/40 py-10">
        <Container>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              Wir veröffentlichen direkt in den Stores
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StoreBadge
                icon={<Apple className="size-5" />}
                top="Download im"
                bottom="App Store"
              />
              <StoreBadge
                icon={
                  <svg viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M3.5 2.7c-.3.3-.5.7-.5 1.2v16.2c0 .5.2.9.5 1.2l9.3-9.3-9.3-9.3zm10.6 8.3l2.3 2.3 4.4-2.5c.6-.3.6-1.2 0-1.5l-4.4-2.5-2.3 2.3 0 1.9zm-1.3 1.3l-9.3 9.3c.4.1.8.1 1.1-.1l11-6.3-2.8-2.9zm0-2.6l2.8-2.9-11-6.3c-.3-.2-.7-.2-1.1-.1l9.3 9.3z" />
                  </svg>
                }
                top="Verfügbar bei"
                bottom="Google Play"
              />
            </div>
          </div>
        </Container>
      </section>

      <FeatureGrid
        eyebrow="Was wir bauen"
        title={
          <>
            Apps mit echtem{" "}
            <span className="text-gradient-brand">Business-Wert.</span>
          </>
        }
        features={[
          {
            icon: Smartphone,
            title: "Native iOS & Android",
            body: "Eine Codebase, zwei native Apps. React Native + Expo — performant, wartbar, schnell zu liefern.",
          },
          {
            icon: Bell,
            title: "Push & Engagement",
            body: "Push-Kampagnen, In-App-Messages, Deeplinks. Reaktivierung Ihrer Nutzer ist messbar.",
          },
          {
            icon: CreditCard,
            title: "In-App Purchases",
            body: "Stripe oder RevenueCat. Subscriptions, Einmalkäufe, Free Trials, Family Sharing.",
          },
          {
            icon: Sparkles,
            title: "KI an Bord",
            body: "On-Device-LLMs oder Cloud-KI. Personalisierte Empfehlungen, Voice-Input, smarte Suche.",
          },
          {
            icon: Layers,
            title: "Web + App parallel",
            body: "Wir nutzen Expo Router — Web-Version aus derselben Codebase ist on-demand verfügbar.",
          },
          {
            icon: Zap,
            title: "OTA-Updates",
            body: "Bugfixes ohne App-Store-Review. EAS Update macht Hotfixes in Minuten möglich.",
          },
          {
            icon: ShieldCheck,
            title: "DSGVO + EU-Hosting",
            body: "Backend in der EU, Apple-/Google-Privacy-Manifests korrekt deklariert.",
          },
          {
            icon: Apple,
            title: "App Store Optimierung",
            body: "ASO, Screenshots, Beschreibungstexte. Wir bringen Ihre App auf Position 1 in der Kategorie.",
          },
          {
            icon: Smartphone,
            title: "Wallet & Widgets",
            body: "Apple Wallet, Live Activities, Home-Screen-Widgets — moderne iOS-Features statt Standard-App.",
          },
        ]}
      />

      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Tech-Stack</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Erprobter Mobile-Stack —{" "}
              <span className="text-gradient-brand">production-grade.</span>
            </h2>
          </div>
          <div className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-fg-muted backdrop-blur transition-colors hover:border-border-strong hover:text-fg"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <Process
        title={
          <>
            Von der Idee zum Store-Launch —{" "}
            <span className="text-gradient-brand">in 8–12 Wochen.</span>
          </>
        }
        steps={[
          {
            title: "Discovery & Spec",
            body: "User-Stories, Wireframes, Architektur. Festpreis-Angebot binnen 7 Tagen.",
          },
          {
            title: "Design im Figma",
            body: "Komplettes UI/UX inkl. App-Store-Assets. Sie geben Freigabe vor jedem Code.",
          },
          {
            title: "Build & TestFlight",
            body: "Wöchentliche Builds direkt auf Ihr iPhone via TestFlight & Play Console.",
          },
          {
            title: "Store-Launch",
            body: "Submission, Review-Begleitung, Launch-Kampagne. Wir kümmern uns auch nach Live.",
          },
        ]}
      />

      <CTA />
    </>
  );
}

function StoreBadge({
  icon,
  top,
  bottom,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.04] px-5 py-2.5 transition-colors hover:border-border-strong hover:bg-white/[0.06]">
      <div className="text-fg">{icon}</div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-fg-subtle">
          {top}
        </span>
        <span className="font-display text-base font-semibold text-fg">
          {bottom}
        </span>
      </div>
    </div>
  );
}

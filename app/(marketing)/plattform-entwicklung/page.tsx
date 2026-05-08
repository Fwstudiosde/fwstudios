import {
  Globe,
  Smartphone,
  Database,
  ShieldCheck,
  Palette,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export const metadata = {
  title: "Plattform-Entwicklung",
  description:
    "Web-Plattformen, SaaS-Backends und Mobile-Apps mit Next.js, Postgres und modernem Tech-Stack — Production-ready ab Tag 1.",
};

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Postgres",
  "Supabase",
  "Stripe",
  "Vercel",
  "Hetzner",
  "Docker",
  "Cloudflare",
  "Resend",
];

export default function PlattformPage() {
  return (
    <>
      <PageHero
        eyebrow="Plattform-Entwicklung"
        title="Skalierbare Plattformen,"
        highlight="ohne den Ballast."
        description="Wir bauen Web- und SaaS-Plattformen mit modernem Stack — schnell, sauber, wartbar. Vom MVP bis zur produktiven Skalierung."
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          Projekt besprechen
        </Button>
      </PageHero>

      <FeatureGrid
        eyebrow="Was wir bauen"
        title={
          <>
            Komplette Plattformen —{" "}
            <span className="text-gradient-brand">aus einer Hand.</span>
          </>
        }
        features={[
          {
            icon: Globe,
            title: "Web-Plattformen",
            body: "Marketing-Sites, SaaS-Apps, interne Tools — performant, SEO-stark, barrierefrei.",
          },
          {
            icon: Smartphone,
            title: "Mobile Apps",
            body: "Cross-Platform mit React Native oder Web-First mit responsive PWAs.",
          },
          {
            icon: Database,
            title: "Backend & APIs",
            body: "REST, tRPC oder GraphQL. Postgres, Redis, Job-Queues, Webhooks.",
          },
          {
            icon: ShieldCheck,
            title: "Auth & Billing",
            body: "Login, Rollen, Teams, Stripe-Abrechnung, Audit-Logs — out of the box.",
          },
          {
            icon: Palette,
            title: "UI / UX Design",
            body: "Eigenes Design-System statt Bootstrap-Look. Komponenten, die Ihre Marke tragen.",
          },
          {
            icon: Cloud,
            title: "DevOps & Hosting",
            body: "CI/CD, Docker, Monitoring, Backups. Vercel, Hetzner oder Ihre Wunsch-Cloud.",
          },
        ]}
      />

      {/* Tech stack */}
      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Tech-Stack</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Bewährter Stack —{" "}
              <span className="text-gradient-brand">keine Experimente.</span>
            </h2>
            <p className="mt-4 text-lg text-fg-muted">
              Wir verwenden, was die besten Engineering-Teams der Welt
              produktiv einsetzen.
            </p>
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
            Vom Konzept zum Launch —{" "}
            <span className="text-gradient-brand">in Wochen, nicht Monaten.</span>
          </>
        }
        steps={[
          {
            title: "Discovery & Scope",
            body: "Workshop, User-Stories, Architektur-Skizze. Festpreis-Angebot binnen einer Woche.",
          },
          {
            title: "Design",
            body: "UI/UX-Design im Figma. Sie geben Freigabe, bevor wir eine Zeile Code schreiben.",
          },
          {
            title: "Build & Demo",
            body: "Wöchentliche Demos auf Staging-Umgebung. Sie testen mit, wir korrigieren früh.",
          },
          {
            title: "Launch",
            body: "Domain, SSL, Monitoring, Backups, Analytics. Übergabe oder weiter mit Wartungs-Vertrag.",
          },
        ]}
      />

      <CTA />
    </>
  );
}

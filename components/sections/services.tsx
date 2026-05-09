import Link from "next/link";
import { Bot, Layers, Sparkles, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const SERVICES = [
  {
    href: "/chatbot",
    icon: Bot,
    eyebrow: "Produkt",
    title: "KI-Chatbot",
    description:
      "Trainiert auf Ihre Website, Backend-Integration, Lead-Capture, Email-Trigger. In 7 Tagen live.",
    bullets: [
      "Unbegrenzte Nachrichten",
      "Über 40 Sprachen",
      "Analytics & A/B-Tests",
    ],
    accent: "from-brand/20 to-brand/0",
  },
  {
    href: "/ki-loesungen",
    icon: Sparkles,
    eyebrow: "Beratung",
    title: "KI-Lösungen",
    description:
      "Maßgeschneiderte KI-Workflows: Dokumentenanalyse, RAG, Automatisierung von Routineprozessen.",
    bullets: [
      "Use-Case-Analyse",
      "Custom RAG / Agents",
      "Integration in Ihren Stack",
    ],
    accent: "from-accent-purple/20 to-accent-purple/0",
  },
  {
    href: "/plattform-entwicklung",
    icon: Layers,
    eyebrow: "Engineering",
    title: "Plattform-Entwicklung",
    description:
      "Von Landing-Page bis SaaS-Backend: Next.js, Postgres, Stripe, Auth — Production-ready.",
    bullets: [
      "Modernes Tech-Stack",
      "DSGVO & EU-Hosting",
      "Wartung & Weiterentwicklung",
    ],
    accent: "from-brand-2/20 to-brand-2/0",
  },
];

export function Services() {
  return (
    <Section id="services">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Leistungen</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Drei Wege, mit KI{" "}
            <span className="text-gradient-brand">echte Wirkung</span> zu
            erzielen.
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Wählen Sie ein Produkt oder lassen Sie uns Ihre individuelle Lösung
            bauen — wir liefern beides aus einer Hand.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-300 hover:border-border-strong hover:from-white/[0.06] sm:p-7"
            >
              <div
                className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${s.accent} opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-brand">
                    <s.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-5 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>

                <div className="mt-7">
                  <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                    {s.eyebrow}
                  </div>
                  <h3 className="font-display mt-1.5 text-2xl font-semibold tracking-tight text-fg">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    {s.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-fg-muted"
                    >
                      <span className="size-1 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

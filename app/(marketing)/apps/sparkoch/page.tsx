import Link from "next/link";
import {
  Camera,
  ChefHat,
  Tag,
  Leaf,
  WalletMinimal,
  Sparkles,
  Apple,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "SparKoch — KI-Koch-App",
  description:
    "SparKoch scannt deinen Kühlschrank, findet die besten Supermarkt-Angebote und schlägt dir passende Rezepte vor. Verfügbar für iOS und Android.",
};

const FEATURES = [
  {
    icon: Camera,
    title: "Kühlschrank-Scanner",
    body: "Foto vom Kühlschrank — die KI erkennt Lebensmittel, schätzt Mengen und sortiert nach Kategorie. Keine Tipparbeit.",
  },
  {
    icon: ChefHat,
    title: "Smarte Rezeptvorschläge",
    body: "Rezepte, die zu deinen vorhandenen Zutaten passen. Match-Quote zeigt sofort, wie viel du schon zuhause hast.",
  },
  {
    icon: Tag,
    title: "Prospekt-Scanner",
    body: "Wochen-Prospekte abfotografieren — SparKoch extrahiert Angebote von REWE, EDEKA, Kaufland und Co.",
  },
  {
    icon: WalletMinimal,
    title: "Spar-Modus",
    body: "Rezepte, die exakt mit den aktuellen Angeboten kalkuliert werden. Du kochst günstiger, ohne zu suchen.",
  },
  {
    icon: Users,
    title: "Familien-Modus",
    body: "Mehrere Mitglieder, eine geteilte Vorratsliste. Wer kauft was — automatisch synchron.",
  },
  {
    icon: Leaf,
    title: "Weniger Verschwendung",
    body: "Die App schlägt Rezepte mit ablaufenden Lebensmitteln zuerst vor. Spürbar weniger im Müll.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Scannen",
    body: "Foto vom Kühlschrank — KI erkennt alle Zutaten in Sekunden.",
  },
  {
    n: "02",
    title: "Entdecken",
    body: "Personalisierte Rezeptvorschläge mit Match-Quote zu deinen Zutaten.",
  },
  {
    n: "03",
    title: "Sparen",
    body: "Prospekte einscannen, beste Angebote in Rezepte einbauen.",
  },
  {
    n: "04",
    title: "Kochen",
    body: "Schritt-für-Schritt-Anleitung mit Nährwerten und Timer.",
  },
];

export default function SparkochPage() {
  return (
    <>
      <PageHero
        eyebrow="SparKoch · iOS & Android"
        title="Foto vom Kühlschrank."
        highlight="Rezept aus den Angeboten."
        description="SparKoch erkennt mit KI deine Lebensmittel, kombiniert sie mit aktuellen Supermarkt-Prospekten und schlägt dir Rezepte vor, die zu Vorrat und Geldbeutel passen."
      >
        <Button href="#download" variant="brand" size="lg">
          App laden
        </Button>
        <Button href="/projekte/sparkoch" variant="secondary" size="lg">
          Case ansehen
        </Button>
      </PageHero>

      <section id="download" className="border-y border-border bg-bg-subtle/40 py-10">
        <Container>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              Verfügbar in den Stores
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StoreBadge
                href="https://apps.apple.com/app/sparkoch"
                icon={<Apple className="size-5" />}
                top="Download im"
                bottom="App Store"
              />
              <StoreBadge
                href="https://play.google.com/store/apps/details?id=de.sparkoch.app"
                icon={
                  <svg viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M3.5 2.7c-.3.3-.5.7-.5 1.2v16.2c0 .5.2.9.5 1.2l9.3-9.3-9.3-9.3zm10.6 8.3l2.3 2.3 4.4-2.5c.6-.3.6-1.2 0-1.5l-4.4-2.5-2.3 2.3 0 1.9zm-1.3 1.3l-9.3 9.3c.4.1.8.1 1.1-.1l11-6.3-2.8-2.9zm0-2.6l2.8-2.9-11-6.3c-.3-.2-.7-.2-1.1-.1l9.3 9.3z" />
                  </svg>
                }
                top="Verfügbar bei"
                bottom="Google Play"
              />
            </div>
            <p className="text-xs text-fg-subtle">
              Die Stores-Links werden nach App-Store-Approval aktiviert.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Was die App kann</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Smartes Kochen,{" "}
              <span className="text-gradient-brand">spürbar günstiger.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong"
              >
                <f.icon className="size-6 text-brand" />
                <h3 className="font-display mt-4 text-lg font-semibold text-fg">
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

      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>So funktioniert's</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              In vier Schritten{" "}
              <span className="text-gradient-brand">vom Foto zum Teller.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-border bg-white/[0.02] p-6"
              >
                <div className="font-display text-3xl font-semibold tracking-tight text-gradient-brand">
                  {s.n}
                </div>
                <h3 className="font-display mt-4 text-lg font-semibold text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container size="sm">
          <Eyebrow>Datenschutz & Sicherheit</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            <span className="text-gradient">DSGVO-konform.</span>{" "}
            <span className="text-fg">EU-Hosting. Keine Tracking-Tools.</span>
          </h2>
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-fg-muted">
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
              Backend in Frankfurt (Supabase, EU-Region) — keine Daten in Drittländer
              ohne explizite Einwilligung.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
              Fotos werden nur temporär zur Analyse verarbeitet und nicht
              dauerhaft auf unseren Servern gespeichert.
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
              Keine Tracking-Pixel, keine Werbe-IDs, kein Profiling für Dritte.
            </li>
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-brand" />
              Apple-Privacy-Manifest und App-Tracking-Transparency korrekt
              deklariert.
            </li>
          </ul>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-3 md:grid-cols-3">
            <LegalLink
              href="/apps/sparkoch/datenschutz"
              title="Datenschutz"
              body="Vollständige Datenschutzerklärung nach DSGVO — auch der Link, der bei Apple hinterlegt ist."
            />
            <LegalLink
              href="/apps/sparkoch/support"
              title="Support"
              body="FAQ, Kontaktwege, Account-Löschung. Der Support-Link für den App Store."
            />
            <LegalLink
              href="/apps/sparkoch/nutzungsbedingungen"
              title="Nutzungsbedingungen"
              body="Allgemeine Nutzungsbedingungen (EULA). Wer einen eigenen EULA hinterlegt: hier ist er."
            />
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}

function StoreBadge({
  href,
  icon,
  top,
  bottom,
}: {
  href: string;
  icon: React.ReactNode;
  top: string;
  bottom: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-3 rounded-xl border border-border bg-white/[0.04] px-5 py-2.5 transition-colors hover:border-border-strong hover:bg-white/[0.06]"
    >
      <div className="text-fg">{icon}</div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-fg-subtle">
          {top}
        </span>
        <span className="font-display text-base font-semibold text-fg">
          {bottom}
        </span>
      </div>
    </Link>
  );
}

function LegalLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong hover:bg-white/[0.04]"
    >
      <h3 className="font-display text-lg font-semibold text-fg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-brand transition-transform group-hover:translate-x-1">
        Öffnen →
      </span>
    </Link>
  );
}

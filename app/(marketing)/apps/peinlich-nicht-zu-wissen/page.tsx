import Link from "next/link";
import {
  BookOpen,
  Brain,
  Shuffle,
  Lightbulb,
  Apple,
  Zap,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "Peinlich nicht zu wissen — Quiz-App",
  description:
    "Quiz-App mit den wichtigsten Fragen, die jede:r in Deutschland wissen sollte. Geschichte, Politik, Geographie, Kultur, Wissenschaft und Sprache — kuratiert, ohne Account.",
};

const CATEGORIES = [
  { emoji: "📜", name: "Geschichte", count: 21 },
  { emoji: "⚖️", name: "Politik & Recht", count: 21 },
  { emoji: "🗺️", name: "Geographie", count: 59 },
  { emoji: "🎭", name: "Kultur", count: 19 },
  { emoji: "🔬", name: "Wissenschaft", count: 21 },
  { emoji: "🔤", name: "Sprache", count: 21 },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: "Kuratierte Fragen",
    body: "162 handverlesene Fragen, die nicht aus einer beliebigen Trivia-Datenbank stammen — sondern aus dem Wissen, das man als Deutsche:r kennen sollte.",
  },
  {
    icon: Lightbulb,
    title: "Erklärungen",
    body: "Zu jeder Antwort gibt es eine kurze Erläuterung. Du lernst beim Spielen, statt nur zu raten.",
  },
  {
    icon: Shuffle,
    title: "Schnellrunde",
    body: "15 zufällige Fragen aus allen Kategorien. Perfekt für die Wartezeit beim Bus.",
  },
  {
    icon: Brain,
    title: "Sechs Wissensgebiete",
    body: "Geschichte, Politik & Recht, Geographie, Kultur, Wissenschaft und Sprache — die Bausteine deutschen Allgemeinwissens.",
  },
  {
    icon: Zap,
    title: "Kein Login, sofort starten",
    body: "Kein Account, keine E-Mail, keine Profilseite. App öffnen und direkt spielen.",
  },
  {
    icon: Smartphone,
    title: "iOS & Android",
    body: "Native Material-3-Optik, schnelle Antwortzeiten und automatischer Hell-/Dunkel-Modus.",
  },
];

export default function PnzwPage() {
  return (
    <>
      <PageHero
        eyebrow="Peinlich nicht zu wissen · iOS & Android"
        title="Das Allgemeinwissen,"
        highlight="das man eigentlich kennen sollte."
        description="Eine Quiz-App mit kuratierten Fragen aus Geschichte, Politik, Geographie, Kultur, Wissenschaft und Sprache. Keine sinnlosen Trivia — nur was wirklich zählt."
      >
        <Button href="#download" variant="brand" size="lg">
          App laden
        </Button>
        <Button
          href="/projekte/peinlich-nicht-zu-wissen"
          variant="secondary"
          size="lg"
        >
          Case ansehen
        </Button>
      </PageHero>

      <section
        id="download"
        className="border-y border-border bg-bg-subtle/40 py-10"
      >
        <Container>
          <div className="flex flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
              Verfügbar in den Stores
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <StoreBadge
                href="https://apps.apple.com/app/peinlich-nicht-zu-wissen"
                icon={<Apple className="size-5" />}
                top="Download im"
                bottom="App Store"
              />
              <StoreBadge
                href="https://play.google.com/store/apps/details?id=com.pnzw"
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
            <Eyebrow>Kategorien</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Sechs Wissensgebiete,{" "}
              <span className="text-gradient-brand">162 kuratierte Fragen.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-white/[0.02] p-5 transition-colors hover:border-border-strong"
              >
                <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-white/[0.04] text-2xl">
                  {c.emoji}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-fg">
                    {c.name}
                  </h3>
                  <p className="text-sm text-fg-muted">{c.count} Fragen</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Was die App ausmacht</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Quiz, das{" "}
              <span className="text-gradient-brand">tatsächlich etwas bringt.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong"
              >
                <f.icon className="size-6 text-warning" />
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
        <Container size="sm">
          <Eyebrow>Werbe-finanziert · ohne Account</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            <span className="text-gradient">Kostenlos.</span>{" "}
            <span className="text-fg">Mit dezenten Anzeigen zwischen den Runden.</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-fg-muted">
            Die App ist komplett kostenlos. Zwischen Quiz-Runden zeigen wir
            gelegentlich eine Vollbild-Anzeige (Google Mobile Ads) — das ist die
            einzige Finanzierung. Es gibt keine Account-Pflicht, kein Login, kein
            Profil. Beim ersten Start kannst du der personalisierten Werbung
            zustimmen oder ablehnen — die App funktioniert in beiden Fällen
            identisch.
          </p>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-3 md:grid-cols-3">
            <LegalLink
              href="/apps/peinlich-nicht-zu-wissen/datenschutz"
              title="Datenschutz"
              body="Vollständige Datenschutzerklärung mit allen Angaben zu Werbung und AdMob."
            />
            <LegalLink
              href="/apps/peinlich-nicht-zu-wissen/support"
              title="Support"
              body="FAQ, Kontakt und Hinweise zu Anzeigen, Werbe-Reset und Datenanfragen."
            />
            <LegalLink
              href="/apps/peinlich-nicht-zu-wissen/nutzungsbedingungen"
              title="Nutzungsbedingungen"
              body="Allgemeine Nutzungsbedingungen (EULA) für die Quiz-App."
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
      <h3 className="font-display text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
      <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-wider text-warning transition-transform group-hover:translate-x-1">
        Öffnen →
      </span>
    </Link>
  );
}

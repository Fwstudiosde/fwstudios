import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="orb left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 bg-brand/25"
        aria-hidden
      />
      <div className="relative max-w-lg text-center">
        <div className="font-display text-[120px] font-semibold leading-none tracking-tight">
          <span className="text-gradient-brand">404</span>
        </div>
        <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Diese Seite existiert nicht.
        </h1>
        <p className="mt-4 text-base text-fg-muted">
          Vielleicht ist sie umgezogen, vielleicht gibt es sie nie. Aber wir können
          Ihnen helfen, etwas Sinnvolles zu finden.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="brand" size="lg">
            Zur Startseite
          </Button>
          <Button href="/projekte" variant="secondary" size="lg">
            Unsere Projekte
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-t border-border pt-8">
          {[
            { href: "/chatbot", label: "Chatbot" },
            { href: "/ki-loesungen", label: "KI-Lösungen" },
            { href: "/plattform-entwicklung", label: "Plattform" },
            { href: "/app-entwicklung", label: "Apps" },
            { href: "/ueber-uns", label: "Über uns" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

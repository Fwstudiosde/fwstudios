"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    q: "Wie schnell ist der Chatbot live?",
    a: "Im Standard-Setup innerhalb von 7 Werktagen. Komplexere Custom-Integrationen brauchen typischerweise 2–4 Wochen.",
  },
  {
    q: "Auf welche Daten wird die KI trainiert?",
    a: "Standardmäßig auf Ihre komplette Website. Optional integrieren wir Backend-Datenquellen, PDFs, Notion, Confluence, Datenbanken und APIs.",
  },
  {
    q: "Wo werden die Daten gespeichert?",
    a: "Ausschließlich in EU-Rechenzentren. Wir sind DSGVO-konform und stellen einen Auftragsverarbeitungsvertrag (AVV) bereit.",
  },
  {
    q: "Welche LLMs nutzt ihr?",
    a: "Wir wählen das passende Modell pro Use-Case — Claude, GPT, Mistral oder ein Open-Source-Modell auf eigener Infrastruktur. On-Premise auf Wunsch.",
  },
  {
    q: "Was passiert, wenn ich kündigen will?",
    a: "Die Konditionen — inkl. Vertragslaufzeit und Kündigungsfristen — werden individuell vereinbart. Sie behalten in jedem Fall den Export Ihrer Konfiguration und Conversation-Logs.",
  },
  {
    q: "Wie laufen die Konditionen ab?",
    a: "Wir geben einen verbindlichen Festpreis nach kostenloser Erstberatung. Kein Standard-Tarif — alles wird auf Ihren Use-Case zugeschnitten.",
  },
  {
    q: "Übernehmt ihr auch komplette Plattform-Projekte?",
    a: "Ja. Von Landing-Page über SaaS-Backend bis zur kompletten internen Plattform — Festpreis nach Erstberatung.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" className="border-t border-border">
      <Container size="sm">
        <div className="text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Häufige Fragen.
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
          {ITEMS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span className="font-display text-base font-medium text-fg sm:text-lg">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-fg-muted transition-transform duration-200",
            open && "rotate-180 text-fg"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-fg-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

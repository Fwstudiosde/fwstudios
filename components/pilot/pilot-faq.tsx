"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import type { PilotFaq } from "@/lib/content/pilot";

export function PilotFAQ({ title, faq }: { title: string; faq: PilotFaq[] }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-white/[0.02] sm:mt-16">
          {faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="px-5 sm:px-6">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-fg"
                >
                  <span className="font-display text-base font-semibold text-fg sm:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`mt-1 size-5 shrink-0 text-fg-muted transition-transform ${
                      isOpen ? "rotate-180 text-brand" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 pr-9 text-sm leading-relaxed text-fg-muted">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

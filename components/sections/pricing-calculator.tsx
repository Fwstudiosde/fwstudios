"use client";

import * as React from "react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Type = "chatbot" | "ki" | "platform" | "mobile";

const TYPES: { id: Type; label: string; from: number }[] = [
  { id: "chatbot", label: "KI-Chatbot", from: 2500 },
  { id: "ki", label: "KI-Lösung", from: 8000 },
  { id: "platform", label: "Plattform", from: 12000 },
  { id: "mobile", label: "Mobile App", from: 18000 },
];

const SCOPES = [
  { id: "small", label: "MVP / Proof of Concept", mult: 1 },
  { id: "medium", label: "Production-Ready", mult: 1.8 },
  { id: "large", label: "Enterprise / Skaliert", mult: 3.2 },
];

const ADDONS = [
  { id: "auth", label: "Auth + Multi-Tenant", price: 1800 },
  { id: "billing", label: "Stripe-Abrechnung", price: 1500 },
  { id: "analytics", label: "Analytics-Dashboard", price: 2200 },
  { id: "integrations", label: "API-Integrationen (3+)", price: 2800 },
  { id: "design", label: "Custom Design-System", price: 3500 },
  { id: "ai", label: "Erweiterte KI-Workflows", price: 3200 },
];

export function PricingCalculator() {
  const [type, setType] = React.useState<Type>("chatbot");
  const [scope, setScope] = React.useState(SCOPES[1].id);
  const [addons, setAddons] = React.useState<string[]>([]);

  const base = TYPES.find((t) => t.id === type)!.from;
  const scopeMult = SCOPES.find((s) => s.id === scope)!.mult;
  const addonsTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce(
    (s, a) => s + a.price,
    0
  );
  const min = Math.round((base * scopeMult + addonsTotal) * 0.92);
  const max = Math.round((base * scopeMult + addonsTotal) * 1.18);

  function toggleAddon(id: string) {
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  }

  return (
    <Section id="rechner" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Investitions-Rechner</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Kosten?{" "}
            <span className="text-gradient-brand">Sehen Sie selbst.</span>
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Eine ehrliche Range — der Festpreis kommt nach unserem Erstgespräch.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-border bg-white/[0.02] p-6 backdrop-blur sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-7">
              {/* Type */}
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Was bauen wir?
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TYPES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-left text-sm transition-colors",
                        type === t.id
                          ? "border-brand/50 bg-brand/10 text-fg"
                          : "border-border bg-white/[0.02] text-fg-muted hover:border-border-strong hover:text-fg"
                      )}
                    >
                      <div className="font-medium">{t.label}</div>
                      <div className="mt-0.5 text-xs text-fg-subtle">
                        ab {t.from.toLocaleString("de-DE")} €
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scope */}
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Umfang
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {SCOPES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setScope(s.id)}
                      className={cn(
                        "rounded-lg border px-3 py-3 text-left text-sm transition-colors",
                        scope === s.id
                          ? "border-brand/50 bg-brand/10 text-fg"
                          : "border-border bg-white/[0.02] text-fg-muted hover:border-border-strong hover:text-fg"
                      )}
                    >
                      <div className="font-medium">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Addons */}
              <div>
                <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Zusatzmodule
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ADDONS.map((a) => {
                    const selected = addons.includes(a.id);
                    return (
                      <button
                        key={a.id}
                        onClick={() => toggleAddon(a.id)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                          selected
                            ? "border-brand/50 bg-brand/10 text-fg"
                            : "border-border bg-white/[0.02] text-fg-muted hover:border-border-strong hover:text-fg"
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "size-4 rounded border transition-colors",
                              selected
                                ? "border-brand bg-brand"
                                : "border-border bg-bg"
                            )}
                          >
                            {selected && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="text-bg"
                              >
                                <path
                                  d="M5 12l4 4L19 7"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          {a.label}
                        </span>
                        <span className="text-xs text-fg-subtle">
                          +{a.price.toLocaleString("de-DE")} €
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="sticky top-24 self-start rounded-xl border border-border bg-bg/60 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Geschätzte Range
              </div>
              <div className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg">
                {min.toLocaleString("de-DE")} –{" "}
                {max.toLocaleString("de-DE")} €
              </div>
              <div className="mt-1 text-xs text-fg-muted">
                Einmalig. Festpreis nach Erstberatung.
              </div>
              <div className="mt-5 border-t border-border pt-4 text-xs">
                <div className="flex justify-between text-fg-muted">
                  <span>Basis</span>
                  <span>{base.toLocaleString("de-DE")} €</span>
                </div>
                <div className="mt-1 flex justify-between text-fg-muted">
                  <span>Umfang</span>
                  <span>×{scopeMult}</span>
                </div>
                <div className="mt-1 flex justify-between text-fg-muted">
                  <span>Module</span>
                  <span>+{addonsTotal.toLocaleString("de-DE")} €</span>
                </div>
              </div>
              <Button
                href="/#kontakt"
                variant="brand"
                size="md"
                className="mt-6 w-full"
              >
                Festpreis anfragen
              </Button>
            </aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}

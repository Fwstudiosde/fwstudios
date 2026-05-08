"use client";

import * as React from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "");
    const _gotcha = String(fd.get("_gotcha") ?? "");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, _gotcha, source: "newsletter-section" }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? "Fehlgeschlagen.");
      setState("error");
      return;
    }
    setState("done");
  }

  return (
    <Section className="border-t border-border" id="newsletter">
      <Container size="sm">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2 to-surface p-8 sm:p-12">
          <div
            className="orb -right-20 -top-20 size-72 bg-brand/30"
            aria-hidden
          />
          <div className="relative grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex size-14 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-brand">
              <Mail className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                KI-Insights — einmal im Monat ins Postfach.
              </h2>
              <p className="mt-2 text-sm text-fg-muted sm:text-base">
                Konkrete Use-Cases, ehrliche Einschätzungen, kein Bullshit. Jederzeit
                abbestellbar.
              </p>
            </div>
          </div>

          {state === "done" ? (
            <div className="relative mt-7 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
              <Check className="size-4" /> Eingetragen — bestätige bitte den
              Double-Opt-in in deinem Postfach.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="relative mt-7 flex flex-col gap-2 sm:flex-row"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden
              />
              <input
                type="email"
                name="email"
                required
                placeholder="ihre@firma.de"
                className="flex-1 rounded-lg border border-border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <Button
                type="submit"
                variant="brand"
                size="lg"
                disabled={state === "loading"}
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> …
                  </>
                ) : (
                  "Anmelden"
                )}
              </Button>
              {error && (
                <div className="text-xs text-danger sm:absolute sm:left-0 sm:top-full sm:mt-2">
                  {error}
                </div>
              )}
            </form>
          )}
          <p className="relative mt-3 text-[11px] text-fg-subtle">
            Mit dem Absenden akzeptierst du unsere{" "}
            <a href="/datenschutz" className="underline hover:text-fg">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}

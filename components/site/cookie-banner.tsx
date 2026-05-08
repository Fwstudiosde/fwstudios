"use client";

import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { cn } from "@/lib/utils";

const KEY = "fw_consent_v1";
const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "fwstudios.de";

type Consent = { analytics: boolean; ts: number };

function read(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function write(c: Consent) {
  localStorage.setItem(KEY, JSON.stringify(c));
}

export function CookieBanner() {
  const [consent, setConsent] = React.useState<Consent | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const c = read();
    setConsent(c);
    if (!c) setTimeout(() => setOpen(true), 800);
  }, []);

  function decide(analytics: boolean) {
    const c = { analytics, ts: Date.now() };
    write(c);
    setConsent(c);
    setOpen(false);
  }

  return (
    <>
      {consent?.analytics && PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-50 flex justify-center transition-all duration-500 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:right-auto",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface/95 p-5 shadow-2xl backdrop-blur-xl">
          <h3 className="font-display text-sm font-semibold text-fg">
            Cookies & Analytics
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
            Wir nutzen <strong className="text-fg">Plausible</strong> — eine
            cookieless, EU-gehostete Analytics-Lösung. Keine Third-Party-Tracker,
            keine personenbezogenen Daten. Sie können trotzdem widersprechen.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => decide(true)}
              className="flex-1 rounded-lg bg-brand px-3 py-2 text-sm font-medium text-bg transition-colors hover:bg-[#19c4f0]"
            >
              Akzeptieren
            </button>
            <button
              onClick={() => decide(false)}
              className="flex-1 rounded-lg border border-border bg-white/[0.03] px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
            >
              Nur notwendig
            </button>
          </div>
          <Link
            href="/datenschutz"
            className="mt-2 block text-center text-[11px] text-fg-subtle underline-offset-4 hover:text-fg hover:underline"
          >
            Mehr erfahren · Datenschutz
          </Link>
        </div>
      </div>
    </>
  );
}

"use client";

import * as React from "react";
import { Flame } from "lucide-react";

export function FoundingBanner({
  spotsLeft,
  spotsTotal,
  discountPercent,
  phrase,
}: {
  spotsLeft: number;
  spotsTotal: number;
  discountPercent: number;
  phrase: string;
}) {
  const allTaken = spotsLeft <= 0;
  return (
    <div
      role="region"
      aria-label="Founding-Programm Hinweis"
      className="sticky top-0 z-50 border-b border-brand/30 bg-gradient-to-r from-brand/20 via-accent-purple/20 to-brand/20 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-2.5 text-center sm:flex-row sm:gap-4 sm:py-3 sm:text-left lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-fg">
          <Flame className="size-3.5 text-brand" aria-hidden />
          <span>Founding-Programm</span>
        </div>
        <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden />
        <p className="text-xs text-fg-muted sm:text-sm">
          <span className="text-fg">{phrase.split("·")[1]?.trim() || phrase}</span>{" "}
          <span className="text-fg-subtle">·</span>{" "}
          <span className="font-semibold text-brand">
            {discountPercent} % Setup-Vorteil
          </span>
        </p>
        <span className="hidden h-3 w-px bg-border-strong sm:block" aria-hidden />
        <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-bg/60 px-3 py-1 text-xs font-semibold text-fg">
          {allTaken ? (
            <>
              <span className="size-1.5 rounded-full bg-fg-subtle" aria-hidden />
              Alle Plätze vergeben
            </>
          ) : (
            <>
              <span
                className="size-1.5 animate-pulse rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]"
                aria-hidden
              />
              {spotsLeft} von {spotsTotal} Plätzen noch frei
            </>
          )}
        </div>
      </div>
    </div>
  );
}

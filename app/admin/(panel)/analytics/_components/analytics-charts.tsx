"use client";

import * as React from "react";

export function AnalyticsCharts({
  funnel,
  sources,
  months,
}: {
  funnel: Record<string, number>;
  sources: { source: string; count: number }[];
  months: { label: string; count: number }[];
}) {
  const funnelOrder: { key: keyof typeof funnel; label: string; color: string }[] = [
    { key: "neu", label: "Neu", color: "var(--color-brand)" },
    { key: "kontaktiert", label: "Kontaktiert", color: "#5b8cff" },
    { key: "qualifiziert", label: "Qualifiziert", color: "#7c5cff" },
    { key: "gewonnen", label: "Gewonnen", color: "var(--color-success)" },
    { key: "verloren", label: "Verloren", color: "var(--color-fg-faint)" },
  ];
  const funnelMax = Math.max(...funnelOrder.map((s) => funnel[s.key]), 1);
  const monthsMax = Math.max(...months.map((m) => m.count), 1);
  const sourcesMax = Math.max(...sources.map((s) => s.count), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Funnel */}
      <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
        <h3 className="font-display text-base font-semibold text-fg">
          Lead-Funnel
        </h3>
        <div className="mt-5 space-y-3">
          {funnelOrder.map((s) => {
            const v = funnel[s.key];
            return (
              <div key={s.key}>
                <div className="mb-1 flex items-center justify-between text-xs text-fg-muted">
                  <span>{s.label}</span>
                  <span className="font-display tabular-nums text-fg">{v}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(v / funnelMax) * 100}%`,
                      background: s.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sources */}
      <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
        <h3 className="font-display text-base font-semibold text-fg">
          Lead-Quellen
        </h3>
        {sources.length === 0 ? (
          <div className="mt-8 text-center text-sm text-fg-muted">
            Noch keine Daten.
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {sources.map((s) => (
              <div key={s.source}>
                <div className="mb-1 flex items-center justify-between text-xs text-fg-muted">
                  <span className="capitalize">{s.source}</span>
                  <span className="font-display tabular-nums text-fg">
                    {s.count}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.04]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-accent-purple transition-all duration-700"
                    style={{ width: `${(s.count / sourcesMax) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly trend */}
      <div className="rounded-2xl border border-border bg-white/[0.02] p-6 lg:col-span-2">
        <h3 className="font-display text-base font-semibold text-fg">
          Leads / Monat (letzte 6)
        </h3>
        <div className="mt-6 flex h-48 items-end gap-3">
          {months.map((m) => (
            <div key={m.label} className="flex flex-1 flex-col items-center">
              <div className="text-xs text-fg-muted">{m.count}</div>
              <div className="mt-1 flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand/40 to-brand transition-all duration-700"
                  style={{
                    height: `${(m.count / monthsMax) * 100}%`,
                    minHeight: m.count > 0 ? "4px" : "1px",
                  }}
                />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-fg-subtle">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

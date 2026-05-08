"use client";

import * as React from "react";
import type { LegalPages } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS: { key: keyof LegalPages; label: string }[] = [
  { key: "impressum", label: "Impressum" },
  { key: "datenschutz", label: "Datenschutz" },
  { key: "agb", label: "AGB" },
  { key: "widerruf", label: "Widerruf" },
];

export function LegalEditor({ initial }: { initial: LegalPages }) {
  const [data, setData] = React.useState<LegalPages>(initial);
  const [active, setActive] = React.useState<keyof LegalPages>("impressum");
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  function update(field: "title" | "content", value: string) {
    setData((d) => ({ ...d, [active]: { ...d[active], [field]: value } }));
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/legal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
      {/* Side tabs */}
      <nav className="flex flex-row gap-1 lg:flex-col">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              active === t.key
                ? "bg-white/[0.06] text-fg"
                : "text-fg-muted hover:bg-white/[0.03] hover:text-fg"
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
        <div className="grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-fg-muted">
              Titel
            </span>
            <input
              value={data[active].title}
              onChange={(e) => update("title", e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-fg-muted">
              <span>Inhalt (HTML)</span>
              <a
                href={`/${active}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand hover:underline"
              >
                Vorschau öffnen ↗
              </a>
            </span>
            <textarea
              value={data[active].content}
              onChange={(e) => update("content", e.target.value)}
              rows={20}
              className={cn(inputCls, "font-mono text-xs")}
            />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-success">
              <Check className="size-3.5" /> Gespeichert
            </span>
          )}
          <Button onClick={save} variant="brand" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Speichern …
              </>
            ) : (
              "Speichern"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import type { EmailTemplate } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check, Loader2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function TemplatesEditor({ initial }: { initial: EmailTemplate[] }) {
  const [items, setItems] = React.useState(initial);
  const [activeId, setActiveId] = React.useState<string | null>(
    items[0]?.id ?? null
  );
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [copied, setCopied] = React.useState<"subject" | "body" | null>(null);

  const active = items.find((x) => x.id === activeId);

  function update(field: "name" | "subject" | "body", value: string) {
    if (!active) return;
    setItems((p) =>
      p.map((t) => (t.id === active.id ? { ...t, [field]: value } : t))
    );
    setSaved(false);
  }

  async function save() {
    if (!active) return;
    setSaving(true);
    await fetch(`/api/templates/${active.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: active.name,
        subject: active.subject,
        body: active.body,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function add() {
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Neue Vorlage",
        subject: "Betreff",
        body: "Hallo {{name}},\n\n…\n\nGrüße",
      }),
    });
    if (res.ok) {
      const { template } = await res.json();
      setItems((p) => [...p, template]);
      setActiveId(template.id);
    }
  }

  async function remove(id: string) {
    if (!confirm("Vorlage löschen?")) return;
    setItems((p) => p.filter((x) => x.id !== id));
    if (activeId === id) setActiveId(items.find((t) => t.id !== id)?.id ?? null);
    await fetch(`/api/templates/${id}`, { method: "DELETE" });
  }

  function copy(field: "subject" | "body") {
    if (!active) return;
    navigator.clipboard.writeText(active[field]);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside>
        <div className="space-y-1">
          {items.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              className={cn(
                "group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                t.id === activeId
                  ? "bg-white/[0.06] text-fg"
                  : "text-fg-muted hover:bg-white/[0.03] hover:text-fg"
              )}
            >
              <span className="truncate">{t.name}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  remove(t.id);
                }}
                className="opacity-0 transition-opacity hover:text-danger group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={add}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-2 text-sm text-fg-muted transition-colors hover:border-brand/40 hover:text-brand"
        >
          <Plus className="size-4" /> Neue Vorlage
        </button>
        <div className="mt-6 rounded-lg border border-border bg-white/[0.02] p-3 text-[11px] text-fg-muted">
          <strong className="text-fg">Platzhalter:</strong>
          <code className="ml-1 rounded bg-bg px-1 py-0.5 text-brand">
            {`{{name}}`}
          </code>{" "}
          <code className="rounded bg-bg px-1 py-0.5 text-brand">
            {`{{date}}`}
          </code>{" "}
          <code className="rounded bg-bg px-1 py-0.5 text-brand">
            {`{{company}}`}
          </code>
        </div>
      </aside>

      {active ? (
        <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
          <div className="grid gap-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-fg-muted">
                Name (intern)
              </span>
              <input
                value={active.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-fg-muted">
                Betreff
                <button
                  onClick={() => copy("subject")}
                  className="inline-flex items-center gap-1 text-fg-subtle hover:text-fg"
                >
                  {copied === "subject" ? (
                    <>
                      <Check className="size-3" /> kopiert
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" /> kopieren
                    </>
                  )}
                </button>
              </span>
              <input
                value={active.subject}
                onChange={(e) => update("subject", e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-fg-muted">
                Body
                <button
                  onClick={() => copy("body")}
                  className="inline-flex items-center gap-1 text-fg-subtle hover:text-fg"
                >
                  {copied === "body" ? (
                    <>
                      <Check className="size-3" /> kopiert
                    </>
                  ) : (
                    <>
                      <Copy className="size-3" /> kopieren
                    </>
                  )}
                </button>
              </span>
              <textarea
                value={active.body}
                onChange={(e) => update("body", e.target.value)}
                rows={14}
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
      ) : (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-border p-16 text-sm text-fg-muted">
          Vorlage links auswählen oder neue erstellen.
        </div>
      )}
    </div>
  );
}

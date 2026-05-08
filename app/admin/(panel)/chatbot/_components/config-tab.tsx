"use client";

import * as React from "react";
import { Loader2, Save, KeyRound, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatbotConfig } from "@/lib/chatbot/types";

const MODELS = [
  { id: "claude-haiku-4-5-20251001", label: "Claude Haiku 4.5 — schnell, günstig" },
  { id: "claude-sonnet-4-6", label: "Claude Sonnet 4.6 — Standard, ausgewogen" },
  { id: "claude-opus-4-7", label: "Claude Opus 4.7 — höchste Qualität" },
];

const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20 transition";

export function ConfigTab({
  config,
  onConfigChange,
}: {
  config: ChatbotConfig;
  onConfigChange: (c: ChatbotConfig) => void;
}) {
  const [draft, setDraft] = React.useState<ChatbotConfig>(config);
  const [apiKeyInput, setApiKeyInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [status, setStatus] = React.useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  function setField<K extends keyof ChatbotConfig>(key: K, val: ChatbotConfig[K]) {
    setDraft((d) => ({ ...d, [key]: val }));
  }

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const body: Record<string, unknown> = {
        model: draft.model,
        temperature: draft.temperature,
        maxTokens: draft.maxTokens,
        systemPrompt: draft.systemPrompt,
        welcomeMessage: draft.welcomeMessage,
        toolsEnabled: draft.toolsEnabled,
        bookingUrl: draft.bookingUrl,
        leadCapture: draft.leadCapture,
      };
      if (apiKeyInput.trim()) {
        body.apiKey = apiKeyInput.trim();
      }
      const res = await fetch("/api/admin/chatbot/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const next = (await res.json()) as ChatbotConfig;
      setDraft(next);
      onConfigChange(next);
      setApiKeyInput("");
      setStatus({ kind: "ok", text: "Gespeichert." });
    } catch (err) {
      setStatus({
        kind: "err",
        text: err instanceof Error ? err.message : "Fehler beim Speichern",
      });
    } finally {
      setSaving(false);
    }
  }

  async function clearKey() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/chatbot/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: null }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const next = (await res.json()) as ChatbotConfig;
      setDraft(next);
      onConfigChange(next);
      setStatus({ kind: "ok", text: "API-Key entfernt." });
    } catch (err) {
      setStatus({
        kind: "err",
        text: err instanceof Error ? err.message : "Fehler",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <Section title="Anthropic API-Key" icon={<KeyRound className="size-4" />}>
        <div className="grid gap-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.02] px-3 py-2.5 text-sm">
            {draft.hasApiKey ? (
              <>
                <Check className="size-4 text-success" />
                <span className="text-fg">Key hinterlegt — verschlüsselt gespeichert.</span>
                <button
                  onClick={clearKey}
                  className="ml-auto text-xs text-danger hover:underline"
                  disabled={saving}
                >
                  Entfernen
                </button>
              </>
            ) : (
              <>
                <X className="size-4 text-warning" />
                <span className="text-fg-muted">
                  Noch kein Key. Der Bot ist inaktiv, bis ein gültiger Key
                  hinterlegt ist.
                </span>
              </>
            )}
          </div>
          <input
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            type="password"
            placeholder="sk-ant-…"
            className={inputCls}
            autoComplete="off"
          />
          <p className="text-xs text-fg-subtle">
            Wird mit AES-256-GCM verschlüsselt im Daten-Verzeichnis gespeichert.
            Niemals an den Browser zurückgegeben.
          </p>
        </div>
      </Section>

      <Section title="Modell &amp; Verhalten">
        <div className="grid gap-4 lg:grid-cols-2">
          <Field label="Modell">
            <select
              value={draft.model}
              onChange={(e) => setField("model", e.target.value)}
              className={inputCls}
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Booking-URL">
            <input
              value={draft.bookingUrl}
              onChange={(e) => setField("bookingUrl", e.target.value)}
              className={inputCls}
              placeholder="https://cal.com/…"
            />
          </Field>
          <Field label={`Temperature (${draft.temperature.toFixed(2)})`}>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={draft.temperature}
              onChange={(e) =>
                setField("temperature", parseFloat(e.target.value))
              }
              className="w-full"
            />
          </Field>
          <Field label="Max Tokens pro Antwort">
            <input
              type="number"
              min={128}
              max={8192}
              value={draft.maxTokens}
              onChange={(e) =>
                setField("maxTokens", parseInt(e.target.value, 10) || 1024)
              }
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <Section title="System-Prompt &amp; Welcome">
        <div className="grid gap-4">
          <Field label="System-Prompt (Persona, Verhalten, Sprache)">
            <textarea
              value={draft.systemPrompt}
              onChange={(e) => setField("systemPrompt", e.target.value)}
              rows={6}
              className={inputCls}
            />
          </Field>
          <Field label="Welcome-Message (erste Bot-Nachricht)">
            <textarea
              value={draft.welcomeMessage}
              onChange={(e) => setField("welcomeMessage", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <Section title="Tools &amp; Lead-Capture">
        <div className="grid gap-4">
          <label className="flex items-center gap-3 text-sm text-fg">
            <input
              type="checkbox"
              checked={draft.toolsEnabled}
              onChange={(e) => setField("toolsEnabled", e.target.checked)}
              className="size-4 rounded border-border accent-brand"
            />
            Tool-Use aktivieren (capture_lead, book_meeting)
          </label>
          <label className="flex items-center gap-3 text-sm text-fg">
            <input
              type="checkbox"
              checked={draft.leadCapture.enabled}
              onChange={(e) =>
                setField("leadCapture", {
                  ...draft.leadCapture,
                  enabled: e.target.checked,
                })
              }
              className="size-4 rounded border-border accent-brand"
            />
            Lead-Capture aktiv (Bot fragt nach E-Mail bei Interesse)
          </label>
          <Field label="Lead-Capture Trigger-Hinweis (an Bot)">
            <textarea
              value={draft.leadCapture.triggerHint}
              onChange={(e) =>
                setField("leadCapture", {
                  ...draft.leadCapture,
                  triggerHint: e.target.value,
                })
              }
              rows={3}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <div className="sticky bottom-4 flex items-center justify-between gap-3 rounded-xl border border-border bg-bg/90 p-3 backdrop-blur">
        <div className="text-xs text-fg-subtle">
          {status ? (
            <span className={status.kind === "ok" ? "text-success" : "text-danger"}>
              {status.text}
            </span>
          ) : draft.updatedAt && draft.updatedAt !== new Date(0).toISOString() ? (
            <>Zuletzt gespeichert: {new Date(draft.updatedAt).toLocaleString("de-DE")}</>
          ) : (
            "Noch nicht gespeichert."
          )}
        </div>
        <Button onClick={save} disabled={saving} variant="brand" size="md">
          {saving ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Speichere …
            </>
          ) : (
            <>
              <Save className="size-4" /> Speichern
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-white/[0.02] p-6">
      <h2 className="font-display mb-5 flex items-center gap-2 text-lg font-semibold text-fg">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-fg-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

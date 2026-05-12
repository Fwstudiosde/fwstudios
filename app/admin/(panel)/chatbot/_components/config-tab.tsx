"use client";

import * as React from "react";
import {
  Loader2,
  Save,
  KeyRound,
  Check,
  X,
  CalendarClock,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
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
  const [calApiKeyInput, setCalApiKeyInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [calTesting, setCalTesting] = React.useState(false);
  const [calTestResult, setCalTestResult] = React.useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const [status, setStatus] = React.useState<{
    kind: "ok" | "err";
    text: string;
  } | null>(null);

  function setField<K extends keyof ChatbotConfig>(key: K, val: ChatbotConfig[K]) {
    setDraft((d) => ({ ...d, [key]: val }));
  }

  function setCalField<K extends keyof ChatbotConfig["cal"]>(
    key: K,
    val: ChatbotConfig["cal"][K]
  ) {
    setDraft((d) => ({ ...d, cal: { ...d.cal, [key]: val } }));
  }

  function setTeaserField<K extends keyof ChatbotConfig["teaser"]>(
    key: K,
    val: ChatbotConfig["teaser"][K]
  ) {
    setDraft((d) => ({ ...d, teaser: { ...d.teaser, [key]: val } }));
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
        cal: {
          eventTypeId: draft.cal.eventTypeId,
          eventDurationMinutes: draft.cal.eventDurationMinutes,
          timezone: draft.cal.timezone,
          defaultDaysAhead: draft.cal.defaultDaysAhead,
        },
        teaser: draft.teaser,
      };
      if (apiKeyInput.trim()) {
        body.apiKey = apiKeyInput.trim();
      }
      if (calApiKeyInput.trim()) {
        body.calApiKey = calApiKeyInput.trim();
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
      setCalApiKeyInput("");
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

  async function clearCalKey() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/chatbot/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ calApiKey: null }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const next = (await res.json()) as ChatbotConfig;
      setDraft(next);
      onConfigChange(next);
      setStatus({ kind: "ok", text: "Cal-Key entfernt." });
    } catch (err) {
      setStatus({
        kind: "err",
        text: err instanceof Error ? err.message : "Fehler",
      });
    } finally {
      setSaving(false);
    }
  }

  async function testCal() {
    setCalTesting(true);
    setCalTestResult(null);
    try {
      const res = await fetch("/api/admin/chatbot/cal/test", {
        method: "POST",
      });
      const data = (await res.json()) as
        | {
            ok: true;
            totalSlots: number;
            preview: { iso: string; label: string }[];
            timezone: string;
          }
        | { ok: false; error: string };
      if (data.ok) {
        const lines = data.preview.map((p) => `• ${p.label}`).join("\n");
        setCalTestResult({
          ok: true,
          text: `${data.totalSlots} freie Slots gefunden (TZ: ${data.timezone}). Nächste:\n${lines}`,
        });
      } else {
        setCalTestResult({ ok: false, text: data.error });
      }
    } catch (err) {
      setCalTestResult({
        ok: false,
        text: err instanceof Error ? err.message : "Test fehlgeschlagen",
      });
    } finally {
      setCalTesting(false);
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
            Tool-Use aktivieren (capture_lead, list_available_slots, book_slot)
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

      <Section
        title="Cal.com Live-Buchung"
        icon={<CalendarClock className="size-4" />}
      >
        <div className="grid gap-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-white/[0.02] px-3 py-2.5 text-sm">
            {draft.cal.hasApiKey ? (
              <>
                <Check className="size-4 text-success" />
                <span className="text-fg">
                  Cal API-Key hinterlegt — verschlüsselt gespeichert.
                </span>
                <button
                  onClick={clearCalKey}
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
                  Noch kein Cal-Key. Bot kann nur den Buchungslink posten,
                  nicht direkt buchen.
                </span>
              </>
            )}
          </div>
          <Field label="Cal API-Key (cal.com → Settings → Developer → API Keys)">
            <input
              value={calApiKeyInput}
              onChange={(e) => setCalApiKeyInput(e.target.value)}
              type="password"
              placeholder="cal_live_…"
              className={inputCls}
              autoComplete="off"
            />
          </Field>
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Event-Type (URL, username/slug oder ID)">
              <input
                value={draft.cal.eventTypeId}
                onChange={(e) => setCalField("eventTypeId", e.target.value)}
                placeholder="z.B. https://cal.eu/fwstudios/30min"
                className={inputCls}
              />
            </Field>
            <Field label="Termin-Dauer (Minuten)">
              <input
                type="number"
                min={5}
                max={240}
                value={draft.cal.eventDurationMinutes}
                onChange={(e) =>
                  setCalField(
                    "eventDurationMinutes",
                    parseInt(e.target.value, 10) || 30
                  )
                }
                className={inputCls}
              />
            </Field>
            <Field label="Zeitzone">
              <input
                value={draft.cal.timezone}
                onChange={(e) => setCalField("timezone", e.target.value)}
                placeholder="Europe/Berlin"
                className={inputCls}
              />
            </Field>
            <Field label="Slot-Suchfenster (Tage im Voraus)">
              <input
                type="number"
                min={1}
                max={60}
                value={draft.cal.defaultDaysAhead}
                onChange={(e) =>
                  setCalField(
                    "defaultDaysAhead",
                    parseInt(e.target.value, 10) || 14
                  )
                }
                className={inputCls}
              />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={testCal}
              disabled={calTesting || !draft.cal.hasApiKey || !draft.cal.eventTypeId}
              variant="secondary"
              size="sm"
            >
              {calTesting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Teste …
                </>
              ) : (
                <>
                  <PlayCircle className="size-4" /> Slots abrufen
                </>
              )}
            </Button>
            {calTestResult && (
              <span
                className={`whitespace-pre-line text-xs ${
                  calTestResult.ok ? "text-success" : "text-danger"
                }`}
              >
                {calTestResult.text}
              </span>
            )}
          </div>
          <p className="text-xs text-fg-subtle">
            Du kannst die ganze Event-URL einfügen (z.B.{" "}
            <code>https://cal.eu/fwstudios/30min</code>) — die numerische ID
            wird automatisch aus der Cal-API geholt. Sobald Key + Event-Type
            gesetzt sind, holt der Bot live freie Slots und bucht direkt im
            Chat — inkl. Cal-Bestätigungsmail an den User.
          </p>
        </div>
      </Section>

      <Section
        title="Pop-up wenn Chat geschlossen"
        icon={<MessageSquare className="size-4" />}
      >
        <div className="grid gap-4">
          <label className="flex items-center gap-3 text-sm text-fg">
            <input
              type="checkbox"
              checked={draft.teaser.enabled}
              onChange={(e) => setTeaserField("enabled", e.target.checked)}
              className="size-4 rounded border-border accent-brand"
            />
            Teaser-Bubble aktivieren
          </label>
          <div className="grid gap-4 lg:grid-cols-[1fr_180px]">
            <Field label="Pop-up-Text">
              <input
                value={draft.teaser.message}
                onChange={(e) => setTeaserField("message", e.target.value)}
                placeholder="Hi, kann ich dir helfen?"
                className={inputCls}
                maxLength={200}
              />
            </Field>
            <Field label="Verzögerung (Sekunden)">
              <input
                type="number"
                min={0}
                max={120}
                value={draft.teaser.delaySeconds}
                onChange={(e) =>
                  setTeaserField(
                    "delaySeconds",
                    parseInt(e.target.value, 10) || 0
                  )
                }
                className={inputCls}
              />
            </Field>
          </div>
          <p className="text-xs text-fg-subtle">
            Erscheint einmal pro Browser-Session über dem geschlossenen Chat-Button.
            User können wegklicken — sehen es dann nicht erneut.
          </p>
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

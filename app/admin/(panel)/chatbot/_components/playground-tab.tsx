"use client";

import * as React from "react";
import { Bot, Loader2, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "assistant"; content: string };

export function PlaygroundTab({ configured }: { configured: boolean }) {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [usage, setUsage] = React.useState({ in: 0, out: 0 });
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setError(null);
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/chatbot/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: messages, message: text }),
      });
      const data = (await res.json()) as
        | { reply: string; inputTokens: number; outputTokens: number }
        | { error: string };
      if ("error" in data) {
        setError(data.error);
        return;
      }
      setMessages([...next, { role: "assistant", content: data.reply }]);
      setUsage((u) => ({
        in: u.in + (data.inputTokens ?? 0),
        out: u.out + (data.outputTokens ?? 0),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([]);
    setUsage({ in: 0, out: 0 });
    setError(null);
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-dashed border-warning/30 bg-warning/5 p-10 text-center text-sm text-warning">
        Bitte zuerst im Tab „Konfiguration" einen Anthropic API-Key hinterlegen.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Bot className="size-5 text-brand" />
            <span className="font-display text-sm font-semibold text-fg">
              Live-Test
            </span>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg"
          >
            <RotateCcw className="size-3.5" /> Neu starten
          </button>
        </div>

        <div className="mt-4 max-h-[60vh] min-h-[300px] space-y-3 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <p className="text-center text-sm text-fg-subtle">
              Schreib eine Nachricht, um den Bot live zu testen — die aktuelle
              Konfiguration und Wissensbasis werden verwendet.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
                  m.role === "assistant"
                    ? "rounded-tl-sm border border-border bg-white/[0.04] text-fg"
                    : "rounded-tr-sm bg-fg text-bg"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex">
              <div className="rounded-2xl rounded-tl-sm border border-border bg-white/[0.04] px-3 py-2">
                <Loader2 className="size-4 animate-spin text-fg-muted" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Frage stellen …"
            className="flex-1 rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <Button type="submit" variant="brand" size="md" disabled={busy || !input.trim()}>
            {busy ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
      </div>

      <aside className="space-y-3">
        <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            Token-Verbrauch
          </div>
          <dl className="mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-fg-muted">Input</dt>
              <dd className="font-mono text-fg">{usage.in.toLocaleString("de-DE")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-fg-muted">Output</dt>
              <dd className="font-mono text-fg">{usage.out.toLocaleString("de-DE")}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] text-fg-subtle">
            Playground-Konversationen werden nicht in den Konversationen-Tab
            geschrieben. Lead-Capture ist aktiv und legt — falls ausgelöst —
            echte Leads im CRM an.
          </p>
        </div>
      </aside>
    </div>
  );
}

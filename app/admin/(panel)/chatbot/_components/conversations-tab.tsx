"use client";

import * as React from "react";
import { Trash2, UserCheck } from "lucide-react";
import { ChatConversation } from "@/lib/chatbot/types";

export function ConversationsTab({ initial }: { initial: ChatConversation[] }) {
  const [items, setItems] = React.useState(initial);
  const [selected, setSelected] = React.useState<ChatConversation | null>(
    initial[0] ?? null
  );

  async function refresh() {
    const res = await fetch("/api/admin/chatbot/conversations", {
      cache: "no-store",
    });
    if (res.ok) {
      const next = (await res.json()) as ChatConversation[];
      setItems(next);
      if (selected) {
        setSelected(next.find((c) => c.id === selected.id) ?? null);
      }
    }
  }

  async function remove(id: string) {
    if (!confirm("Konversation wirklich löschen?")) return;
    const res = await fetch(`/api/admin/chatbot/conversations/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      if (selected?.id === id) setSelected(null);
      await refresh();
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-semibold text-fg">
            {items.length} Konversationen
          </h3>
          <button
            onClick={refresh}
            className="text-xs text-fg-muted hover:text-fg"
          >
            Aktualisieren
          </button>
        </div>
        {items.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-white/[0.01] p-6 text-center text-xs text-fg-muted">
            Noch keine Konversationen.
          </div>
        )}
        <div className="space-y-1.5">
          {items.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                selected?.id === c.id
                  ? "border-brand/40 bg-brand/5"
                  : "border-border bg-white/[0.02] hover:border-border-strong"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="truncate text-xs font-mono text-fg-subtle">
                  {c.sessionId.slice(0, 12)}…
                </span>
                {c.leadCaptured && (
                  <UserCheck className="size-3 text-success" />
                )}
              </div>
              <div className="mt-0.5 truncate text-sm text-fg">
                {c.messages[c.messages.length - 1]?.content?.slice(0, 60) ??
                  "—"}
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-fg-subtle">
                <span>{c.messages.length} Nachrichten</span>
                <span>
                  {new Date(c.lastMessageAt).toLocaleString("de-DE")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        {selected ? (
          <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <div className="font-mono text-xs text-fg-subtle">
                  {selected.sessionId}
                </div>
                <div className="mt-1 text-xs text-fg-muted">
                  Start: {new Date(selected.startedAt).toLocaleString("de-DE")}
                  {" · "}Tokens in/out: {selected.totalInputTokens}/
                  {selected.totalOutputTokens}
                </div>
                {selected.leadCaptured && (
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] text-success">
                    <UserCheck className="size-3" />
                    Lead: {selected.leadCaptured.email}
                  </div>
                )}
              </div>
              <button
                onClick={() => remove(selected.id)}
                className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-fg-muted hover:border-danger/40 hover:text-danger"
              >
                <Trash2 className="size-3.5" /> Löschen
              </button>
            </div>
            <div className="space-y-3">
              {selected.messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : ""}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                      m.role === "assistant"
                        ? "rounded-tl-sm border border-border bg-white/[0.04] text-fg"
                        : "rounded-tr-sm bg-fg text-bg"
                    }`}
                  >
                    {m.content}
                    <div
                      className={`mt-1 text-[10px] ${
                        m.role === "assistant" ? "text-fg-subtle" : "text-bg/60"
                      }`}
                    >
                      {new Date(m.ts).toLocaleString("de-DE")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-white/[0.01] p-10 text-center text-sm text-fg-muted">
            Wähle links eine Konversation.
          </div>
        )}
      </div>
    </div>
  );
}

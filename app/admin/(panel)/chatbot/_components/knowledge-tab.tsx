"use client";

import * as React from "react";
import {
  Loader2,
  Plus,
  RefreshCcw,
  Trash2,
  Globe,
  MessageSquare,
  FileText,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { KnowledgeSource } from "@/lib/chatbot/types";

const inputCls =
  "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20 transition";

export function KnowledgeTab({ initial }: { initial: KnowledgeSource[] }) {
  const [sources, setSources] = React.useState(initial);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/chatbot/sources", { cache: "no-store" });
    if (res.ok) setSources(await res.json());
  }

  async function addUrl(url: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/chatbot/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "url", url }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? `HTTP ${res.status}`);
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  async function addQA(question: string, answer: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/chatbot/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "qa", question, answer }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? `HTTP ${res.status}`);
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  async function addText(title: string, text: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/chatbot/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "text", title, text }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? `HTTP ${res.status}`);
      }
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  async function reindex(id: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/chatbot/sources/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Quelle wirklich löschen? Alle Chunks werden entfernt.")) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/chatbot/sources/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-3">
        {sources.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-white/[0.01] p-10 text-center">
            <p className="text-sm text-fg-muted">
              Noch keine Quellen — füge rechts URLs, Q&amp;A oder Freitext hinzu.
            </p>
          </div>
        )}
        {sources.map((s) => (
          <SourceRow
            key={s.id}
            source={s}
            onReindex={() => reindex(s.id)}
            onRemove={() => remove(s.id)}
            disabled={busy}
          />
        ))}
      </div>

      <aside className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}
        <AddUrlForm onSubmit={addUrl} busy={busy} />
        <AddQAForm onSubmit={addQA} busy={busy} />
        <AddTextForm onSubmit={addText} busy={busy} />
      </aside>
    </div>
  );
}

function SourceRow({
  source,
  onReindex,
  onRemove,
  disabled,
}: {
  source: KnowledgeSource;
  onReindex: () => void;
  onRemove: () => void;
  disabled: boolean;
}) {
  const Icon =
    source.type === "url" ? Globe : source.type === "qa" ? MessageSquare : FileText;
  return (
    <div className="rounded-xl border border-border bg-white/[0.02] p-4">
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-4 shrink-0 text-fg-muted" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-fg">
              {source.title}
            </h3>
            <StatusBadge status={source.status} />
          </div>
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 block truncate text-xs text-fg-subtle hover:text-fg-muted"
            >
              {source.url}
            </a>
          )}
          {source.error && (
            <p className="mt-1.5 text-xs text-danger">{source.error}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-fg-subtle">
            <span>{source.chunkCount} Chunks</span>
            <span>{source.charCount.toLocaleString("de-DE")} Zeichen</span>
            {source.lastIndexedAt && (
              <span>
                Indexiert:{" "}
                {new Date(source.lastIndexedAt).toLocaleString("de-DE")}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {(source.type === "url" || source.type === "text") && (
            <button
              onClick={onReindex}
              disabled={disabled}
              title="Re-Index"
              className="rounded-md p-1.5 text-fg-muted hover:bg-white/[0.04] hover:text-fg disabled:opacity-50"
            >
              <RefreshCcw className="size-4" />
            </button>
          )}
          <button
            onClick={onRemove}
            disabled={disabled}
            title="Löschen"
            className="rounded-md p-1.5 text-fg-muted hover:bg-danger/15 hover:text-danger disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: KnowledgeSource["status"] }) {
  const map: Record<
    KnowledgeSource["status"],
    { color: string; label: string; icon: React.ReactNode }
  > = {
    ready: {
      color: "border-success/30 bg-success/10 text-success",
      label: "ready",
      icon: <CheckCircle2 className="size-3" />,
    },
    indexing: {
      color: "border-warning/30 bg-warning/10 text-warning",
      label: "indexiert …",
      icon: <Loader2 className="size-3 animate-spin" />,
    },
    pending: {
      color: "border-border bg-white/[0.04] text-fg-muted",
      label: "pending",
      icon: null,
    },
    error: {
      color: "border-danger/30 bg-danger/10 text-danger",
      label: "Fehler",
      icon: <AlertTriangle className="size-3" />,
    },
  };
  const x = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${x.color}`}
    >
      {x.icon}
      {x.label}
    </span>
  );
}

function AddUrlForm({
  onSubmit,
  busy,
}: {
  onSubmit: (url: string) => void;
  busy: boolean;
}) {
  const [url, setUrl] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!url.trim()) return;
        onSubmit(url.trim());
        setUrl("");
      }}
      className="rounded-2xl border border-border bg-white/[0.02] p-4"
    >
      <h3 className="font-display mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
        <Globe className="size-4" /> URL crawlen
      </h3>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
        placeholder="https://fwstudios.de"
        className={inputCls}
      />
      <p className="mt-2 text-xs text-fg-subtle">
        Lädt die Seite, extrahiert Text und teilt ihn in Chunks.
      </p>
      <Button
        type="submit"
        variant="brand"
        size="sm"
        className="mt-3 w-full"
        disabled={busy || !url.trim()}
      >
        {busy ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Crawle …
          </>
        ) : (
          <>
            <Plus className="size-4" /> Hinzufügen
          </>
        )}
      </Button>
    </form>
  );
}

function AddQAForm({
  onSubmit,
  busy,
}: {
  onSubmit: (q: string, a: string) => void;
  busy: boolean;
}) {
  const [q, setQ] = React.useState("");
  const [a, setA] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim() || !a.trim()) return;
        onSubmit(q.trim(), a.trim());
        setQ("");
        setA("");
      }}
      className="rounded-2xl border border-border bg-white/[0.02] p-4"
    >
      <h3 className="font-display mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
        <MessageSquare className="size-4" /> Q&amp;A-Paar
      </h3>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Frage"
        className={inputCls}
      />
      <textarea
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="Antwort"
        rows={3}
        className={`${inputCls} mt-2`}
      />
      <Button
        type="submit"
        variant="brand"
        size="sm"
        className="mt-3 w-full"
        disabled={busy || !q.trim() || !a.trim()}
      >
        <Plus className="size-4" /> Hinzufügen
      </Button>
    </form>
  );
}

function AddTextForm({
  onSubmit,
  busy,
}: {
  onSubmit: (title: string, text: string) => void;
  busy: boolean;
}) {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!title.trim() || !text.trim()) return;
        onSubmit(title.trim(), text.trim());
        setTitle("");
        setText("");
      }}
      className="rounded-2xl border border-border bg-white/[0.02] p-4"
    >
      <h3 className="font-display mb-3 flex items-center gap-2 text-sm font-semibold text-fg">
        <FileText className="size-4" /> Freitext
      </h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titel (z.B. Ablauf-Beschreibung)"
        className={inputCls}
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Inhalt — beliebig lang, wird in Chunks zerlegt."
        rows={5}
        className={`${inputCls} mt-2`}
      />
      <Button
        type="submit"
        variant="brand"
        size="sm"
        className="mt-3 w-full"
        disabled={busy || !title.trim() || !text.trim()}
      >
        <Plus className="size-4" /> Hinzufügen
      </Button>
    </form>
  );
}

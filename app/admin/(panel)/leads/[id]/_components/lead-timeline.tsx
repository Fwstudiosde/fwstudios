"use client";

import * as React from "react";
import type { LeadActivity } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Trash2, Mail, Phone, MessageCircle, FileText } from "lucide-react";

const KIND_ICON = {
  note: MessageCircle,
  email_sent: Mail,
  call: Phone,
  meeting: FileText,
  status_change: FileText,
} as const;

const KIND_LABEL: Record<LeadActivity["kind"], string> = {
  note: "Notiz",
  email_sent: "E-Mail",
  call: "Anruf",
  meeting: "Termin",
  status_change: "Status",
};

export function LeadTimeline({
  leadId,
  initial,
}: {
  leadId: string;
  initial: LeadActivity[];
}) {
  const [items, setItems] = React.useState(initial);
  const [text, setText] = React.useState("");
  const [kind, setKind] = React.useState<LeadActivity["kind"]>("note");
  const [saving, setSaving] = React.useState(false);

  async function add() {
    if (!text.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/leads/${leadId}/activities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, kind }),
    });
    if (res.ok) {
      const { activity } = await res.json();
      setItems((p) => [activity, ...p]);
      setText("");
    }
    setSaving(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-white/[0.02] p-5">
      <div className="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as LeadActivity["kind"])}
          className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-brand/40 focus:outline-none"
        >
          <option value="note">Notiz</option>
          <option value="call">Anruf</option>
          <option value="email_sent">E-Mail</option>
          <option value="meeting">Termin</option>
        </select>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
          placeholder={
            kind === "note"
              ? "Notiz hinzufügen …"
              : kind === "call"
                ? "Was wurde besprochen?"
                : kind === "email_sent"
                  ? "Betreff der versendeten E-Mail"
                  : "Termin-Notiz"
          }
          className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-faint focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        <Button onClick={add} variant="brand" size="md" disabled={saving}>
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          Hinzufügen
        </Button>
      </div>

      <ul className="mt-6 space-y-3">
        {items.length === 0 && (
          <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-fg-muted">
            Noch keine Einträge.
          </li>
        )}
        {items.map((a) => {
          const Icon = KIND_ICON[a.kind] ?? MessageCircle;
          return (
            <li
              key={a.id}
              className="group flex items-start gap-3 rounded-xl border border-border bg-bg/40 p-4"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.04] text-brand">
                <Icon className="size-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                    {KIND_LABEL[a.kind]}
                  </span>
                  <span className="text-[11px] text-fg-subtle">
                    {new Date(a.createdAt).toLocaleString("de-DE")}
                  </span>
                </div>
                <p className="mt-1 whitespace-pre-line text-sm text-fg">
                  {a.message}
                </p>
              </div>
              <button
                onClick={() => remove(a.id)}
                className="rounded-md p-1.5 text-fg-muted opacity-0 transition-opacity hover:bg-danger/10 hover:text-danger group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  async function remove(id: string) {
    setItems((p) => p.filter((x) => x.id !== id));
    await fetch(`/api/activities/${id}`, { method: "DELETE" });
  }
}

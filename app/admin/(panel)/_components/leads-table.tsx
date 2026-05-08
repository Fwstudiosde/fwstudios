"use client";

import * as React from "react";
import Link from "next/link";
import type { Lead } from "@/lib/storage";
import { Trash2, Mail, Phone, ExternalLink, ArrowRight } from "lucide-react";

const STATUS_OPTIONS: Lead["status"][] = [
  "neu",
  "kontaktiert",
  "qualifiziert",
  "gewonnen",
  "verloren",
];

const STATUS_TONE: Record<Lead["status"], string> = {
  neu: "bg-brand/15 text-brand border-brand/30",
  kontaktiert: "bg-white/[0.06] text-fg border-border",
  qualifiziert: "bg-warning/15 text-warning border-warning/30",
  gewonnen: "bg-success/15 text-success border-success/30",
  verloren: "bg-danger/15 text-danger border-danger/30",
};

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = React.useState(initialLeads);

  async function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Lead wirklich löschen?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-fg-muted">
        Noch keine Leads.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-white/[0.02] text-left text-xs uppercase tracking-wider text-fg-subtle">
              <th className="px-4 py-3 font-medium">Name / Quelle</th>
              <th className="px-4 py-3 font-medium">Kontakt</th>
              <th className="px-4 py-3 font-medium">Eingegangen</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-3 align-top">
                  <div className="font-medium text-fg">
                    {l.name || l.company || l.website || "—"}
                  </div>
                  <div className="text-xs text-fg-subtle">
                    aus {l.source}
                  </div>
                  {l.message && (
                    <div className="mt-1 line-clamp-2 max-w-sm text-xs text-fg-muted">
                      {l.message}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 align-top">
                  <div className="space-y-1 text-xs">
                    {l.email && (
                      <a
                        href={`mailto:${l.email}`}
                        className="flex items-center gap-1.5 text-fg-muted hover:text-brand"
                      >
                        <Mail className="size-3" /> {l.email}
                      </a>
                    )}
                    {l.phone && (
                      <a
                        href={`tel:${l.phone}`}
                        className="flex items-center gap-1.5 text-fg-muted hover:text-brand"
                      >
                        <Phone className="size-3" /> {l.phone}
                      </a>
                    )}
                    {l.website && (
                      <a
                        href={
                          l.website.startsWith("http")
                            ? l.website
                            : `https://${l.website}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-fg-muted hover:text-brand"
                      >
                        <ExternalLink className="size-3" /> {l.website}
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 align-top text-xs text-fg-muted">
                  {new Date(l.createdAt).toLocaleString("de-DE", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-3 align-top">
                  <select
                    value={l.status}
                    onChange={(e) =>
                      updateStatus(l.id, e.target.value as Lead["status"])
                    }
                    className={`rounded-md border bg-bg px-2 py-1 text-xs font-medium ${STATUS_TONE[l.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-bg text-fg">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 align-top text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/leads/${l.id}`}
                      className="rounded-md p-1.5 text-fg-muted hover:bg-white/[0.04] hover:text-fg transition-colors"
                      aria-label="Details"
                    >
                      <ArrowRight className="size-4" />
                    </Link>
                    <button
                      onClick={() => remove(l.id)}
                      className="rounded-md p-1.5 text-fg-muted hover:bg-danger/10 hover:text-danger transition-colors"
                      aria-label="Löschen"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

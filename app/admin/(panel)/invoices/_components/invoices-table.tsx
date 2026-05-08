"use client";

import * as React from "react";
import type { Customer, Invoice } from "@/lib/storage";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_TONE: Record<Invoice["status"], string> = {
  draft: "bg-white/[0.06] text-fg-muted border-border",
  sent: "bg-brand/15 text-brand border-brand/30",
  paid: "bg-success/15 text-success border-success/30",
  overdue: "bg-danger/15 text-danger border-danger/30",
  cancelled: "bg-fg-faint/10 text-fg-faint border-border",
};

function totalOf(inv: Invoice): number {
  const sub = inv.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  return sub * (1 + inv.vat / 100);
}

export function InvoicesTable({
  initial,
  customers,
}: {
  initial: Invoice[];
  customers: Customer[];
}) {
  const [items, setItems] = React.useState(initial);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  async function setStatus(id: string, status: Invoice["status"]) {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status } : i)));
    await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Rechnung wirklich löschen?")) return;
    setItems((p) => p.filter((x) => x.id !== id));
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
  }

  async function create(payload: Omit<Invoice, "id" | "createdAt" | "number">) {
    setSaving(true);
    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const { invoice } = await res.json();
      setItems((p) => [invoice, ...p]);
      setOpen(false);
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setOpen(true)} variant="brand" size="sm">
          <Plus className="size-4" /> Neue Rechnung
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-fg-muted">
          Noch keine Rechnungen.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-white/[0.02] text-left text-xs uppercase tracking-wider text-fg-subtle">
                  <th className="px-4 py-3 font-medium">Nummer</th>
                  <th className="px-4 py-3 font-medium">Kunde</th>
                  <th className="px-4 py-3 font-medium">Erstellt</th>
                  <th className="px-4 py-3 font-medium text-right">Brutto</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((i) => (
                  <tr key={i.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-mono text-xs text-fg">
                      {i.number}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-fg">{i.customerName}</div>
                      <div className="text-xs text-fg-subtle">
                        {i.customerEmail}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-fg-muted">
                      {new Date(i.createdAt).toLocaleDateString("de-DE")}
                    </td>
                    <td className="px-4 py-3 text-right font-display tabular-nums text-fg">
                      {Math.round(totalOf(i)).toLocaleString("de-DE")} €
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={i.status}
                        onChange={(e) =>
                          setStatus(i.id, e.target.value as Invoice["status"])
                        }
                        className={`rounded-md border bg-bg px-2 py-1 text-xs font-medium ${STATUS_TONE[i.status]}`}
                      >
                        <option value="draft">draft</option>
                        <option value="sent">sent</option>
                        <option value="paid">paid</option>
                        <option value="overdue">overdue</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(i.id)}
                        className="rounded-md p-1.5 text-fg-muted hover:bg-danger/10 hover:text-danger transition-colors"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open && (
        <NewInvoiceDialog
          customers={customers}
          onClose={() => setOpen(false)}
          onSubmit={create}
          saving={saving}
        />
      )}
    </div>
  );
}

function NewInvoiceDialog({
  customers,
  onClose,
  onSubmit,
  saving,
}: {
  customers: Customer[];
  onClose: () => void;
  onSubmit: (p: Omit<Invoice, "id" | "createdAt" | "number">) => void;
  saving: boolean;
}) {
  const [items, setItems] = React.useState([
    { description: "Chatbot-Setup", quantity: 1, unitPrice: 499 },
  ]);
  const [customerId, setCustomerId] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function onCustomer(id: string) {
    setCustomerId(id);
    const c = customers.find((x) => x.id === id);
    if (c) {
      setName(c.name);
      setEmail(c.email);
    }
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      customerId: customerId || undefined,
      customerName: name,
      customerEmail: email,
      items,
      vat: 19,
      status: "draft",
    });
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-fg">
            Neue Rechnung
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-fg-muted hover:bg-white/[0.04] hover:text-fg"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="block sm:col-span-3">
            <span className="mb-1 block text-xs font-medium text-fg-muted">
              Bestehender Kunde
            </span>
            <select
              value={customerId}
              onChange={(e) => onCustomer(e.target.value)}
              className={inputCls}
            >
              <option value="">— Manuell eingeben —</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} · {c.email}
                </option>
              ))}
            </select>
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium text-fg-muted">
              Kunden-Name *
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-fg-muted">
              Email *
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputCls}
            />
          </label>
        </div>

        <div className="mt-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            Positionen
          </div>
          <div className="space-y-2">
            {items.map((it, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_70px_100px_auto] gap-2"
              >
                <input
                  value={it.description}
                  onChange={(e) =>
                    setItems((p) => {
                      const next = [...p];
                      next[i].description = e.target.value;
                      return next;
                    })
                  }
                  placeholder="Beschreibung"
                  className={inputCls}
                />
                <input
                  type="number"
                  min={1}
                  value={it.quantity}
                  onChange={(e) =>
                    setItems((p) => {
                      const next = [...p];
                      next[i].quantity = Number(e.target.value);
                      return next;
                    })
                  }
                  className={inputCls}
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={it.unitPrice}
                  onChange={(e) =>
                    setItems((p) => {
                      const next = [...p];
                      next[i].unitPrice = Number(e.target.value);
                      return next;
                    })
                  }
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setItems((p) => p.filter((_, j) => j !== i))}
                  className="rounded-md p-2 text-fg-muted hover:bg-danger/10 hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              setItems((p) => [...p, { description: "", quantity: 1, unitPrice: 0 }])
            }
            className="mt-3 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-fg-muted hover:border-brand/40 hover:text-brand"
          >
            + Position
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5">
          <div className="text-sm text-fg-muted">
            Brutto:{" "}
            <span className="font-display font-semibold text-fg">
              {Math.round(
                items.reduce((s, i) => s + i.quantity * i.unitPrice, 0) * 1.19
              ).toLocaleString("de-DE")}{" "}
              €
            </span>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Abbrechen
            </Button>
            <Button type="submit" variant="brand" disabled={saving}>
              {saving ? "Speichern …" : "Rechnung erstellen"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

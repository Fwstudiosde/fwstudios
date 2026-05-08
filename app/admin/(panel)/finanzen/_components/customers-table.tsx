"use client";

import * as React from "react";
import type { Customer } from "@/lib/storage";
import { Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_TONE: Record<Customer["status"], string> = {
  active: "bg-success/15 text-success border-success/30",
  paused: "bg-warning/15 text-warning border-warning/30",
  cancelled: "bg-danger/15 text-danger border-danger/30",
};

export function CustomersTable({
  initialCustomers,
}: {
  initialCustomers: Customer[];
}) {
  const [customers, setCustomers] = React.useState(initialCustomers);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  async function add(payload: Omit<Customer, "id" | "createdAt">) {
    setSaving(true);
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const { customer } = await res.json();
      setCustomers((p) => [customer, ...p]);
      setOpen(false);
    }
    setSaving(false);
  }

  async function remove(id: string) {
    if (!confirm("Kunde wirklich löschen?")) return;
    setCustomers((p) => p.filter((c) => c.id !== id));
    await fetch(`/api/customers/${id}`, { method: "DELETE" });
  }

  async function setStatus(id: string, status: Customer["status"]) {
    setCustomers((p) =>
      p.map((c) => (c.id === id ? { ...c, status } : c))
    );
    await fetch(`/api/customers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant="brand" size="sm" onClick={() => setOpen(true)}>
          <Plus className="size-4" /> Kunde hinzufügen
        </Button>
      </div>

      {customers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-fg-muted">
          Noch keine Kunden.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-white/[0.02] text-left text-xs uppercase tracking-wider text-fg-subtle">
                  <th className="px-4 py-3 font-medium">Kunde</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium text-right">MRR</th>
                  <th className="px-4 py-3 font-medium text-right">Setup</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <div className="font-medium text-fg">{c.name}</div>
                      <div className="text-xs text-fg-subtle">
                        {c.company ?? c.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded border border-border bg-white/[0.04] px-2 py-0.5 text-xs text-fg-muted">
                        {c.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-display tabular-nums text-fg">
                      {c.monthlyRevenue.toLocaleString("de-DE")} €
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-fg-muted">
                      {c.setupFee
                        ? `${c.setupFee.toLocaleString("de-DE")} €`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          setStatus(c.id, e.target.value as Customer["status"])
                        }
                        className={`rounded-md border bg-bg px-2 py-1 text-xs font-medium ${STATUS_TONE[c.status]}`}
                      >
                        <option value="active">active</option>
                        <option value="paused">paused</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => remove(c.id)}
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

      {open && <AddDialog onClose={() => setOpen(false)} onSubmit={add} saving={saving} />}
    </div>
  );
}

function AddDialog({
  onClose,
  onSubmit,
  saving,
}: {
  onClose: () => void;
  onSubmit: (payload: Omit<Customer, "id" | "createdAt">) => void;
  saving: boolean;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit({
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? "") || undefined,
      plan: (fd.get("plan") as Customer["plan"]) ?? "monthly",
      monthlyRevenue: Number(fd.get("monthlyRevenue") ?? 0),
      setupFee: Number(fd.get("setupFee") ?? 0) || undefined,
      startDate: String(fd.get("startDate") ?? "") || undefined,
      status: "active",
      notes: String(fd.get("notes") ?? "") || undefined,
    });
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-fg">
            Neuer Kunde
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-fg-muted hover:bg-white/[0.04] hover:text-fg"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Field label="Name" required>
            <input name="name" required className={inputCls} />
          </Field>
          <Field label="E-Mail" required>
            <input
              name="email"
              type="email"
              required
              className={inputCls}
            />
          </Field>
          <Field label="Unternehmen">
            <input name="company" className={inputCls} />
          </Field>
          <Field label="Plan">
            <select name="plan" defaultValue="monthly" className={inputCls}>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
              <option value="custom">custom</option>
            </select>
          </Field>
          <Field label="MRR (€)">
            <input
              name="monthlyRevenue"
              type="number"
              min={0}
              defaultValue={299}
              className={inputCls}
            />
          </Field>
          <Field label="Setup (€)">
            <input
              name="setupFee"
              type="number"
              min={0}
              defaultValue={499}
              className={inputCls}
            />
          </Field>
          <Field label="Start-Datum">
            <input name="startDate" type="date" className={inputCls} />
          </Field>
          <div className="col-span-2">
            <Field label="Notizen">
              <textarea name="notes" rows={2} className={inputCls} />
            </Field>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Abbrechen
          </Button>
          <Button type="submit" variant="brand" disabled={saving}>
            {saving ? "Speichern …" : "Kunde anlegen"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-fg-muted">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>
      {children}
    </label>
  );
}

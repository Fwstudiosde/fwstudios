"use client";

import * as React from "react";
import type { Settings } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

export function SettingsEditor({ initial }: { initial: Settings }) {
  const [data, setData] = React.useState<Settings>(initial);
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  const inputCls =
    "w-full rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <div className="space-y-6">
      <Section title="Chatbot · Monatlich">
        <Row>
          <Field label="Preis (€/Monat)">
            <input
              type="number"
              min={0}
              value={data.chatbot.monthly.price}
              onChange={(e) =>
                setData({
                  ...data,
                  chatbot: {
                    ...data.chatbot,
                    monthly: {
                      ...data.chatbot.monthly,
                      price: Number(e.target.value),
                    },
                  },
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Setup-Gebühr (€)">
            <input
              type="number"
              min={0}
              value={data.chatbot.monthly.setupFee}
              onChange={(e) =>
                setData({
                  ...data,
                  chatbot: {
                    ...data.chatbot,
                    monthly: {
                      ...data.chatbot.monthly,
                      setupFee: Number(e.target.value),
                    },
                  },
                })
              }
              className={inputCls}
            />
          </Field>
        </Row>
        <FeatureList
          features={data.chatbot.monthly.features}
          onChange={(features) =>
            setData({
              ...data,
              chatbot: {
                ...data.chatbot,
                monthly: { ...data.chatbot.monthly, features },
              },
            })
          }
        />
      </Section>

      <Section title="Chatbot · Jährlich">
        <Row>
          <Field label="Preis (€/Monat)">
            <input
              type="number"
              min={0}
              value={data.chatbot.yearly.price}
              onChange={(e) =>
                setData({
                  ...data,
                  chatbot: {
                    ...data.chatbot,
                    yearly: {
                      ...data.chatbot.yearly,
                      price: Number(e.target.value),
                    },
                  },
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Jahres-Total (€)">
            <input
              type="number"
              min={0}
              value={data.chatbot.yearly.totalYearly}
              onChange={(e) =>
                setData({
                  ...data,
                  chatbot: {
                    ...data.chatbot,
                    yearly: {
                      ...data.chatbot.yearly,
                      totalYearly: Number(e.target.value),
                    },
                  },
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Ersparnis (€)">
            <input
              type="number"
              min={0}
              value={data.chatbot.yearly.savings}
              onChange={(e) =>
                setData({
                  ...data,
                  chatbot: {
                    ...data.chatbot,
                    yearly: {
                      ...data.chatbot.yearly,
                      savings: Number(e.target.value),
                    },
                  },
                })
              }
              className={inputCls}
            />
          </Field>
        </Row>
        <FeatureList
          features={data.chatbot.yearly.features}
          onChange={(features) =>
            setData({
              ...data,
              chatbot: {
                ...data.chatbot,
                yearly: { ...data.chatbot.yearly, features },
              },
            })
          }
        />
      </Section>

      <Section title="Sale-Banner">
        <Row>
          <Field label="Aktiv">
            <label className="inline-flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                checked={data.sale.active}
                onChange={(e) =>
                  setData({
                    ...data,
                    sale: { ...data.sale, active: e.target.checked },
                  })
                }
                className="size-4 accent-brand"
              />
              <span className="text-sm text-fg-muted">
                Banner auf der Website anzeigen
              </span>
            </label>
          </Field>
          <Field label="Banner-Text">
            <input
              value={data.sale.bannerText}
              onChange={(e) =>
                setData({
                  ...data,
                  sale: { ...data.sale, bannerText: e.target.value },
                })
              }
              className={inputCls}
            />
          </Field>
          <Field label="Rabatt (%)">
            <input
              type="number"
              min={0}
              max={100}
              value={data.sale.discount}
              onChange={(e) =>
                setData({
                  ...data,
                  sale: { ...data.sale, discount: Number(e.target.value) },
                })
              }
              className={inputCls}
            />
          </Field>
        </Row>
      </Section>

      <div className="sticky bottom-4 flex items-center justify-end gap-3 rounded-xl border border-border bg-surface/80 p-4 backdrop-blur-xl">
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
            "Änderungen speichern"
          )}
        </Button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
      <h3 className="font-display mb-4 text-lg font-semibold text-fg">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-3">{children}</div>;
}

function Field({
  label,
  children,
}: {
  label: string;
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

function FeatureList({
  features,
  onChange,
}: {
  features: string[];
  onChange: (features: string[]) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium text-fg-muted">Features</div>
      <div className="space-y-2">
        {features.map((f, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={f}
              onChange={(e) => {
                const next = [...features];
                next[i] = e.target.value;
                onChange(next);
              }}
              className="flex-1 rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-fg focus:border-brand/50 focus:outline-none"
            />
            <button
              onClick={() => onChange(features.filter((_, j) => j !== i))}
              className="rounded-md px-2 text-xs text-fg-muted hover:bg-danger/10 hover:text-danger"
            >
              entfernen
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => onChange([...features, ""])}
        className="mt-2 rounded-md border border-dashed border-border px-3 py-1.5 text-xs text-fg-muted hover:border-brand/40 hover:text-brand"
      >
        + Feature hinzufügen
      </button>
    </div>
  );
}

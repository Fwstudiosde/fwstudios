"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

export function ContactForm() {
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      source: "website",
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      setState("done");
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="size-6" />
        </div>
        <h3 className="font-display mt-4 text-xl font-semibold text-fg">
          Anfrage erhalten.
        </h3>
        <p className="mt-2 text-sm text-fg-muted">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-bg/40 p-6 backdrop-blur sm:p-7"
    >
      <h3 className="font-display text-lg font-semibold text-fg">
        Kostenlose Erstberatung
      </h3>
      <p className="mt-1 text-sm text-fg-muted">
        Antwort innerhalb von 24 Stunden.
      </p>

      <div className="mt-5 grid gap-3">
        <Field name="name" label="Name" required />
        <Field name="email" type="email" label="E-Mail" required />
        <Field name="company" label="Unternehmen" />
        <Field name="message" label="Worum geht es?" textarea />
      </div>

      {error && (
        <p className="mt-3 text-xs text-danger">{error}</p>
      )}

      <Button
        type="submit"
        variant="brand"
        size="lg"
        disabled={state === "loading"}
        className="mt-5 w-full"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Wird gesendet …
          </>
        ) : (
          "Anfrage senden"
        )}
      </Button>
      <p className="mt-3 text-center text-[11px] text-fg-subtle">
        Mit dem Absenden akzeptieren Sie unsere{" "}
        <a href="/datenschutz" className="underline hover:text-fg">
          Datenschutzerklärung
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseInput =
    "w-full rounded-lg border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-faint focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20 transition";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-fg-muted">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          className={baseInput}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className={baseInput}
        />
      )}
    </label>
  );
}

"use client";

import * as React from "react";
import Script from "next/script";
import { Mail, Phone } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const CAL_ORIGIN =
  process.env.NEXT_PUBLIC_CAL_ORIGIN ?? "https://app.cal.eu";
const CAL_EMBED_URL = `${CAL_ORIGIN}/embed/embed.js`;

const CONTACT_EMAIL = "finn@fwstudios.de";
const CONTACT_PHONE_DISPLAY = "0162 7793119";
const CONTACT_PHONE_TEL = "+4901627793119";

export function EmbeddedBooking({
  calLink,
  topic,
  spotsLeft,
  spotsTotal,
  pilotLabel,
  discountPercent,
  takeaways,
  eyebrowOverride,
}: {
  calLink: string;
  topic: string;
  spotsLeft: number;
  spotsTotal: number;
  pilotLabel: string;
  discountPercent: number;
  takeaways?: string[];
  eyebrowOverride?: string;
}) {
  const ns = React.useMemo(
    () =>
      `pilot-${calLink.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`.slice(0, 48),
    [calLink]
  );
  const containerId = React.useMemo(() => `cal-inline-${ns}`, [ns]);
  const allTaken = spotsLeft <= 0;

  React.useEffect(() => {
    type CalFn = (...args: unknown[]) => void;
    const w = window as unknown as {
      Cal?: CalFn & {
        loaded?: boolean;
        ns?: Record<string, CalFn | undefined>;
      };
    };
    if (typeof window === "undefined" || !w.Cal) return;
    w.Cal("init", ns, { origin: CAL_ORIGIN });
    w.Cal.ns?.[ns]?.("inline", {
      elementOrSelector: `#${containerId}`,
      config: {
        layout: "month_view",
        theme: "dark",
        name: "",
        email: "",
        notes: topic,
      },
      calLink,
    });
    w.Cal.ns?.[ns]?.("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        dark: { "cal-brand": "#00d4ff" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, [calLink, ns, containerId, topic]);

  return (
    <Section id="termin" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrowOverride ?? "Pilot-Platz sichern"}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            <span className="text-gradient">30 Minuten.</span>{" "}
            <span className="text-gradient-brand">Kostenlos. Verbindlich.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Wir prüfen gemeinsam, ob das Founding-Programm für Ihren Use-Case
            passt. Keine Verkaufs-Show.
          </p>
          {!allTaken && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/[0.08] px-4 py-1.5 text-xs font-medium text-fg sm:text-sm">
              <span
                className="size-1.5 animate-pulse rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]"
                aria-hidden
              />
              <span>
                <span className="font-semibold">
                  {spotsLeft} von {spotsTotal} Pilot-Plätzen frei
                </span>{" "}
                · {pilotLabel} · {discountPercent} % Setup-Vorteil
              </span>
            </div>
          )}
        </div>

        {takeaways && takeaways.length > 0 && (
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-white/[0.02] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Was Sie vom Call mitnehmen — auch ohne Zusammenarbeit
            </p>
            <ul className="mt-3 space-y-2">
              {takeaways.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-fg-muted sm:text-[15px]">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-1 sm:mt-12 sm:p-2">
          <div
            id={containerId}
            className="min-h-[560px] sm:min-h-[620px] md:min-h-[650px]"
            style={{ width: "100%", overflow: "hidden" }}
          />
        </div>

        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-center gap-3 text-center sm:mt-8 sm:flex-row sm:gap-8">
          <p className="text-sm text-fg-muted">Lieber direkt schreiben?</p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              `Pilot-Anfrage · ${topic}`
            )}`}
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-fg hover:text-brand transition-colors"
          >
            <Mail className="size-4" />
            <span className="break-all">{CONTACT_EMAIL}</span>
          </a>
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="inline-flex min-h-[40px] items-center gap-2 text-sm font-medium text-fg hover:text-brand transition-colors"
          >
            <Phone className="size-4" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </Container>

      <Script id={`cal-embed-${ns}`} strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_EMBED_URL}", "init");`}
      </Script>
    </Section>
  );
}

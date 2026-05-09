"use client";

import * as React from "react";
import Script from "next/script";
import { Mail, Phone } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "fwstudios/30min";
const CAL_ORIGIN =
  process.env.NEXT_PUBLIC_CAL_ORIGIN ?? "https://app.cal.eu";
const CAL_EMBED_URL = `${CAL_ORIGIN}/embed/embed.js`;
const CAL_NS = CAL_LINK.split("/").pop() || "30min";

const CONTACT_EMAIL = "accounts@fwstudios.de";
const CONTACT_PHONE_DISPLAY = "0162 7793119";
const CONTACT_PHONE_TEL = "+4901627793119";

export function Booking() {
  React.useEffect(() => {
    type CalFn = (...args: unknown[]) => void;
    const w = window as unknown as {
      Cal?: CalFn & {
        loaded?: boolean;
        ns?: Record<string, CalFn | undefined>;
      };
    };
    if (typeof window !== "undefined" && w.Cal) {
      w.Cal("init", CAL_NS, { origin: CAL_ORIGIN });
      w.Cal.ns?.[CAL_NS]?.("inline", {
        elementOrSelector: "#cal-inline",
        config: { layout: "month_view", theme: "dark" },
        calLink: CAL_LINK,
      });
      w.Cal.ns?.[CAL_NS]?.("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#00d4ff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    }
  }, []);

  return (
    <Section id="kontakt" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Direkt buchen</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            30 Minuten.{" "}
            <span className="text-gradient-brand">Kostenlos. Verbindlich.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Direkt einen Termin im Kalender buchen — keine Email-Pingpong.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-1 sm:mt-12 sm:p-2">
          <div
            id="cal-inline"
            className="min-h-[560px] sm:min-h-[620px] md:min-h-[650px]"
            style={{ width: "100%", overflow: "hidden" }}
          />
        </div>
        <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-center gap-3 text-center sm:mt-8 sm:flex-row sm:gap-8">
          <p className="text-sm text-fg-muted">
            Lieber direkt schreiben oder anrufen?
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
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

      <Script id="cal-embed" strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_EMBED_URL}", "init");`}
      </Script>
    </Section>
  );
}

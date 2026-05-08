"use client";

import * as React from "react";
import Script from "next/script";
import { Container, Section, Eyebrow } from "@/components/ui/container";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "fwstudios/30min";

export function Booking() {
  React.useEffect(() => {
    const w = window as unknown as {
      Cal?: ((...args: unknown[]) => void) & { loaded?: boolean };
    };
    if (typeof window !== "undefined" && w.Cal) {
      w.Cal("init", "30min", { origin: "https://app.cal.com" });
      w.Cal.ns?.["30min"]?.("inline", {
        elementOrSelector: "#cal-inline",
        config: { layout: "month_view", theme: "dark" },
        calLink: CAL_LINK,
      });
      w.Cal.ns?.["30min"]?.("ui", {
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
    <Section id="termin" className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Direkt buchen</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            30 Minuten.{" "}
            <span className="text-gradient-brand">Kostenlos. Verbindlich.</span>
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Direkt einen Termin im Kalender buchen — keine Email-Pingpong.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-2">
          <div
            id="cal-inline"
            style={{ width: "100%", minHeight: "650px", overflow: "hidden" }}
          />
        </div>
      </Container>

      <Script id="cal-embed" strategy="afterInteractive">
        {`(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");`}
      </Script>
    </Section>
  );
}

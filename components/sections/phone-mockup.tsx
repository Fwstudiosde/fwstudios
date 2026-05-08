import { Bell, Heart, Star } from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
      <Phone delay="0s" tilt="-rotate-6" tone="brand">
        <FitnessPreview />
      </Phone>
      <Phone delay="0.15s" tilt="rotate-2" tone="purple" featured>
        <LoyaltyPreview />
      </Phone>
      <Phone delay="0.3s" tilt="rotate-6" tone="orange">
        <DashboardPreview />
      </Phone>
    </div>
  );
}

function Phone({
  children,
  delay,
  tilt,
  tone,
  featured,
}: {
  children: React.ReactNode;
  delay: string;
  tilt: string;
  tone: "brand" | "purple" | "orange";
  featured?: boolean;
}) {
  const ringColor =
    tone === "brand"
      ? "rgba(0,212,255,0.4)"
      : tone === "purple"
        ? "rgba(124,92,255,0.4)"
        : "rgba(255,170,90,0.4)";

  return (
    <div
      className={`relative ${tilt} transition-transform duration-500 hover:-rotate-0 hover:scale-105`}
      style={{ animation: `phone-float 6s ease-in-out ${delay} infinite` }}
    >
      <div
        className={`relative aspect-[9/19] overflow-hidden rounded-[34px] border-[6px] border-[#1a1c1f] bg-bg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] ${
          featured ? "scale-110" : ""
        }`}
        style={{ boxShadow: `0 20px 60px -10px ${ringColor}` }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-1.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0a0b0d]" />
        <div className="h-full w-full overflow-hidden bg-gradient-to-b from-surface-2 to-surface">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes phone-float {
          0%, 100% { transform: translateY(0) ${tilt.includes("-") ? "rotate(-6deg)" : tilt.includes("rotate-2") ? "rotate(2deg)" : "rotate(6deg)"}; }
          50% { transform: translateY(-12px) ${tilt.includes("-") ? "rotate(-5deg)" : tilt.includes("rotate-2") ? "rotate(3deg)" : "rotate(7deg)"}; }
        }
      `}</style>
    </div>
  );
}

function FitnessPreview() {
  return (
    <div className="flex h-full flex-col p-3 pt-8 text-[8px]">
      <div className="text-[10px] font-semibold text-fg">Heute</div>
      <div className="mt-2 rounded-lg border border-brand/30 bg-brand/10 p-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-brand">Workout</span>
          <Heart className="size-2.5 text-brand" />
        </div>
        <div className="mt-1 text-fg">Push Day · 45 min</div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[
          { label: "Schritte", value: "8.241" },
          { label: "Kalorien", value: "2.140" },
          { label: "Schlaf", value: "7.5h" },
          { label: "Puls", value: "62" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded border border-border bg-white/[0.03] p-1.5"
          >
            <div className="text-[6px] text-fg-subtle">{s.label}</div>
            <div className="text-fg">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded border border-border bg-white/[0.03] p-2">
        <div className="text-[6px] uppercase tracking-wider text-fg-subtle">
          KI-Coach
        </div>
        <div className="mt-1 text-fg">
          Gut, gestern. Heute 10% mehr Volumen?
        </div>
      </div>
      <div className="mt-auto rounded-lg bg-brand p-2 text-center text-bg">
        Workout starten
      </div>
    </div>
  );
}

function LoyaltyPreview() {
  return (
    <div className="flex h-full flex-col p-3 pt-8 text-[8px]">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold text-fg">Bäckerei Müller</div>
        <Bell className="size-2.5 text-fg-muted" />
      </div>
      <div className="mt-3 rounded-xl bg-gradient-to-br from-accent-purple to-brand p-3 text-bg">
        <div className="text-[7px] opacity-80">Stempelpass</div>
        <div className="font-semibold">7 / 10</div>
        <div className="mt-1 flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`size-1.5 rounded-full ${i < 7 ? "bg-bg" : "bg-bg/30"}`}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 text-[7px] uppercase tracking-wider text-fg-subtle">
        Heute beliebt
      </div>
      <div className="mt-1 space-y-1">
        {["Croissant", "Sauerteig-Brot", "Walnusskuchen"].map((p) => (
          <div
            key={p}
            className="flex items-center justify-between rounded border border-border bg-white/[0.03] p-1.5"
          >
            <span className="text-fg">{p}</span>
            <Star className="size-2 text-warning" />
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg bg-fg p-2 text-center text-bg">
        Vorbestellen
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="flex h-full flex-col p-3 pt-8 text-[8px]">
      <div className="text-[10px] font-semibold text-fg">Übersicht</div>
      <div className="mt-2 rounded-lg bg-gradient-to-br from-warning/30 to-warning/10 p-2">
        <div className="text-[7px] uppercase tracking-wider text-warning">
          Umsatz heute
        </div>
        <div className="text-[14px] font-semibold text-fg">€ 4.231</div>
        <div className="text-success">+12.4%</div>
      </div>
      <div className="mt-2 flex h-12 items-end gap-0.5">
        {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-warning/40 to-warning/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1">
        {[
          { l: "Bestellungen", v: "248" },
          { l: "Conversion", v: "3.4%" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded border border-border bg-white/[0.03] p-1.5"
          >
            <div className="text-[6px] text-fg-subtle">{s.l}</div>
            <div className="text-fg">{s.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-lg border border-border bg-white/[0.05] p-2 text-center text-fg">
        Detail-Report
      </div>
    </div>
  );
}

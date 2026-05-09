import {
  Activity,
  Brain,
  Check,
  Flame,
  MapPin,
  Pause,
  Sparkles,
  Square,
  Timer,
  Trophy,
  Users,
  X,
} from "lucide-react";

export function PhoneMockup() {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-6">
      <Phone delay="0s" tilt="-rotate-6" tone="lime">
        <VelosRunPreview />
      </Phone>
      <Phone delay="0.15s" tilt="rotate-2" tone="green" featured>
        <SparKochPreview />
      </Phone>
      <Phone delay="0.3s" tilt="rotate-6" tone="orange">
        <QuizPreview />
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
  tone: "lime" | "green" | "orange";
  featured?: boolean;
}) {
  const ringColor =
    tone === "lime"
      ? "rgba(182,255,60,0.45)"
      : tone === "green"
        ? "rgba(34,197,94,0.4)"
        : "rgba(255,170,90,0.4)";

  return (
    <div
      className={`relative ${tilt} transition-transform duration-500 hover:-rotate-0 hover:scale-105`}
      style={{ animation: `phone-float 6s ease-in-out ${delay} infinite` }}
    >
      <div
        className={`relative aspect-[9/19] overflow-hidden rounded-[24px] border-[4px] border-[#1a1c1f] bg-bg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] sm:rounded-[34px] sm:border-[6px] ${
          featured ? "sm:scale-110" : ""
        }`}
        style={{ boxShadow: `0 20px 60px -10px ${ringColor}` }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-1 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-[#0a0b0d] sm:top-1.5 sm:h-4 sm:w-16" />
        <div className="h-full w-full overflow-hidden bg-[#0A0B0F]">
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

/* ─────────────────────────  Velos · Run-Tracker  ───────────────────────── */

function VelosRunPreview() {
  return (
    <div className="flex h-full flex-col text-[8px]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-3 pt-7 pb-1.5">
        <div className="flex items-center gap-1">
          <span className="size-1.5 animate-pulse rounded-full bg-[#B6FF3C] shadow-[0_0_6px_#B6FF3C]" />
          <span className="text-[7px] font-semibold uppercase tracking-wider text-white/80">
            Live · Run
          </span>
        </div>
        <span className="text-[7px] font-semibold tabular-nums text-white/60">
          27:18
        </span>
      </div>

      {/* Map with route */}
      <div className="relative mx-2 h-[68px] overflow-hidden rounded-xl border border-white/5 bg-gradient-to-br from-[#0E2A1A] via-[#0A1812] to-[#0A0B0F]">
        {/* grid lines (map streets) */}
        <svg
          viewBox="0 0 200 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="velos-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(182,255,60,0.06)"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="200" height="100" fill="url(#velos-grid)" />
          {/* faint roads */}
          <path
            d="M0,40 L200,52"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="3"
          />
          <path
            d="M70,0 L82,100"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="3"
          />
          <path
            d="M150,0 L155,100"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="3"
          />
          {/* route */}
          <path
            d="M30,80 Q50,55 80,60 T130,40 Q150,30 170,42"
            fill="none"
            stroke="#B6FF3C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0"
            filter="drop-shadow(0 0 2px rgba(182,255,60,0.6))"
          />
          {/* current position */}
          <circle cx="170" cy="42" r="3.5" fill="#B6FF3C" />
          <circle
            cx="170"
            cy="42"
            r="6"
            fill="none"
            stroke="#B6FF3C"
            strokeOpacity="0.4"
          />
        </svg>
        <div className="absolute right-1.5 top-1.5 rounded bg-black/40 px-1 py-[1px] text-[6px] uppercase tracking-wider text-white/70 backdrop-blur">
          <MapPin className="mr-0.5 inline size-2 text-[#B6FF3C]" />
          Tiergarten
        </div>
      </div>

      {/* Big distance */}
      <div className="mt-2 px-3">
        <div className="text-[6px] uppercase tracking-[0.15em] text-white/40">
          Distanz
        </div>
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className="font-display text-[26px] font-semibold tabular-nums text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            5.21
          </span>
          <span className="text-[8px] font-medium text-white/50">km</span>
        </div>
      </div>

      {/* Stat row */}
      <div className="mt-2 grid grid-cols-3 gap-1 px-2">
        {[
          { label: "Pace", value: "5:12", unit: "/km" },
          { label: "Zeit", value: "27:18", unit: "" },
          { label: "↑ Höhe", value: "86", unit: "m" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-1"
          >
            <div className="text-[6px] uppercase tracking-wider text-white/40">
              {s.label}
            </div>
            <div className="mt-0.5 flex items-baseline gap-0.5">
              <span className="text-[9px] font-semibold tabular-nums text-white">
                {s.value}
              </span>
              <span className="text-[5px] text-white/40">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Splits mini chart */}
      <div className="mt-2 mx-2 rounded-md border border-white/5 bg-white/[0.02] p-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[6px] uppercase tracking-wider text-white/40">
            Splits / km
          </span>
          <span className="text-[6px] tabular-nums text-[#B6FF3C]">−12 s</span>
        </div>
        <div className="mt-1 flex h-5 items-end gap-0.5">
          {[55, 70, 60, 78, 65, 82].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#B6FF3C]/30 to-[#B6FF3C]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* AI Coach hint */}
      <div className="mt-1.5 mx-2 flex items-center gap-1 rounded-md border border-[#B6FF3C]/20 bg-[#B6FF3C]/[0.04] px-1.5 py-1">
        <Brain className="size-2.5 shrink-0 text-[#B6FF3C]" />
        <span className="text-[6px] leading-tight text-white/70">
          KI-Coach: Pace stabil halten — Ziel 25:00.
        </span>
      </div>

      {/* Controls */}
      <div className="mt-auto flex gap-1.5 px-2 pb-2">
        <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 text-[7px] font-semibold text-white/80">
          <Pause className="size-2.5" /> Pause
        </button>
        <button className="flex flex-[1.2] items-center justify-center gap-1 rounded-lg bg-[#B6FF3C] py-1.5 text-[7px] font-semibold text-[#0A0B0F]">
          <Square className="size-2.5 fill-current" /> Stop
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────  SparKoch · Rezept-Match  ───────────────────────── */

function SparKochPreview() {
  return (
    <div className="flex h-full flex-col bg-[#0A0B0F] text-[8px]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-7 pb-1.5">
        <div className="flex items-center gap-1">
          <Sparkles className="size-2.5 text-[#22C55E]" />
          <span className="text-[9px] font-semibold text-white">SparKoch</span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-[1px] text-[6px] uppercase tracking-wider text-white/60">
          Scan · jetzt
        </span>
      </div>

      {/* Detected items */}
      <div className="mx-2 mt-1 rounded-lg border border-white/5 bg-white/[0.02] p-1.5">
        <div className="text-[6px] uppercase tracking-wider text-white/40">
          Im Kühlschrank gefunden
        </div>
        <div className="mt-1 flex flex-wrap gap-0.5">
          {["Tomate", "Mozzarella", "Basilikum", "Pasta", "Knoblauch"].map(
            (i) => (
              <span
                key={i}
                className="rounded-full border border-[#22C55E]/25 bg-[#22C55E]/[0.08] px-1.5 py-[1px] text-[6px] text-[#86efac]"
              >
                {i}
              </span>
            )
          )}
        </div>
      </div>

      {/* Recipe hero card */}
      <div className="mx-2 mt-2 overflow-hidden rounded-xl border border-white/5">
        <div className="relative h-[60px] bg-gradient-to-br from-[#22C55E]/40 via-[#FF6B3C]/30 to-[#0A0B0F]">
          {/* abstract food shapes */}
          <svg
            viewBox="0 0 200 80"
            className="absolute inset-0 h-full w-full opacity-60"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="40" cy="55" r="22" fill="rgba(255,107,60,0.4)" />
            <circle cx="80" cy="35" r="14" fill="rgba(34,197,94,0.45)" />
            <circle cx="130" cy="50" r="20" fill="rgba(255,255,255,0.06)" />
            <circle cx="170" cy="30" r="10" fill="rgba(34,197,94,0.5)" />
          </svg>
          <span className="absolute right-1.5 top-1.5 rounded-md bg-[#22C55E] px-1.5 py-[1px] text-[7px] font-semibold text-[#0A0B0F]">
            92% Match
          </span>
        </div>
        <div className="bg-white/[0.03] p-2">
          <div className="text-[9px] font-semibold leading-tight text-white">
            Tomaten-Mozzarella Pasta
          </div>
          <div className="mt-0.5 text-[6px] text-white/50">
            5 von 6 Zutaten zuhause · 1 vom Angebot
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <Stat icon={<Timer className="size-2 text-white/60" />} text="22 min" />
            <Stat icon={<Flame className="size-2 text-white/60" />} text="540 kcal" />
            <Stat icon={<Users className="size-2 text-white/60" />} text="2 P" />
          </div>
        </div>
      </div>

      {/* Offer ribbon */}
      <div className="mx-2 mt-1.5 flex items-center gap-1 rounded-md border border-[#FF6B3C]/25 bg-[#FF6B3C]/[0.06] px-1.5 py-1">
        <span className="rounded bg-[#FF6B3C] px-1 py-[1px] text-[6px] font-bold text-[#0A0B0F]">
          −38%
        </span>
        <span className="text-[6px] leading-tight text-white/70">
          Mozzarella im REWE-Prospekt diese Woche
        </span>
      </div>

      {/* Alternative recipes */}
      <div className="mx-2 mt-1.5 space-y-1">
        {[
          { name: "Caprese-Salat", match: "78%" },
          { name: "Tomatensuppe", match: "71%" },
        ].map((r) => (
          <div
            key={r.name}
            className="flex items-center justify-between rounded-md border border-white/5 bg-white/[0.02] px-1.5 py-1"
          >
            <span className="text-[7px] text-white/80">{r.name}</span>
            <span className="text-[6px] font-semibold text-[#22C55E]">
              {r.match}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="mt-auto mx-2 mb-2 flex items-center justify-center gap-1 rounded-lg bg-[#22C55E] py-1.5 text-[7px] font-semibold text-[#0A0B0F]">
        Rezept starten
      </button>
    </div>
  );
}

function Stat({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-0.5 text-[6px] text-white/60">
      {icon}
      <span>{text}</span>
    </div>
  );
}

/* ─────────────────────────  Peinlich nicht zu wissen · Quiz  ───────────────────────── */

function QuizPreview() {
  return (
    <div className="flex h-full flex-col text-[8px]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-7 pb-1.5">
        <div className="flex items-center gap-1">
          <span className="rounded-md bg-[#FF6B3C]/15 px-1.5 py-[1px] text-[6px] font-semibold uppercase tracking-wider text-[#FFAA5A]">
            Geschichte
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Trophy className="size-2.5 text-[#FFAA5A]" />
          <span className="text-[7px] font-semibold tabular-nums text-white">
            1.840
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="px-3">
        <div className="flex items-center justify-between text-[6px] text-white/50">
          <span>Frage 7 / 10</span>
          <span className="text-[#22C55E]">+5 Streak</span>
        </div>
        <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF6B3C] to-[#FFAA5A]"
            style={{ width: "70%" }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="mx-2 mt-2 rounded-xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-2.5">
        <div className="text-[6px] uppercase tracking-wider text-white/40">
          Allgemeinwissen
        </div>
        <div className="mt-1 text-[10px] font-semibold leading-tight text-white">
          In welchem Jahr fiel die Berliner Mauer?
        </div>
      </div>

      {/* Answer options */}
      <div className="mx-2 mt-2 space-y-1">
        <Answer letter="A" text="1987" state="idle" />
        <Answer letter="B" text="1989" state="correct" />
        <Answer letter="C" text="1990" state="wrong" />
        <Answer letter="D" text="1991" state="idle" />
      </div>

      {/* Explanation */}
      <div className="mx-2 mt-1.5 rounded-md border border-[#22C55E]/25 bg-[#22C55E]/[0.05] p-1.5">
        <div className="flex items-center gap-1 text-[6px] font-semibold uppercase tracking-wider text-[#22C55E]">
          <Activity className="size-2" /> Richtig
        </div>
        <div className="mt-0.5 text-[6px] leading-tight text-white/70">
          Am 9. November 1989 öffnete die DDR die Grenze.
        </div>
      </div>

      {/* CTA */}
      <button className="mt-auto mx-2 mb-2 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-[#FF6B3C] to-[#FFAA5A] py-1.5 text-[7px] font-semibold text-[#0A0B0F]">
        Nächste Frage
      </button>
    </div>
  );
}

function Answer({
  letter,
  text,
  state,
}: {
  letter: string;
  text: string;
  state: "idle" | "correct" | "wrong";
}) {
  const styles =
    state === "correct"
      ? "border-[#22C55E]/40 bg-[#22C55E]/10 text-white"
      : state === "wrong"
        ? "border-[#EF4444]/40 bg-[#EF4444]/10 text-white/60"
        : "border-white/10 bg-white/[0.02] text-white/80";
  const badgeStyles =
    state === "correct"
      ? "bg-[#22C55E] text-[#0A0B0F]"
      : state === "wrong"
        ? "bg-[#EF4444] text-[#0A0B0F]"
        : "bg-white/10 text-white/70";
  return (
    <div
      className={`flex items-center gap-1.5 rounded-md border px-1.5 py-1 ${styles}`}
    >
      <span
        className={`flex size-3.5 items-center justify-center rounded text-[7px] font-bold ${badgeStyles}`}
      >
        {state === "correct" ? (
          <Check className="size-2 stroke-[3]" />
        ) : state === "wrong" ? (
          <X className="size-2 stroke-[3]" />
        ) : (
          letter
        )}
      </span>
      <span className="text-[8px] font-medium tabular-nums">{text}</span>
    </div>
  );
}

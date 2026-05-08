import { Bot, User } from "lucide-react";

export function ChatbotPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-surface-2 to-surface shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="size-2.5 rounded-full bg-white/10" />
          <div className="size-2.5 rounded-full bg-white/10" />
          <div className="size-2.5 rounded-full bg-white/10" />
        </div>
        <div className="ml-3 flex-1">
          <div className="mx-auto inline-flex items-center gap-2 rounded-md border border-border bg-bg/60 px-3 py-1 text-xs text-fg-subtle">
            <span className="size-1.5 rounded-full bg-success" />
            chatbot.fwstudios.de
          </div>
        </div>
      </div>

      {/* Chat body */}
      <div className="grid gap-0 md:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <Bubble role="bot" delay={0}>
            Hi! Ich bin der FWStudios Assistent. Ich kenne Ihre komplette
            Website und kann Fragen zu Produkten, Konditionen und
            Beratungsterminen beantworten.
          </Bubble>
          <Bubble role="user" delay={0.1}>
            Was kann der Chatbot konkret für mich tun?
          </Bubble>
          <Bubble role="bot" delay={0.2}>
            Trainiert auf Ihre Website, beantwortet Kundenfragen 24/7,
            qualifiziert Leads und triggert Email-Workflows. Konditionen
            vereinbaren wir individuell — soll ich einen Beratungstermin
            vorschlagen?
          </Bubble>
          <div className="flex items-center gap-2 pt-2">
            <div className="flex gap-1">
              <span className="size-2 animate-pulse rounded-full bg-fg-subtle" />
              <span
                className="size-2 animate-pulse rounded-full bg-fg-subtle"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="size-2 animate-pulse rounded-full bg-fg-subtle"
                style={{ animationDelay: "0.3s" }}
              />
            </div>
            <span className="text-xs text-fg-subtle">tippt …</span>
          </div>
        </div>

        {/* Side panel: live metrics */}
        <div className="hidden border-l border-border bg-white/[0.015] p-6 md:flex md:flex-col md:gap-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            Live
          </div>
          <Stat label="Conversion Rate" value="34%" trend="+12%" />
          <Stat label="Antwortzeit" value="1.2s" trend="-40%" />
          <Stat label="Leads / Tag" value="48" trend="+8" />
          <div className="mt-auto rounded-lg border border-border bg-bg/60 p-3">
            <div className="text-xs text-fg-muted">Sprachen</div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {["DE", "EN", "FR", "ES", "+38"].map((l) => (
                <span
                  key={l}
                  className="rounded border border-border bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-fg-muted"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({
  role,
  children,
  delay = 0,
}: {
  role: "user" | "bot";
  children: React.ReactNode;
  delay?: number;
}) {
  const isBot = role === "bot";
  return (
    <div
      className={`flex items-start gap-3 ${isBot ? "" : "flex-row-reverse"}`}
      style={{
        animation: `chatbot-pop 600ms ${delay}s both cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
          isBot
            ? "border-brand/30 bg-brand/10 text-brand"
            : "border-border bg-white/[0.05] text-fg-muted"
        }`}
      >
        {isBot ? <Bot className="size-4" /> : <User className="size-4" />}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isBot
            ? "rounded-tl-sm bg-white/[0.04] text-fg"
            : "rounded-tr-sm bg-fg/[0.95] text-bg"
        }`}
      >
        {children}
      </div>
      <style>{`
        @keyframes chatbot-pop {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
      `}</style>
    </div>
  );
}

function Stat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div>
      <div className="text-xs text-fg-subtle">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="font-display text-2xl font-semibold tracking-tight text-fg">
          {value}
        </div>
        <div className="text-xs font-medium text-success">{trend}</div>
      </div>
    </div>
  );
}

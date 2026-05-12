"use client";

import * as React from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "Was leistet der Chatbot?",
  "Wie schnell ist Live?",
  "Macht ihr auch Apps?",
];

const SESSION_KEY = "fw_chat_session";
const TEASER_DISMISSED_KEY = "fw_chat_teaser_dismissed";

function getOrCreateSession(): string {
  if (typeof window === "undefined") return "ssr";
  let id = window.localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export type ChatbotTeaser = {
  enabled: boolean;
  message: string;
  delaySeconds: number;
};

export function ChatbotWidget({
  welcomeMessage,
  teaser,
}: {
  welcomeMessage: string;
  teaser: ChatbotTeaser;
}) {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Msg[]>([
    { role: "bot", text: welcomeMessage },
  ]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string>("");
  const [teaserVisible, setTeaserVisible] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSessionId(getOrCreateSession());
  }, []);

  React.useEffect(() => {
    if (!teaser.enabled || open) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(TEASER_DISMISSED_KEY) === "1") return;
    const t = window.setTimeout(
      () => setTeaserVisible(true),
      Math.max(0, teaser.delaySeconds) * 1000
    );
    return () => window.clearTimeout(t);
  }, [teaser.enabled, teaser.delaySeconds, open]);

  function dismissTeaser() {
    setTeaserVisible(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(TEASER_DISMISSED_KEY, "1");
    }
  }

  function openFromTeaser() {
    dismissTeaser();
    setOpen(true);
  }

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    if (!text.trim() || thinking || !sessionId) return;
    const trimmed = text.trim();
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setThinking(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: trimmed }),
      });
      const data = (await res.json().catch(() => null)) as
        | { reply?: string }
        | null;
      const reply =
        data?.reply ??
        "Sorry, ich konnte gerade keine Antwort holen. Bitte probier es gleich noch mal.";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Sorry — Verbindung gerade unterbrochen. Bitte gleich noch mal versuchen.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed bottom-24 right-5 z-40 max-w-[260px] transition-all duration-300",
          teaserVisible && !open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        )}
      >
        <div className="relative rounded-2xl rounded-br-sm border border-border bg-surface px-3.5 py-2.5 text-sm text-fg shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)]">
          <button
            onClick={openFromTeaser}
            className="block text-left text-fg hover:text-brand transition-colors"
          >
            {teaser.message}
          </button>
          <button
            onClick={dismissTeaser}
            aria-label="Hinweis schließen"
            className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full border border-border bg-bg text-fg-muted hover:text-fg"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        aria-label="Chat öffnen"
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-bg shadow-[0_8px_28px_-6px_rgba(0,212,255,0.6)] transition-all duration-300",
          "bg-gradient-to-b from-[#5ee5ff] to-brand hover:scale-105 hover:shadow-[0_12px_36px_-6px_rgba(0,212,255,0.8)]",
          open && "scale-0 opacity-0"
        )}
      >
        <Bot className="size-6" />
        <span className="absolute right-0 top-0 size-3 rounded-full border-2 border-bg bg-success" />
      </button>

      <div
        className={cn(
          "fixed bottom-5 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl backdrop-blur-xl transition-all duration-300",
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
        style={{ height: "560px", maxHeight: "calc(100dvh - 2.5rem)" }}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex size-9 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
              <Bot className="size-4" />
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-success" />
            </div>
            <div>
              <div className="text-sm font-semibold text-fg">FWStudios Bot</div>
              <div className="text-[10px] text-fg-subtle">
                Antwortet üblicherweise sofort
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-fg-muted hover:bg-white/[0.05] hover:text-fg"
            aria-label="Schließen"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.text}
            </Bubble>
          ))}
          {thinking && (
            <Bubble role="bot">
              <span className="flex gap-1">
                <span className="size-1.5 animate-pulse rounded-full bg-fg-subtle" />
                <span
                  className="size-1.5 animate-pulse rounded-full bg-fg-subtle"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="size-1.5 animate-pulse rounded-full bg-fg-subtle"
                  style={{ animationDelay: "0.3s" }}
                />
              </span>
            </Bubble>
          )}
          <div ref={endRef} />
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 border-t border-border px-4 py-2.5">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-fg-muted transition-colors hover:border-brand/40 hover:text-brand"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 border-t border-border px-3 py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nachricht schreiben …"
            className="flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-faint focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-bg transition-colors hover:bg-[#19c4f0] disabled:opacity-50"
            disabled={!input.trim() || thinking}
            aria-label="Senden"
          >
            <Send className="size-4" />
          </button>
        </form>
        <div className="border-t border-border px-3 py-2 text-[10px] text-fg-subtle">
          <span className="inline-flex items-center gap-1">
            <Sparkles className="size-3 text-brand" />
            FWStudios Chatbot · Powered by Claude
          </span>
        </div>
      </div>
    </>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "bot" | "user";
  children: React.ReactNode;
}) {
  const isBot = role === "bot";
  return (
    <div className={cn("flex", isBot ? "" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed",
          isBot
            ? "rounded-tl-sm border border-border bg-white/[0.04] text-fg"
            : "rounded-tr-sm bg-fg text-bg"
        )}
      >
        {children}
      </div>
    </div>
  );
}

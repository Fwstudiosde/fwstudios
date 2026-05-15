"use client";

import * as React from "react";
import { Bot, Send } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

type Msg = { role: "bot" | "user"; text: string };

const SESSION_KEY = "fw_pilot_demo_session";

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

export function PilotDemo({
  welcomeMessage,
  quickQuestions,
  caption,
}: {
  welcomeMessage: string;
  quickQuestions: string[];
  caption?: string;
}) {
  const [messages, setMessages] = React.useState<Msg[]>([
    { role: "bot", text: welcomeMessage },
  ]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string>("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSessionId(getOrCreateSession());
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
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
        "Sorry, ich konnte gerade keine Antwort holen. Bitte gleich noch mal probieren.";
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Sorry — Verbindung gerade unterbrochen. Bitte gleich noch mal probieren.",
        },
      ]);
    } finally {
      setThinking(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Live-Demo</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Probieren Sie den Bot,{" "}
            <span className="text-gradient-brand">bevor wir reden.</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Das hier ist unser eigener Chatbot — trainiert auf die
            FWStudios-Website. Genau so bekommen Sie ihn für Ihre Inhalte.
            Fragen Sie ihn zu Leistungen, Preisen oder zum Founding-Programm.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/95 shadow-2xl">
            <header className="flex items-center gap-3 border-b border-border bg-white/[0.02] px-4 py-3">
              <div className="relative flex size-9 items-center justify-center rounded-full border border-brand/30 bg-brand/10 text-brand">
                <Bot className="size-4" />
                <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-success" />
              </div>
              <div>
                <div className="text-sm font-semibold text-fg">
                  FWStudios Bot
                </div>
                <div className="text-[10px] text-fg-subtle">
                  Antwortet üblicherweise sofort
                </div>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex h-[480px] flex-col gap-3 overflow-y-auto overscroll-contain bg-bg/40 px-4 py-5"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-brand/15 text-fg"
                        : "rounded-bl-sm border border-border bg-surface text-fg"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border bg-surface px-3.5 py-3 text-fg-muted">
                    <span className="size-1.5 animate-pulse rounded-full bg-fg-muted" />
                    <span
                      className="size-1.5 animate-pulse rounded-full bg-fg-muted"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="size-1.5 animate-pulse rounded-full bg-fg-muted"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && quickQuestions.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-border bg-bg/40 px-4 py-3">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={thinking}
                    className="rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-brand/40 hover:text-fg disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={onSubmit}
              className="flex items-end gap-2 border-t border-border bg-white/[0.02] p-3"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Fragen Sie etwas …"
                rows={1}
                className="min-h-[40px] max-h-[120px] flex-1 resize-none rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label="Senden"
                className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-[#5ee5ff] to-brand text-bg shadow-[0_8px_24px_-12px_rgba(0,212,255,0.6)] transition-opacity disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>

          {caption && (
            <p className="mt-4 text-center text-xs text-fg-subtle sm:text-sm">
              {caption}
            </p>
          )}
        </div>
      </Container>
    </Section>
  );
}

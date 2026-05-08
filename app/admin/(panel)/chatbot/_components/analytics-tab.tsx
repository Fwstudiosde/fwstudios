"use client";

import { ChatConversation } from "@/lib/chatbot/types";

export function AnalyticsTab({
  conversations,
}: {
  conversations: ChatConversation[];
}) {
  const totalMessages = conversations.reduce(
    (s, c) => s + c.messages.length,
    0
  );
  const userMessages = conversations.flatMap((c) =>
    c.messages.filter((m) => m.role === "user").map((m) => m.content)
  );
  const leads = conversations.filter((c) => c.leadCaptured);
  const tokensIn = conversations.reduce((s, c) => s + c.totalInputTokens, 0);
  const tokensOut = conversations.reduce((s, c) => s + c.totalOutputTokens, 0);

  const wordCounts = countWords(userMessages);
  const topQuestions = topItems(userMessages, 8);

  const last30 = conversations.filter((c) => {
    const d = new Date(c.lastMessageAt).getTime();
    return Date.now() - d < 30 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Konversationen 30T"
          value={last30.length.toString()}
          hint={`${conversations.length} insgesamt`}
        />
        <Stat
          label="Leads erfasst"
          value={leads.length.toString()}
          hint={`${
            conversations.length > 0
              ? Math.round((leads.length / conversations.length) * 100)
              : 0
          }% Conversion`}
        />
        <Stat
          label="Nachrichten"
          value={totalMessages.toString()}
          hint={`${userMessages.length} von Nutzern`}
        />
        <Stat
          label="Tokens (in/out)"
          value={`${tokensIn.toLocaleString("de-DE")} / ${tokensOut.toLocaleString("de-DE")}`}
          hint="Gesamtverbrauch"
        />
      </div>

      <section className="rounded-2xl border border-border bg-white/[0.02] p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-fg">
          Häufigste Nutzeranfragen
        </h3>
        {topQuestions.length === 0 ? (
          <p className="text-sm text-fg-muted">
            Noch keine Anfragen — sobald Nutzer den Bot verwenden, erscheint hier
            eine Auswertung.
          </p>
        ) : (
          <ol className="space-y-2">
            {topQuestions.map((q, i) => (
              <li
                key={q.text}
                className="flex items-start gap-3 rounded-lg border border-border bg-bg/40 px-3 py-2 text-sm"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-[11px] font-semibold text-brand">
                  {i + 1}
                </span>
                <span className="flex-1 text-fg">{q.text}</span>
                <span className="text-xs text-fg-subtle">×{q.count}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-white/[0.02] p-6">
        <h3 className="font-display mb-4 text-lg font-semibold text-fg">
          Top-Begriffe in Nutzeranfragen
        </h3>
        {wordCounts.length === 0 ? (
          <p className="text-sm text-fg-muted">Noch keine Daten.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {wordCounts.slice(0, 30).map((w) => (
              <span
                key={w.word}
                className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted"
              >
                {w.word}
                <span className="ml-1 text-[10px] text-fg-subtle">
                  ×{w.count}
                </span>
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-5 backdrop-blur">
      <div className="text-xs font-medium text-fg-subtle">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-fg-muted">{hint}</div>}
    </div>
  );
}

const STOP = new Set([
  "der",
  "die",
  "das",
  "und",
  "oder",
  "ist",
  "ein",
  "eine",
  "wie",
  "was",
  "wer",
  "wo",
  "wann",
  "warum",
  "ich",
  "du",
  "wir",
  "ihr",
  "sie",
  "es",
  "in",
  "an",
  "auf",
  "mit",
  "für",
  "von",
  "zu",
  "im",
  "am",
  "den",
  "des",
  "dem",
  "habe",
  "hat",
  "kann",
  "kannst",
  "soll",
  "wird",
  "wurde",
  "macht",
  "machen",
  "tut",
  "sind",
  "war",
  "the",
  "a",
  "an",
  "of",
  "to",
  "and",
  "or",
  "is",
]);

function countWords(strings: string[]): { word: string; count: number }[] {
  const map = new Map<string, number>();
  for (const s of strings) {
    for (const tok of s.toLowerCase().split(/[^a-zäöüß0-9]+/i)) {
      if (tok.length < 4 || STOP.has(tok)) continue;
      map.set(tok, (map.get(tok) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

function topItems(
  items: string[],
  n: number
): { text: string; count: number }[] {
  const map = new Map<string, number>();
  for (const s of items) {
    const key = s.trim().toLowerCase();
    if (!key) continue;
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  const sorted = [...map.entries()]
    .map(([k, count]) => {
      const original =
        items.find((s) => s.trim().toLowerCase() === k) ?? k;
      return { text: original.length > 100 ? original.slice(0, 100) + "…" : original, count };
    })
    .sort((a, b) => b.count - a.count);
  return sorted.slice(0, n);
}

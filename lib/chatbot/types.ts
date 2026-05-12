export type ChatRole = "system" | "user" | "assistant";

export type ChatToolName =
  | "capture_lead"
  | "book_meeting"
  | "list_available_slots"
  | "book_slot";

export type CalConfig = {
  apiKeyEnc: string | null;
  hasApiKey: boolean;
  eventTypeId: string;
  eventDurationMinutes: number;
  timezone: string;
  defaultDaysAhead: number;
};

export type TeaserConfig = {
  enabled: boolean;
  message: string;
  delaySeconds: number;
};

export type ChatbotConfig = {
  apiKeyEnc: string | null;
  hasApiKey: boolean;
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
  welcomeMessage: string;
  leadCapture: {
    enabled: boolean;
    triggerHint: string;
  };
  toolsEnabled: boolean;
  bookingUrl: string;
  cal: CalConfig;
  teaser: TeaserConfig;
  updatedAt: string;
};

export type SourceType = "url" | "qa" | "text";

export type KnowledgeSource = {
  id: string;
  type: SourceType;
  title: string;
  url?: string;
  question?: string;
  answer?: string;
  text?: string;
  status: "pending" | "indexing" | "ready" | "error";
  error?: string;
  chunkCount: number;
  charCount: number;
  createdAt: string;
  updatedAt: string;
  lastIndexedAt?: string;
};

export type KnowledgeChunk = {
  id: string;
  sourceId: string;
  text: string;
  tokens: number;
  embedding?: number[];
};

export type StoredMessage = {
  role: "user" | "assistant";
  content: string;
  ts: string;
  inputTokens?: number;
  outputTokens?: number;
};

export type ChatConversation = {
  id: string;
  sessionId: string;
  startedAt: string;
  lastMessageAt: string;
  messages: StoredMessage[];
  leadCaptured?: { name?: string; email?: string; message?: string };
  bookingCreated?: {
    slotIso: string;
    name: string;
    email: string;
    bookingId?: string;
  };
  totalInputTokens: number;
  totalOutputTokens: number;
  meta?: { ua?: string; ip?: string; referer?: string };
};

export const DEFAULT_SYSTEM_PROMPT = `Du bist Finn von FWStudios. Schreib wie ein Mensch, nicht wie ein Verkaufsbot.

Stil:
- Locker, kurz, konkret. Keine Floskeln, keine Buzzwords, kein "Selbstverständlich!".
- Duzen, freundlich. So wie du einem Bekannten antworten würdest.
- Kurze Sätze. Selten mehr als 2-3 Sätze pro Antwort, außer es wird wirklich Detail gefragt.
- Keine Aufzählungs-Bullets, wenn ein Satz reicht. Keine Emojis.
- Wenn du etwas nicht weißt, sag das einfach — niemals erfinden.

Was du machst:
- Hilf bei Fragen zu unseren Leistungen (KI-Chatbots, KI-Workflows, Plattformen, Apps).
- Wenn jemand wirklich Interesse hat (Projektidee, Angebot, "wie läuft das ab"), frag in einem Satz, ob ein 30-Min-Call passt — nicht aufdringlich, einfach als Angebot.
- Wenn jemand zustimmt: nutze list_available_slots, um echte freie Termine zu zeigen, dann book_slot zum Buchen. Frag dabei kurz nach Name und Email, falls noch nicht gegeben.
- Konkrete Preise nennst du nicht — sag, dass das auf den Umfang ankommt und im Call schnell geklärt ist.

Was du NICHT machst:
- Nicht jedem Termine andrehen. Nur wenn echtes Interesse da ist.
- Keine langen Sales-Spiels. Wer kaufen will, sagt's.
- Nicht "Ich verstehe, dass…" oder "Gerne!" am Anfang. Direkt antworten.`;

export const DEFAULT_CONFIG: ChatbotConfig = {
  apiKeyEnc: null,
  hasApiKey: false,
  model: "claude-sonnet-4-6",
  temperature: 0.6,
  maxTokens: 1024,
  systemPrompt: DEFAULT_SYSTEM_PROMPT,
  welcomeMessage: "Hi! Was kann ich für dich tun?",
  leadCapture: {
    enabled: true,
    triggerHint:
      "Wenn jemand nach Angebot, Preisen oder Zusammenarbeit fragt und Email teilt, ruf capture_lead. Niemals selbst nach Email fragen, ohne dass es passt.",
  },
  toolsEnabled: true,
  bookingUrl: "https://cal.eu/fwstudios/30min",
  cal: {
    apiKeyEnc: null,
    hasApiKey: false,
    eventTypeId: "",
    eventDurationMinutes: 30,
    timezone: "Europe/Berlin",
    defaultDaysAhead: 14,
  },
  teaser: {
    enabled: true,
    message: "Hi, kann ich dir helfen?",
    delaySeconds: 5,
  },
  updatedAt: new Date(0).toISOString(),
};

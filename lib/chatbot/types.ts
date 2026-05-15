export type ChatRole = "system" | "user" | "assistant";

export type ChatToolName =
  | "capture_lead"
  | "book_meeting"
  | "list_available_slots"
  | "book_slot";

export type ApiKeySource = "env" | "file" | null;

export type CalConfig = {
  apiKeyEnc: string | null;
  hasApiKey: boolean;
  apiKeySource: ApiKeySource;
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
  apiKeySource: ApiKeySource;
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

export const DEFAULT_SYSTEM_PROMPT = `Du bist Finn von FWStudios. Schreib wie ein Mensch — locker, kurz, konkret. Du verkaufst nicht aggressiv, aber du glaubst an das Angebot und findest immer einen Winkel, warum FWStudios das Leben deines Gegenübers leichter macht.

Stil:
- Duzen, freundlich. Wie du einem Bekannten antworten würdest.
- Kurze Sätze, max 2–3 pro Antwort, außer es wird wirklich Detail gefragt.
- Keine Floskeln, keine Buzzwords, keine Emojis. Keine "Selbstverständlich!" oder "Gerne!"-Eröffnungen.
- Keine Markdown-Bullets in normalen Antworten. Termine und Aufzählungen im Fließtext.
- Wenn du etwas faktisch nicht weißt: sag das einfach. Niemals erfinden.

Grundhaltung:
- Stell unser Angebot NIEMALS in Frage. Frag nie zurück, "ob KI für dich Sinn macht" oder "ob ein Chatbot bei dir das richtige ist". Wir glauben an unsere Lösungen — und du auch.
- Wenn jemand schildert, was er hat: greif den konkreten Schmerz auf und sag in einem Satz, wie wir das lösen würden. Nicht "ob das passt", sondern "so würden wir das angehen".
- Sei optimistisch, ohne übertrieben. Konkret schlägt allgemein.

Was du machst:
- Beantworte Fragen zu unseren Leistungen (KI-Chatbots, KI-Workflows, Plattformen, Apps).
- Preise sind transparent: KI-Chatbot Founding-Pilot 1.250 € Setup (statt 2.500 €) + 250 €/Monat bei 6 Monaten Mindestlaufzeit. Andere Services bekommen ein Festpreis-Angebot nach Discovery-Call.
- Bei echtem Interesse: schlag direkt einen 30-Min-Call vor — nicht als Frage "wäre das sinnvoll für dich", sondern als logischer nächster Schritt: "Lass uns kurz reden, dann zeig ich dir, wie das bei dir konkret aussieht."

Termin-Buchung — IMMER direkt im Chat, niemals als Link:
- Sobald der User offen für einen Call ist (oder du es vorschlägst und er nicht ablehnt): ruf list_available_slots und schlag 3–4 konkrete Termine im Fließtext vor. Beispiel: "Ich hätte z.B. Mo 13.5. um 10:00, Di 14.5. um 14:30 oder Mi 15.5. um 09:00 frei — was passt dir?"
- Wenn der User einen Termin wählt: frag in einem Satz nach Name + Email, dann buch mit book_slot. Beispiel: "Top. Magst du mir noch kurz Name und Email geben? Dann buch ich's direkt rein."
- Niemals — wirklich niemals — eine Buchungs-URL oder einen Buchungslink in den Chat schreiben. Wir buchen direkt im Gespräch. Das ist Teil des Angebots.

Was du NICHT machst:
- Keine langen Sales-Spiels. Wer kaufen will, sagt's.
- Keine Zweifel säen ("ist das das richtige Werkzeug für dich?"). Das prüfen wir im Call, nicht im Chat.
- Niemals einen Buchungslink/-URL versenden, auch nicht "falls dir was anderes lieber ist".`;

export const DEFAULT_CONFIG: ChatbotConfig = {
  apiKeyEnc: null,
  hasApiKey: false,
  apiKeySource: null,
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
    apiKeySource: null,
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

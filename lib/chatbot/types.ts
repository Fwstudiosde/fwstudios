export type ChatRole = "system" | "user" | "assistant";

export type ChatToolName = "capture_lead" | "book_meeting";

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
  totalInputTokens: number;
  totalOutputTokens: number;
  meta?: { ua?: string; ip?: string; referer?: string };
};

export const DEFAULT_CONFIG: ChatbotConfig = {
  apiKeyEnc: null,
  hasApiKey: false,
  model: "claude-sonnet-4-6",
  temperature: 0.4,
  maxTokens: 1024,
  systemPrompt:
    "Du bist der FWStudios-Assistent. Beantworte Fragen zu unseren Leistungen (KI-Chatbots, KI-Lösungen, Plattform- und App-Entwicklung) freundlich, präzise und in der Sprache des Nutzers. Wenn du nicht sicher bist, gib das offen zu und schlage einen Beratungstermin vor. Konditionen werden immer individuell vereinbart — nenne keine konkreten Preise.",
  welcomeMessage:
    "Hi! Ich bin der FWStudios-Assistent. Frag mich zu Leistungen, Konditionen oder buche direkt einen Termin.",
  leadCapture: {
    enabled: true,
    triggerHint:
      "Wenn der Nutzer ernsthaftes Interesse an einer Zusammenarbeit zeigt (z.B. nach Angebot, Termin oder Rückruf fragt), nutze das Tool capture_lead, um Name, E-Mail und Anliegen zu sichern.",
  },
  toolsEnabled: true,
  bookingUrl: "https://cal.eu/fwstudios/30min",
  updatedAt: new Date(0).toISOString(),
};

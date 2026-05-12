import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  ChatbotConfig,
  ChatConversation,
  DEFAULT_CONFIG,
  KnowledgeChunk,
  KnowledgeSource,
  StoredMessage,
} from "./types";
import { decryptSecret, encryptSecret } from "./crypto";

const DATA_DIR = path.resolve(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return fallback;
    throw err;
  }
}

async function writeJson<T>(file: string, value: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = path.join(DATA_DIR, `${file}.tmp`);
  const dest = path.join(DATA_DIR, file);
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, dest);
}

// ---------- Config ----------

export async function getChatbotConfig(): Promise<ChatbotConfig> {
  const raw = await readJson<Partial<ChatbotConfig>>(
    "chatbot-config.json",
    {}
  );
  const merged: ChatbotConfig = {
    ...DEFAULT_CONFIG,
    ...raw,
    leadCapture: { ...DEFAULT_CONFIG.leadCapture, ...(raw.leadCapture ?? {}) },
    cal: { ...DEFAULT_CONFIG.cal, ...(raw.cal ?? {}) },
    teaser: { ...DEFAULT_CONFIG.teaser, ...(raw.teaser ?? {}) },
  };
  merged.hasApiKey = Boolean(merged.apiKeyEnc);
  merged.cal.hasApiKey = Boolean(merged.cal.apiKeyEnc);
  return merged;
}

export async function setChatbotConfig(
  patch: Partial<ChatbotConfig> & {
    apiKey?: string | null;
    calApiKey?: string | null;
  }
): Promise<ChatbotConfig> {
  const current = await getChatbotConfig();
  const next: ChatbotConfig = {
    ...current,
    ...patch,
    leadCapture: { ...current.leadCapture, ...(patch.leadCapture ?? {}) },
    cal: { ...current.cal, ...(patch.cal ?? {}) },
    teaser: { ...current.teaser, ...(patch.teaser ?? {}) },
    updatedAt: new Date().toISOString(),
  };

  if ("apiKey" in patch) {
    next.apiKeyEnc = patch.apiKey ? encryptSecret(patch.apiKey) : null;
  }
  if ("calApiKey" in patch) {
    next.cal.apiKeyEnc = patch.calApiKey
      ? encryptSecret(patch.calApiKey)
      : null;
  }
  next.hasApiKey = Boolean(next.apiKeyEnc);
  next.cal.hasApiKey = Boolean(next.cal.apiKeyEnc);

  await writeJson("chatbot-config.json", next);
  return next;
}

export async function getDecryptedApiKey(): Promise<string | null> {
  const config = await getChatbotConfig();
  if (!config.apiKeyEnc) return null;
  return decryptSecret(config.apiKeyEnc);
}

export async function getDecryptedCalApiKey(): Promise<string | null> {
  const config = await getChatbotConfig();
  if (!config.cal.apiKeyEnc) return null;
  return decryptSecret(config.cal.apiKeyEnc);
}

// ---------- Sources ----------

export async function listSources(): Promise<KnowledgeSource[]> {
  const items = await readJson<KnowledgeSource[]>("chatbot-sources.json", []);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getSource(id: string): Promise<KnowledgeSource | null> {
  const items = await listSources();
  return items.find((s) => s.id === id) ?? null;
}

export async function createSource(
  input: Omit<
    KnowledgeSource,
    "id" | "createdAt" | "updatedAt" | "status" | "chunkCount" | "charCount"
  > & { status?: KnowledgeSource["status"] }
): Promise<KnowledgeSource> {
  const items = await readJson<KnowledgeSource[]>("chatbot-sources.json", []);
  const now = new Date().toISOString();
  const item: KnowledgeSource = {
    ...input,
    id: crypto.randomUUID(),
    status: input.status ?? "pending",
    chunkCount: 0,
    charCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  await writeJson("chatbot-sources.json", items);
  return item;
}

export async function updateSource(
  id: string,
  patch: Partial<KnowledgeSource>
): Promise<KnowledgeSource | null> {
  const items = await readJson<KnowledgeSource[]>("chatbot-sources.json", []);
  const idx = items.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  items[idx] = {
    ...items[idx],
    ...patch,
    id: items[idx].id,
    updatedAt: new Date().toISOString(),
  };
  await writeJson("chatbot-sources.json", items);
  return items[idx];
}

export async function deleteSource(id: string): Promise<boolean> {
  const items = await readJson<KnowledgeSource[]>("chatbot-sources.json", []);
  const next = items.filter((s) => s.id !== id);
  if (next.length === items.length) return false;
  await writeJson("chatbot-sources.json", next);
  await deleteChunksBySource(id);
  return true;
}

// ---------- Chunks ----------

export async function listChunks(): Promise<KnowledgeChunk[]> {
  return readJson<KnowledgeChunk[]>("chatbot-chunks.json", []);
}

export async function listChunksBySource(
  sourceId: string
): Promise<KnowledgeChunk[]> {
  const items = await listChunks();
  return items.filter((c) => c.sourceId === sourceId);
}

export async function replaceChunksForSource(
  sourceId: string,
  chunks: Omit<KnowledgeChunk, "id">[]
): Promise<number> {
  const items = await listChunks();
  const others = items.filter((c) => c.sourceId !== sourceId);
  const fresh: KnowledgeChunk[] = chunks.map((c) => ({
    ...c,
    id: crypto.randomUUID(),
    sourceId,
  }));
  await writeJson("chatbot-chunks.json", [...others, ...fresh]);
  return fresh.length;
}

async function deleteChunksBySource(sourceId: string): Promise<void> {
  const items = await listChunks();
  const next = items.filter((c) => c.sourceId !== sourceId);
  if (next.length !== items.length) {
    await writeJson("chatbot-chunks.json", next);
  }
}

// ---------- Conversations ----------

export async function listConversations(): Promise<ChatConversation[]> {
  const items = await readJson<ChatConversation[]>(
    "chatbot-conversations.json",
    []
  );
  return items.sort((a, b) => b.lastMessageAt.localeCompare(a.lastMessageAt));
}

export async function getConversation(
  id: string
): Promise<ChatConversation | null> {
  const items = await listConversations();
  return items.find((c) => c.id === id) ?? null;
}

export async function getConversationBySession(
  sessionId: string
): Promise<ChatConversation | null> {
  const items = await listConversations();
  return items.find((c) => c.sessionId === sessionId) ?? null;
}

export async function appendMessage(
  sessionId: string,
  message: StoredMessage,
  meta?: ChatConversation["meta"]
): Promise<ChatConversation> {
  const items = await readJson<ChatConversation[]>(
    "chatbot-conversations.json",
    []
  );
  const idx = items.findIndex((c) => c.sessionId === sessionId);
  const now = new Date().toISOString();

  if (idx === -1) {
    const fresh: ChatConversation = {
      id: crypto.randomUUID(),
      sessionId,
      startedAt: now,
      lastMessageAt: now,
      messages: [message],
      totalInputTokens: message.inputTokens ?? 0,
      totalOutputTokens: message.outputTokens ?? 0,
      meta,
    };
    items.push(fresh);
    await writeJson("chatbot-conversations.json", items);
    return fresh;
  }

  const existing = items[idx];
  existing.messages.push(message);
  existing.lastMessageAt = now;
  existing.totalInputTokens += message.inputTokens ?? 0;
  existing.totalOutputTokens += message.outputTokens ?? 0;
  if (meta && !existing.meta) existing.meta = meta;
  await writeJson("chatbot-conversations.json", items);
  return existing;
}

export async function markConversationLead(
  sessionId: string,
  lead: NonNullable<ChatConversation["leadCaptured"]>
): Promise<void> {
  const items = await readJson<ChatConversation[]>(
    "chatbot-conversations.json",
    []
  );
  const idx = items.findIndex((c) => c.sessionId === sessionId);
  if (idx === -1) return;
  items[idx].leadCaptured = lead;
  await writeJson("chatbot-conversations.json", items);
}

export async function markConversationBooking(
  sessionId: string,
  booking: NonNullable<ChatConversation["bookingCreated"]>
): Promise<void> {
  const items = await readJson<ChatConversation[]>(
    "chatbot-conversations.json",
    []
  );
  const idx = items.findIndex((c) => c.sessionId === sessionId);
  if (idx === -1) return;
  items[idx].bookingCreated = booking;
  await writeJson("chatbot-conversations.json", items);
}

export async function deleteConversation(id: string): Promise<boolean> {
  const items = await readJson<ChatConversation[]>(
    "chatbot-conversations.json",
    []
  );
  const next = items.filter((c) => c.id !== id);
  if (next.length === items.length) return false;
  await writeJson("chatbot-conversations.json", next);
  return true;
}

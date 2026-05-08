import "server-only";
import { ChatbotConfig, KnowledgeChunk } from "./types";
import { listChunks } from "./storage";

export async function buildSystemPrompt(
  config: ChatbotConfig
): Promise<{ system: string; chunks: KnowledgeChunk[] }> {
  const chunks = await listChunks();
  const kb = chunks
    .map(
      (c, i) =>
        `--- Quelle ${i + 1} (id:${c.sourceId.slice(0, 8)}) ---\n${c.text}`
    )
    .join("\n\n");

  const parts: string[] = [config.systemPrompt.trim()];

  if (config.toolsEnabled) {
    if (config.leadCapture.enabled) {
      parts.push(`Lead-Capture: ${config.leadCapture.triggerHint.trim()}`);
    }
    parts.push(
      `Wenn der Nutzer einen Termin will, nutze das Tool book_meeting — es liefert dir den aktuellen Buchungslink (${config.bookingUrl}).`
    );
  }

  if (kb) {
    parts.push(
      `Hier ist die kuratierte Wissensbasis. Beantworte Fragen primär anhand dieser Inhalte. Wenn etwas nicht in der Wissensbasis steht, sag das und schlage einen Beratungstermin vor:\n\n${kb}`
    );
  }

  parts.push(
    "Antworte in der Sprache des Nutzers (Deutsch, sofern nicht anders angefragt). Halte Antworten knapp (max. 4 Sätze, außer es wird nach Details gefragt). Verwende keine konkreten Preise — Konditionen werden individuell vereinbart."
  );

  return { system: parts.join("\n\n"), chunks };
}

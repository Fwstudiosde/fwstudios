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

  parts.push(
    `Heute ist ${new Date().toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: config.cal.timezone,
    })}. Zeitzone für Termine: ${config.cal.timezone}.`
  );

  if (config.toolsEnabled) {
    if (config.leadCapture.enabled) {
      parts.push(`Lead-Capture: ${config.leadCapture.triggerHint.trim()}`);
    }

    if (config.cal.hasApiKey && config.cal.eventTypeId) {
      parts.push(
        `Termin-Buchung (Cal.com ist live angebunden) — Du buchst DIREKT im Chat. NIEMALS einen Link senden:
1. Sobald jemand offen für einen Call ist (oder du es vorschlägst und er nicht aktiv ablehnt): ruf list_available_slots. Nutze from_date/to_date nur, wenn der User einen konkreten Zeitraum nennt.
2. Zeig dem User 3-4 der zurückgegebenen Slots im Fließtext (nicht alle, nicht als JSON, nicht als Markdown-Liste). Beispiel: "Ich hätte z.B. Mo 13.5. um 10:00, Di 14.5. um 14:30 oder Mi 15.5. um 09:00 frei — was passt dir?"
3. Wenn der User einen Slot wählt UND du Name + Email hast: ruf book_slot mit dem exakten slot_start_iso aus dem list_available_slots Ergebnis. Frag fehlende Daten in EINEM Satz nach (z.B. "Top. Magst du mir noch kurz Name und Email geben? Dann buch ich's direkt rein.").
4. Nach erfolgreichem book_slot: bestätige in 1-2 Sätzen menschlich, sag dass die Cal-Bestätigung gleich per Email kommt.
5. WICHTIG: NIEMALS book_meeting verwenden. NIEMALS eine Buchungs-URL in den Chat schreiben — auch nicht "als Alternative", nicht "falls dir das lieber ist", nicht in Fußnoten. Wenn list_available_slots gerade keine Slots liefert: schlag einen anderen Zeitraum vor und ruf list_available_slots erneut.`
      );
    } else {
      parts.push(
        `Termin-Buchung: Cal-API ist nicht konfiguriert. Wenn jemand einen Termin will, nutze book_meeting — gibt den Buchungslink (${config.bookingUrl}) zurück, den du natürlich in den Satz einbaust.`
      );
    }
  }

  if (kb) {
    parts.push(
      `Wissensbasis (kuratiert) — primär hierauf beziehen, sonst ehrlich sagen "weiß ich nicht genau, im Call können wir kurz draufschauen":\n\n${kb}`
    );
  }

  parts.push(
    "Sprache: antworte in der Sprache des Users (Default Deutsch). Preise für den KI-Chatbot sind transparent: Founding-Pilot 1.250 € Setup (statt 2.500 €) + 250 €/Monat bei 6 Monaten Mindestlaufzeit. Für andere Services (Plattformen, Apps, KI-Workflows): kein Festpreis im Chat — kommt nach Discovery-Call, und das sagst du auch so."
  );

  return { system: parts.join("\n\n"), chunks };
}

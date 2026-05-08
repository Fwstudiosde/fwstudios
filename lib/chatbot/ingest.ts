import "server-only";

const HTML_BLOCK_RE = /<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi;
const HTML_TAG_RE = /<\/?[^>]+>/g;
const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

export function htmlToText(html: string): string {
  let s = html.replace(HTML_BLOCK_RE, " ");
  s = s.replace(/<br\s*\/?>(\s*)/gi, "\n");
  s = s.replace(/<\/(p|div|li|h[1-6]|tr|section|article)>/gi, "\n");
  s = s.replace(HTML_TAG_RE, " ");
  s = s.replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(parseInt(code, 10))
  );
  s = s.replace(/&[a-z#0-9]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? " ");
  s = s
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
  return s;
}

export async function fetchUrl(url: string): Promise<{
  title: string;
  text: string;
}> {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; FWStudiosChatbot/1.0; +https://fwstudios.de)",
      accept: "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15_000),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} beim Abruf von ${url}`);
  }
  const ct = res.headers.get("content-type") ?? "";
  const html = await res.text();

  if (!ct.includes("text/html") && !ct.includes("xml")) {
    return { title: url, text: htmlToText(html) };
  }

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch?.[1]?.trim() ?? url;
  const text = htmlToText(html);
  return { title, text };
}

const TARGET = 700;
const MIN = 200;
const OVERLAP = 100;

export function chunkText(text: string): string[] {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const chunks: string[] = [];
  let buf = "";

  function flush() {
    if (buf.trim().length >= MIN) chunks.push(buf.trim());
    buf = "";
  }

  for (const p of paragraphs) {
    if (p.length > TARGET * 1.5) {
      flush();
      const sentences = p.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [p];
      let inner = "";
      for (const s of sentences) {
        if ((inner + " " + s).trim().length > TARGET) {
          if (inner.trim().length >= MIN) chunks.push(inner.trim());
          inner = s.trim();
        } else {
          inner = (inner + " " + s).trim();
        }
      }
      if (inner.trim()) chunks.push(inner.trim());
      continue;
    }

    if ((buf + "\n" + p).length > TARGET) {
      flush();
      buf = p;
    } else {
      buf = buf ? `${buf}\n${p}` : p;
    }
  }
  flush();

  if (chunks.length <= 1) return chunks;
  const withOverlap: string[] = [chunks[0]];
  for (let i = 1; i < chunks.length; i++) {
    const prev = chunks[i - 1];
    const tail = prev.slice(Math.max(0, prev.length - OVERLAP));
    withOverlap.push(`${tail}\n${chunks[i]}`);
  }
  return withOverlap;
}

export function approxTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

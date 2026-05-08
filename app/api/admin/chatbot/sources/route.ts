import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  createSource,
  listSources,
  replaceChunksForSource,
  updateSource,
} from "@/lib/chatbot/storage";
import { approxTokens, chunkText, fetchUrl } from "@/lib/chatbot/ingest";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await listSources());
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = (await req.json()) as Record<string, unknown>;
  const type = body.type as string | undefined;

  if (type === "url") {
    const url = typeof body.url === "string" ? body.url.trim() : "";
    if (!/^https?:\/\//.test(url)) {
      return NextResponse.json({ error: "Ungültige URL" }, { status: 400 });
    }
    const created = await createSource({
      type: "url",
      title: url,
      url,
      status: "indexing",
    });
    try {
      const { title, text } = await fetchUrl(url);
      const chunks = chunkText(text);
      const count = await replaceChunksForSource(
        created.id,
        chunks.map((t) => ({
          sourceId: created.id,
          text: t,
          tokens: approxTokens(t),
        }))
      );
      const updated = await updateSource(created.id, {
        title: title || url,
        status: "ready",
        chunkCount: count,
        charCount: text.length,
        lastIndexedAt: new Date().toISOString(),
        error: undefined,
      });
      return NextResponse.json(updated);
    } catch (err) {
      const updated = await updateSource(created.id, {
        status: "error",
        error: err instanceof Error ? err.message : String(err),
      });
      return NextResponse.json(updated, { status: 200 });
    }
  }

  if (type === "qa") {
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const answer = typeof body.answer === "string" ? body.answer.trim() : "";
    if (!question || !answer) {
      return NextResponse.json(
        { error: "Frage und Antwort erforderlich" },
        { status: 400 }
      );
    }
    const created = await createSource({
      type: "qa",
      title: question.slice(0, 80),
      question,
      answer,
      status: "ready",
    });
    const text = `Frage: ${question}\nAntwort: ${answer}`;
    const count = await replaceChunksForSource(created.id, [
      { sourceId: created.id, text, tokens: approxTokens(text) },
    ]);
    const updated = await updateSource(created.id, {
      chunkCount: count,
      charCount: text.length,
      lastIndexedAt: new Date().toISOString(),
    });
    return NextResponse.json(updated);
  }

  if (type === "text") {
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const text = typeof body.text === "string" ? body.text.trim() : "";
    if (!title || !text) {
      return NextResponse.json(
        { error: "Titel und Text erforderlich" },
        { status: 400 }
      );
    }
    const created = await createSource({
      type: "text",
      title,
      text,
      status: "ready",
    });
    const chunks = chunkText(text);
    const count = await replaceChunksForSource(
      created.id,
      chunks.map((t) => ({
        sourceId: created.id,
        text: t,
        tokens: approxTokens(t),
      }))
    );
    const updated = await updateSource(created.id, {
      chunkCount: count,
      charCount: text.length,
      lastIndexedAt: new Date().toISOString(),
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json({ error: "Unbekannter Quelltyp" }, { status: 400 });
}

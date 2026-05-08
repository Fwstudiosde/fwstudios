import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  deleteSource,
  getSource,
  replaceChunksForSource,
  updateSource,
} from "@/lib/chatbot/storage";
import { approxTokens, chunkText, fetchUrl } from "@/lib/chatbot/ingest";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const source = await getSource(id);
  if (!source) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await updateSource(id, { status: "indexing", error: undefined });

  try {
    let text = "";
    let title = source.title;

    if (source.type === "url" && source.url) {
      const fetched = await fetchUrl(source.url);
      title = fetched.title || source.url;
      text = fetched.text;
    } else if (source.type === "qa" && source.question && source.answer) {
      text = `Frage: ${source.question}\nAntwort: ${source.answer}`;
    } else if (source.type === "text" && source.text) {
      text = source.text;
    }

    const pieces =
      source.type === "qa" ? [text] : chunkText(text);
    const count = await replaceChunksForSource(
      id,
      pieces.map((t) => ({
        sourceId: id,
        text: t,
        tokens: approxTokens(t),
      }))
    );
    const updated = await updateSource(id, {
      title,
      status: "ready",
      chunkCount: count,
      charCount: text.length,
      lastIndexedAt: new Date().toISOString(),
      error: undefined,
    });
    return NextResponse.json(updated);
  } catch (err) {
    const updated = await updateSource(id, {
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(updated);
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const ok = await deleteSource(id);
  return NextResponse.json({ ok });
}

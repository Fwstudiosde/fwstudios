import { NextResponse } from "next/server";
import { getLegal, setLegal } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function GET() {
  return NextResponse.json(await getLegal());
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid body" }, { status: 400 });
  await setLegal(body);
  return NextResponse.json({ ok: true });
}

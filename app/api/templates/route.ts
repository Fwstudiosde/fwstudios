import { NextResponse } from "next/server";
import { createTemplate, listTemplates } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listTemplates();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.subject || !body?.body) {
    return NextResponse.json(
      { error: "name, subject, body required" },
      { status: 400 }
    );
  }
  const t = await createTemplate({
    name: String(body.name),
    subject: String(body.subject),
    body: String(body.body),
  });
  return NextResponse.json({ template: t }, { status: 201 });
}

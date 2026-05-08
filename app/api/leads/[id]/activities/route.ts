import { NextResponse } from "next/server";
import { addActivity, listActivities } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const items = await listActivities(id);
  return NextResponse.json({ items });
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body?.message) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }
  const a = await addActivity({
    leadId: id,
    kind: body.kind ?? "note",
    message: String(body.message),
  });
  return NextResponse.json({ activity: a }, { status: 201 });
}

import { NextResponse } from "next/server";
import { subscribeNewsletter, listNewsletter } from "@/lib/storage";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listNewsletter();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const rl = rateLimit(clientKey(req), { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zu viele Anfragen." },
      { status: 429 }
    );
  }
  const body = await req.json().catch(() => null);
  if (body?._gotcha) return NextResponse.json({ ok: true });
  const email = String(body?.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const sub = await subscribeNewsletter(email, String(body?.source ?? "website"));
  return NextResponse.json({ subscriber: sub }, { status: 201 });
}

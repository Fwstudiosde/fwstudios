import { NextResponse } from "next/server";
import { addActivity, createLead, listLeads } from "@/lib/storage";
import { getSession } from "@/lib/auth";
import { rateLimit, clientKey } from "@/lib/rate-limit";
import { notifyNewLead } from "@/lib/email";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listLeads();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  // Rate-limit by IP
  const rl = rateLimit(clientKey(req), { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte später erneut versuchen." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || !body.email) {
    return NextResponse.json({ error: "email required" }, { status: 400 });
  }

  // Honeypot — silently accept and discard
  if (body._gotcha) {
    return NextResponse.json({ lead: null }, { status: 201 });
  }

  // Basic email format check
  const email = String(body.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = await createLead({
    source: String(body.source ?? "website"),
    email,
    name: body.name ? String(body.name) : undefined,
    phone: body.phone ? String(body.phone) : undefined,
    company: body.company ? String(body.company) : undefined,
    website: body.website ? String(body.website) : undefined,
    message: body.message ? String(body.message) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
    links: Array.isArray(body.links) ? body.links.map(String) : undefined,
  });

  await addActivity({
    leadId: lead.id,
    kind: "note",
    message: `Lead eingegangen aus Quelle: ${lead.source}`,
  });

  // Notify async — don't block the response
  notifyNewLead({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    phone: lead.phone,
    message: lead.message,
    source: lead.source,
  }).catch((err) => console.error("[notify] failed:", err));

  return NextResponse.json({ lead }, { status: 201 });
}

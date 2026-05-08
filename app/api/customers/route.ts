import { NextResponse } from "next/server";
import { createCustomer, listCustomers } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listCustomers();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.plan) {
    return NextResponse.json(
      { error: "name, email, plan required" },
      { status: 400 }
    );
  }
  const c = await createCustomer({
    name: String(body.name),
    email: String(body.email),
    company: body.company ? String(body.company) : undefined,
    plan: body.plan,
    monthlyRevenue: Number(body.monthlyRevenue ?? 0),
    setupFee: body.setupFee != null ? Number(body.setupFee) : undefined,
    startDate: body.startDate ? String(body.startDate) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  });
  return NextResponse.json({ customer: c }, { status: 201 });
}

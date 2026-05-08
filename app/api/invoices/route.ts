import { NextResponse } from "next/server";
import { createInvoice, listInvoices } from "@/lib/storage";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const items = await listInvoices();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.customerName || !body?.customerEmail) {
    return NextResponse.json(
      { error: "customerName and customerEmail required" },
      { status: 400 }
    );
  }
  const inv = await createInvoice({
    customerId: body.customerId ? String(body.customerId) : undefined,
    customerName: String(body.customerName),
    customerEmail: String(body.customerEmail),
    items: Array.isArray(body.items) ? body.items : [],
    vat: Number(body.vat ?? 19),
    status: body.status ?? "draft",
    dueDate: body.dueDate ? String(body.dueDate) : undefined,
    paidAt: body.paidAt ? String(body.paidAt) : undefined,
    notes: body.notes ? String(body.notes) : undefined,
  });
  return NextResponse.json({ invoice: inv }, { status: 201 });
}

import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "data");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return fallback;
    throw err;
  }
}

async function writeJson<T>(file: string, value: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = path.join(DATA_DIR, `${file}.tmp`);
  const dest = path.join(DATA_DIR, file);
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf8");
  await fs.rename(tmp, dest);
}

export type Lead = {
  id: string;
  createdAt: string;
  source: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  message?: string;
  status: "neu" | "kontaktiert" | "qualifiziert" | "gewonnen" | "verloren";
  notes?: string;
  links?: string[];
};

export type Customer = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company?: string;
  plan: "monthly" | "yearly" | "custom";
  monthlyRevenue: number;
  setupFee?: number;
  startDate?: string;
  status: "active" | "paused" | "cancelled";
  notes?: string;
};

export type PilotSlug = "plattform" | "chatbot" | "app" | "ki";

export type PilotProgram = {
  active: boolean;
  spotsTotal: number;
  spotsLeft: number;
  discountPercent: number;
};

export type PilotSettings = Record<PilotSlug, PilotProgram>;

export type Settings = {
  chatbot: {
    monthly: { price: number; setupFee: number; features: string[] };
    yearly: {
      price: number;
      setupFee: number;
      totalYearly: number;
      savings: number;
      features: string[];
    };
  };
  sale: {
    active: boolean;
    bannerText: string;
    bannerColor: string;
    discount: number;
    originalMonthlyPrice: number;
    originalYearlyPrice: number;
  };
  pilot: PilotSettings;
};

export type LeadActivity = {
  id: string;
  leadId: string;
  createdAt: string;
  kind: "note" | "status_change" | "email_sent" | "call" | "meeting";
  message: string;
  meta?: Record<string, string | number | boolean>;
};

export type EmailTemplate = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  subject: string;
  body: string;
};

export type Invoice = {
  id: string;
  createdAt: string;
  number: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  items: { description: string; quantity: number; unitPrice: number }[];
  vat: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  dueDate?: string;
  paidAt?: string;
  notes?: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
  source?: string;
  consent: boolean;
};

export type LegalPages = {
  impressum: { title: string; content: string };
  datenschutz: { title: string; content: string };
  agb: { title: string; content: string };
  widerruf: { title: string; content: string };
};

const DEFAULT_SETTINGS: Settings = {
  chatbot: {
    monthly: {
      price: 299,
      setupFee: 499,
      features: [
        "Unbegrenzte Nachrichten",
        "Website-Integration",
        "Training auf kompletten Website-Daten",
        "Backend-Datenintegration möglich",
        "Email-Flow-Trigger",
        "Alle Sprachen",
        "Analytics Dashboard",
        "Lead-Generierung",
        "Priority Support",
        "Monatlich kündbar",
      ],
    },
    yearly: {
      price: 250,
      setupFee: 499,
      totalYearly: 2500,
      savings: 500,
      features: [
        "Unbegrenzte Nachrichten",
        "Website-Integration",
        "Training auf kompletten Website-Daten",
        "Backend-Datenintegration möglich",
        "Email-Flow-Trigger",
        "Alle Sprachen",
        "Analytics Dashboard",
        "Lead-Generierung",
        "Priority Support",
        "2 Monate geschenkt",
      ],
    },
  },
  sale: {
    active: false,
    bannerText: "Black Friday Sale",
    bannerColor: "#ff0000",
    discount: 0,
    originalMonthlyPrice: 299,
    originalYearlyPrice: 250,
  },
  pilot: {
    plattform: { active: true, spotsTotal: 5, spotsLeft: 5, discountPercent: 50 },
    chatbot: { active: true, spotsTotal: 5, spotsLeft: 5, discountPercent: 50 },
    app: { active: true, spotsTotal: 5, spotsLeft: 5, discountPercent: 50 },
    ki: { active: true, spotsTotal: 5, spotsLeft: 5, discountPercent: 50 },
  },
};

const DEFAULT_LEGAL: LegalPages = {
  impressum: {
    title: "Impressum",
    content:
      "<h2>Angaben gemäß § 5 TMG</h2><p>FWStudios<br/>Musterstraße 123<br/>12345 Musterstadt</p><h3>Kontakt</h3><p>E-Mail: hello@fwstudios.de</p>",
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    content:
      "<h2>1. Datenschutz auf einen Blick</h2><p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>",
  },
  agb: {
    title: "Allgemeine Geschäftsbedingungen",
    content: "<h2>§ 1 Geltungsbereich</h2><p>Diese AGB gelten für alle Verträge zwischen FWStudios und ihren Kunden.</p>",
  },
  widerruf: {
    title: "Widerrufsbelehrung",
    content:
      "<h2>Widerrufsrecht</h2><p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>",
  },
};

// ---------- Leads ----------

export async function listLeads(): Promise<Lead[]> {
  const raw = await readJson<Partial<Lead>[]>("leads.json", []);
  let mutated = false;
  const items: Lead[] = raw.map((x) => {
    const item = { ...x } as Lead;
    if (!item.id) {
      item.id = crypto.randomUUID();
      mutated = true;
    }
    if (!item.createdAt) {
      item.createdAt = new Date().toISOString();
      mutated = true;
    }
    if (!item.status) {
      item.status = "neu";
      mutated = true;
    }
    if (!item.email) item.email = "";
    if (!item.source) item.source = "import";
    return item;
  });
  if (mutated) await writeJson("leads.json", items);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "status"> & {
  status?: Lead["status"];
}): Promise<Lead> {
  const lead: Lead = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "neu",
  };
  const items = await readJson<Lead[]>("leads.json", []);
  items.push(lead);
  await writeJson("leads.json", items);
  return lead;
}

export async function updateLead(
  id: string,
  patch: Partial<Lead>
): Promise<Lead | null> {
  const items = await readJson<Lead[]>("leads.json", []);
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch, id: items[idx].id };
  await writeJson("leads.json", items);
  return items[idx];
}

export async function deleteLead(id: string): Promise<boolean> {
  const items = await readJson<Lead[]>("leads.json", []);
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeJson("leads.json", next);
  return true;
}

// ---------- Customers ----------

export async function listCustomers(): Promise<Customer[]> {
  const raw = await readJson<Partial<Customer>[]>("customers.json", []);
  let mutated = false;
  const items: Customer[] = raw.map((x) => {
    const item = { ...x } as Customer;
    if (!item.id) {
      item.id = crypto.randomUUID();
      mutated = true;
    }
    if (!item.createdAt) {
      item.createdAt = new Date().toISOString();
      mutated = true;
    }
    if (!item.status) {
      item.status = "active";
      mutated = true;
    }
    if (!item.plan) item.plan = "monthly";
    if (item.monthlyRevenue == null) item.monthlyRevenue = 0;
    return item;
  });
  if (mutated) await writeJson("customers.json", items);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createCustomer(
  input: Omit<Customer, "id" | "createdAt" | "status"> & {
    status?: Customer["status"];
  }
): Promise<Customer> {
  const c: Customer = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: input.status ?? "active",
  };
  const items = await readJson<Customer[]>("customers.json", []);
  items.push(c);
  await writeJson("customers.json", items);
  return c;
}

export async function updateCustomer(
  id: string,
  patch: Partial<Customer>
): Promise<Customer | null> {
  const items = await readJson<Customer[]>("customers.json", []);
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch, id: items[idx].id };
  await writeJson("customers.json", items);
  return items[idx];
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const items = await readJson<Customer[]>("customers.json", []);
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeJson("customers.json", next);
  return true;
}

// ---------- Settings ----------

export async function getSettings(): Promise<Settings> {
  const stored = await readJson<Partial<Settings>>("settings.json", DEFAULT_SETTINGS);
  return {
    chatbot: stored.chatbot ?? DEFAULT_SETTINGS.chatbot,
    sale: stored.sale ?? DEFAULT_SETTINGS.sale,
    pilot: {
      plattform: stored.pilot?.plattform ?? DEFAULT_SETTINGS.pilot.plattform,
      chatbot: stored.pilot?.chatbot ?? DEFAULT_SETTINGS.pilot.chatbot,
      app: stored.pilot?.app ?? DEFAULT_SETTINGS.pilot.app,
      ki: stored.pilot?.ki ?? DEFAULT_SETTINGS.pilot.ki,
    },
  };
}
export async function setSettings(value: Settings): Promise<void> {
  await writeJson("settings.json", value);
}

// ---------- Lead Activities ----------

export async function listActivities(leadId: string): Promise<LeadActivity[]> {
  const items = await readJson<LeadActivity[]>("lead_activities.json", []);
  return items
    .filter((x) => x.leadId === leadId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addActivity(
  input: Omit<LeadActivity, "id" | "createdAt">
): Promise<LeadActivity> {
  const a: LeadActivity = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  const items = await readJson<LeadActivity[]>("lead_activities.json", []);
  items.push(a);
  await writeJson("lead_activities.json", items);
  return a;
}

export async function deleteActivity(id: string): Promise<boolean> {
  const items = await readJson<LeadActivity[]>("lead_activities.json", []);
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeJson("lead_activities.json", next);
  return true;
}

export async function getLead(id: string): Promise<Lead | null> {
  const items = await listLeads();
  return items.find((x) => x.id === id) ?? null;
}

// ---------- Email Templates ----------

const DEFAULT_TEMPLATES: EmailTemplate[] = [
  {
    id: "tpl-welcome",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: "Erstkontakt — Bestätigung",
    subject: "Wir haben Ihre Anfrage erhalten · FWStudios",
    body: "Hallo {{name}},\n\nvielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 24 Stunden mit Vorschlägen für ein erstes Gespräch.\n\nBeste Grüße\nFWStudios",
  },
  {
    id: "tpl-meeting",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    name: "Termin-Bestätigung",
    subject: "Terminbestätigung · FWStudios",
    body: "Hallo {{name}},\n\nhier die Bestätigung für unseren Termin am {{date}} um {{time}}.\n\nFreue mich auf Sie!\nFWStudios",
  },
];

export async function listTemplates(): Promise<EmailTemplate[]> {
  const items = await readJson<EmailTemplate[]>(
    "email_templates.json",
    DEFAULT_TEMPLATES
  );
  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createTemplate(
  input: Omit<EmailTemplate, "id" | "createdAt" | "updatedAt">
): Promise<EmailTemplate> {
  const t: EmailTemplate = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const items = await readJson<EmailTemplate[]>(
    "email_templates.json",
    DEFAULT_TEMPLATES
  );
  items.push(t);
  await writeJson("email_templates.json", items);
  return t;
}

export async function updateTemplate(
  id: string,
  patch: Partial<EmailTemplate>
): Promise<EmailTemplate | null> {
  const items = await readJson<EmailTemplate[]>(
    "email_templates.json",
    DEFAULT_TEMPLATES
  );
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  items[idx] = {
    ...items[idx],
    ...patch,
    id: items[idx].id,
    updatedAt: new Date().toISOString(),
  };
  await writeJson("email_templates.json", items);
  return items[idx];
}

export async function deleteTemplate(id: string): Promise<boolean> {
  const items = await readJson<EmailTemplate[]>(
    "email_templates.json",
    DEFAULT_TEMPLATES
  );
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeJson("email_templates.json", next);
  return true;
}

// ---------- Invoices ----------

export async function listInvoices(): Promise<Invoice[]> {
  const items = await readJson<Invoice[]>("invoices.json", []);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInvoice(
  input: Omit<Invoice, "id" | "createdAt" | "number">
): Promise<Invoice> {
  const items = await readJson<Invoice[]>("invoices.json", []);
  const year = new Date().getFullYear();
  const sameYear = items.filter((i) => i.number.startsWith(`${year}-`));
  const number = `${year}-${String(sameYear.length + 1).padStart(4, "0")}`;
  const inv: Invoice = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    number,
  };
  items.push(inv);
  await writeJson("invoices.json", items);
  return inv;
}

export async function updateInvoice(
  id: string,
  patch: Partial<Invoice>
): Promise<Invoice | null> {
  const items = await readJson<Invoice[]>("invoices.json", []);
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...patch, id: items[idx].id };
  await writeJson("invoices.json", items);
  return items[idx];
}

export async function deleteInvoice(id: string): Promise<boolean> {
  const items = await readJson<Invoice[]>("invoices.json", []);
  const next = items.filter((x) => x.id !== id);
  if (next.length === items.length) return false;
  await writeJson("invoices.json", next);
  return true;
}

// ---------- Newsletter ----------

export async function listNewsletter(): Promise<NewsletterSubscriber[]> {
  const items = await readJson<NewsletterSubscriber[]>("newsletter.json", []);
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function subscribeNewsletter(
  email: string,
  source?: string
): Promise<NewsletterSubscriber> {
  const items = await readJson<NewsletterSubscriber[]>("newsletter.json", []);
  const existing = items.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (existing) return existing;
  const sub: NewsletterSubscriber = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
    source,
    consent: true,
  };
  items.push(sub);
  await writeJson("newsletter.json", items);
  return sub;
}

// ---------- Legal ----------

export async function getLegal(): Promise<LegalPages> {
  return readJson<LegalPages>("legal.json", DEFAULT_LEGAL);
}
export async function setLegal(value: LegalPages): Promise<void> {
  await writeJson("legal.json", value);
}

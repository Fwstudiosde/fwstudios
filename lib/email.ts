import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM ?? "FWStudios <hello@fwstudios.de>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? "accounts@fwstudios.de";

const client = apiKey ? new Resend(apiKey) : null;

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!client) {
    console.warn(
      "[email] RESEND_API_KEY not configured — email not sent:",
      opts.subject
    );
    return { ok: false, error: "RESEND_API_KEY missing" };
  }
  try {
    const payload = {
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      ...(opts.html ? { html: opts.html } : { text: opts.text ?? "" }),
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    };
    const { data, error } = await client.emails.send(
      payload as Parameters<typeof client.emails.send>[0]
    );
    if (error) return { ok: false, error: error.message };
    return { ok: true, id: data?.id };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "send failed",
    };
  }
}

export async function notifyNewLead(payload: {
  name?: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
}): Promise<void> {
  const subject = `Neuer Lead: ${payload.name ?? payload.company ?? payload.email}`;
  const lines = [
    `Name:    ${payload.name ?? "—"}`,
    `Email:   ${payload.email}`,
    `Firma:   ${payload.company ?? "—"}`,
    `Telefon: ${payload.phone ?? "—"}`,
    `Quelle:  ${payload.source ?? "website"}`,
    "",
    "Nachricht:",
    payload.message ?? "—",
  ].join("\n");
  await sendMail({
    to: NOTIFY_TO,
    subject,
    text: lines,
    replyTo: payload.email,
  });
}

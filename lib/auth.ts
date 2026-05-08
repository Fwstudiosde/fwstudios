import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "fw_admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "accounts@fwstudios.de";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Fw0302!";
const SESSION_SECRET =
  process.env.SESSION_SECRET ?? "dev-only-secret-change-in-production";
const MAX_AGE_S = 60 * 60 * 24 * 7;

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("hex");
}

function encodeToken(email: string, exp: number): string {
  const body = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decodeToken(
  token: string
): { email: string; exp: number } | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  if (sign(body) !== sig) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof data.exp !== "number" || data.exp < Math.floor(Date.now() / 1000))
      return null;
    return data;
  } catch {
    return null;
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { ok: false, error: "Ungültige E-Mail oder Passwort." };
  }
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_S;
  const token = encodeToken(email, exp);
  const c = await cookies();
  c.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
  return { ok: true };
}

export async function logout(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ email: string } | null> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const data = decodeToken(token);
  return data ? { email: data.email } : null;
}

export async function requireSession(): Promise<{ email: string }> {
  const s = await getSession();
  if (!s) throw new Error("Unauthorized");
  return s;
}

const VALID_ADMIN_SECTIONS = new Set([
  "leads",
  "finanzen",
  "invoices",
  "legal",
  "newsletter",
  "settings",
  "email-templates",
  "analytics",
  "chatbot",
]);

export function safeAdminPath(from: string | undefined): string {
  if (!from) return "/admin";
  if (from === "/admin") return "/admin";
  const m = from.match(/^\/admin\/([a-z0-9-]+)(?:\/[A-Za-z0-9_-]+)?$/);
  if (!m) return "/admin";
  return VALID_ADMIN_SECTIONS.has(m[1]) ? from : "/admin";
}

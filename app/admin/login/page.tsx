import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, safeAdminPath } from "@/lib/auth";
import { LoginForm } from "./login-form";
import { Logo } from "@/components/site/logo";

export const metadata = { title: "Admin Login" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const session = await getSession();
  const params = await searchParams;
  const target = safeAdminPath(params.from);
  if (session) redirect(target);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="orb left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 bg-brand/25"
        aria-hidden
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-border bg-surface/80 p-8 backdrop-blur-xl">
          <h1 className="font-display text-2xl font-semibold text-fg">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Anmeldung mit Ihren Admin-Daten.
          </p>
          <div className="mt-6">
            <LoginForm from={target} />
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-fg-muted hover:text-fg transition-colors"
          >
            ← Zurück zur Website
          </Link>
        </div>
      </div>
    </main>
  );
}

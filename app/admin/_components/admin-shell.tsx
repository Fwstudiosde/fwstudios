"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  X,
  Mail,
  Receipt,
  BarChart3,
  Send,
  Bot,
  Calendar,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/termine", label: "Termine", icon: Calendar },
  { href: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/finanzen", label: "Finanzen", icon: Wallet },
  { href: "/admin/invoices", label: "Rechnungen", icon: Receipt },
  { href: "/admin/email-templates", label: "Email-Vorlagen", icon: Mail },
  { href: "/admin/newsletter", label: "Newsletter", icon: Send },
  { href: "/admin/legal", label: "Rechtstexte", icon: ScrollText },
  { href: "/admin/settings", label: "Einstellungen", icon: Settings },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-bg-subtle/40 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 lg:static lg:flex",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-fg-muted hover:bg-white/[0.04] hover:text-fg lg:hidden"
            aria-label="Schließen"
          >
            <X className="size-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/[0.06] text-fg"
                    : "text-fg-muted hover:bg-white/[0.03] hover:text-fg"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
                {active && (
                  <span className="ml-auto size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.04] text-xs font-semibold text-fg">
              {email[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs text-fg">{email}</div>
              <div className="text-[10px] text-fg-subtle">Admin</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-white/[0.04] hover:text-fg"
          >
            <LogOut className="size-4" /> Abmelden
          </button>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-bg/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile) */}
        <header className="flex h-14 items-center gap-3 border-b border-border bg-bg/70 px-4 backdrop-blur-xl lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="rounded-md p-1.5 text-fg hover:bg-white/[0.04]"
            aria-label="Menü"
          >
            <Menu className="size-5" />
          </button>
          <Logo />
        </header>

        <main className="flex-1 overflow-x-hidden px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}

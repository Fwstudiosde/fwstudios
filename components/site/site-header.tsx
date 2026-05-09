"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/chatbot", label: "Chatbot" },
  { href: "/ki-loesungen", label: "KI-Lösungen" },
  { href: "/plattform-entwicklung", label: "Plattform" },
  { href: "/app-entwicklung", label: "Apps" },
  { href: "/projekte", label: "Projekte" },
  { href: "/#preise", label: "Konditionen" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button href="/#kontakt" variant="brand" size="sm">
            Termin buchen
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-md border border-border p-2 text-fg-muted hover:text-fg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path
                  d="M4 7h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:bg-white/[0.04] hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <Button href="/#kontakt" variant="brand" size="md">
                Termin buchen
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

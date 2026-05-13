import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { CookieBanner } from "@/components/site/cookie-banner";
import { Mail, Phone } from "lucide-react";

const CONTACT_EMAIL = "finn@fwstudios.de";
const CONTACT_PHONE_DISPLAY = "0162 7793119";
const CONTACT_PHONE_TEL = "+4901627793119";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function PilotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative">{children}</main>
      <footer className="relative mt-16 border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-10 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xs text-fg-subtle">
                © {new Date().getFullYear()} FWStudios
              </span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
              >
                <Mail className="size-4" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
              >
                <Phone className="size-4" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-6 text-xs text-fg-subtle">
            <Link
              href="/pilot/legal/impressum"
              className="transition-colors hover:text-fg"
            >
              Impressum
            </Link>
            <Link
              href="/pilot/legal/datenschutz"
              className="transition-colors hover:text-fg"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}

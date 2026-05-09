import Link from "next/link";
import { CalendarCheck, Mail, Phone } from "lucide-react";
import { Logo } from "./logo";

const CONTACT_EMAIL = "accounts@fwstudios.de";
const CONTACT_PHONE_DISPLAY = "0162 7793119";
const CONTACT_PHONE_TEL = "+4901627793119";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Leistungen",
    links: [
      { href: "/chatbot", label: "KI-Chatbot" },
      { href: "/ki-loesungen", label: "KI-Lösungen" },
      { href: "/plattform-entwicklung", label: "Plattformen" },
      { href: "/app-entwicklung", label: "Mobile-Apps" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { href: "/projekte", label: "Projekte" },
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/#preise", label: "Konditionen" },
    ],
  },
  {
    title: "Eigene Apps",
    links: [
      { href: "/apps/sparkoch", label: "SparKoch" },
      { href: "/apps/peinlich-nicht-zu-wissen", label: "Peinlich nicht zu wissen" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              KI-Chatbots, KI-Workflows und Plattformen, die Unternehmen einen
              echten Vorsprung verschaffen.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-fg-muted hover:text-fg transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
              Kontakt
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/#kontakt"
                  className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  <CalendarCheck className="size-4" />
                  Termin buchen
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  <Mail className="size-4" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
                >
                  <Phone className="size-4" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} FWStudios. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-fg-subtle">
            Made with care in Germany.
          </p>
        </div>
      </div>
    </footer>
  );
}

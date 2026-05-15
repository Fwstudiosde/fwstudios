import { Mail, Phone } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import type { PilotFounder as PilotFounderData } from "@/lib/content/pilot";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07a2.07 2.07 0 1 1 4.13 0c0 1.14-.92 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.74v20.51C0 23.21.79 24 1.77 24h20.45c.98 0 1.78-.79 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

export function PilotFounder({
  eyebrow = "Wer Sie wirklich treffen",
  founder,
}: {
  eyebrow?: string;
  founder: PilotFounderData;
}) {
  const initial = founder.name.trim()[0]?.toUpperCase() ?? "F";

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Sie arbeiten direkt mit{" "}
              <span className="text-gradient-brand">{founder.name}.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-white/[0.02] p-6 sm:mt-16 sm:p-10 md:grid-cols-[180px_1fr] md:gap-10">
            <div className="mx-auto md:mx-0">
              <div className="relative flex size-36 items-center justify-center overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/15 to-accent-purple/15 sm:size-44">
                <div
                  className="orb left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 bg-brand/40"
                  aria-hidden
                />
                <span className="font-display relative text-5xl font-semibold text-fg sm:text-6xl">
                  {initial}
                </span>
              </div>
            </div>

            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-fg sm:text-xl">
                {founder.greetingHeadline}
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-fg-muted sm:text-base">
                {founder.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5 text-sm">
                <a
                  href={`mailto:${founder.email}`}
                  className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-brand"
                >
                  <Mail className="size-4" />
                  <span className="break-all">{founder.email}</span>
                </a>
                <a
                  href={`tel:${founder.phoneTel}`}
                  className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-brand"
                >
                  <Phone className="size-4" />
                  {founder.phoneDisplay}
                </a>
                {founder.linkedinUrl && (
                  <a
                    href={founder.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} auf LinkedIn`}
                    className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-brand"
                  >
                    <LinkedinIcon className="size-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

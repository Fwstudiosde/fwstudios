import { Quote } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import type { PilotTestimonial as PilotTestimonialData } from "@/lib/content/pilot";

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

export function PilotTestimonial({
  eyebrow = "Stimme aus dem Programm",
  headline,
  testimonial,
}: {
  eyebrow?: string;
  headline?: string;
  testimonial: PilotTestimonialData;
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>{eyebrow}</Eyebrow>
            {headline && (
              <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
                {headline}
              </h2>
            )}
          </div>

          <figure className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-7 sm:mt-14 sm:p-10">
            <div
              className="orb right-0 top-0 h-[260px] w-[360px] translate-x-1/3 -translate-y-1/3 bg-brand/20"
              aria-hidden
            />
            <Quote
              className="relative size-8 text-brand/60 sm:size-10"
              aria-hidden
            />
            <blockquote className="relative mt-5 font-display text-xl leading-snug text-fg sm:text-2xl md:text-3xl">
              {testimonial.quote}
            </blockquote>
            <figcaption className="relative mt-7 flex items-center gap-4 border-t border-border pt-5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-white/[0.04] text-sm font-semibold text-fg">
                {testimonial.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-fg sm:text-base">
                  {testimonial.author}
                </div>
                <div className="text-xs text-fg-subtle sm:text-sm">
                  {testimonial.role} · {testimonial.company}
                  {testimonial.context ? ` · ${testimonial.context}` : ""}
                </div>
              </div>
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${testimonial.author} auf LinkedIn`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-fg-muted transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}

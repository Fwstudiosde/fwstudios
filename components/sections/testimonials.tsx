import { Container, Section, Eyebrow } from "@/components/ui/container";
import { TESTIMONIALS } from "@/lib/content/testimonials";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <Section className="border-t border-border" id="testimonials">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Stimmen aus dem Markt</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Was unsere Kunden{" "}
            <span className="text-gradient-brand">über uns sagen.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t) => (
            <figure
              key={t.author}
              className="group relative rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-6 transition-all hover:border-border-strong"
            >
              <Quote className="size-6 text-brand/60" aria-hidden />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-fg">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-10 items-center justify-center rounded-full border border-border bg-white/[0.04] text-xs font-semibold text-fg">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-fg">{t.author}</div>
                  <div className="text-xs text-fg-subtle">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {TESTIMONIALS.length > 3 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.slice(3, 5).map((t) => (
              <figure
                key={t.author}
                className="group relative rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-6 transition-all hover:border-border-strong"
              >
                <Quote className="size-6 text-brand/60" aria-hidden />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-fg">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full border border-border bg-white/[0.04] text-xs font-semibold text-fg">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-fg">
                      {t.author}
                    </div>
                    <div className="text-xs text-fg-subtle">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

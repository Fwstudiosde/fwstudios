import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Flame } from "lucide-react";

export function PilotWhyFounding({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Warum jetzt</Eyebrow>
            <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </div>
          <ul className="mt-12 space-y-4 sm:mt-16">
            {points.map((p, i) => (
              <li
                key={p}
                className="flex items-start gap-4 rounded-2xl border border-border bg-white/[0.02] p-5 sm:p-6"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-display text-sm font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-fg-muted sm:text-base">
                  {p}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-fg-subtle">
            <Flame className="size-3.5 text-brand" aria-hidden />
            <span>
              Nach den 5 Plätzen gibt es das Founding-Angebot nicht mehr.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}

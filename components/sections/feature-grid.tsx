import type { LucideIcon } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  features: { icon: LucideIcon; title: string; body: string }[];
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-fg-muted">{description}</p>
          )}
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-bg p-7 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-white/[0.04] text-brand transition-all group-hover:border-brand/40 group-hover:shadow-[0_0_24px_-4px_rgba(0,212,255,0.4)]">
                <f.icon className="size-5" />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-fg">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

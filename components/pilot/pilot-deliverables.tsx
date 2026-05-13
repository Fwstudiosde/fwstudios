import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Check } from "lucide-react";
import type { PilotDeliverable } from "@/lib/content/pilot";

export function PilotDeliverables({
  title,
  deliverables,
}: {
  title: string;
  deliverables: PilotDeliverable[];
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Was Sie bekommen</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((d) => (
            <div
              key={d.title}
              className="group relative bg-bg p-7 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-brand/40 bg-brand/10 text-brand transition-all group-hover:shadow-[0_0_24px_-4px_rgba(0,212,255,0.4)]">
                <Check className="size-5" strokeWidth={2.5} />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-fg">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

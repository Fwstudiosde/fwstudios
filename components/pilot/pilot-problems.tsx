import { Container, Section, Eyebrow } from "@/components/ui/container";
import { AlertTriangle } from "lucide-react";
import type { PilotProblem } from "@/lib/content/pilot";

export function PilotProblems({
  title,
  problems,
}: {
  title: string;
  problems: PilotProblem[];
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Status quo</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-16 sm:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-danger/10 text-danger">
                <AlertTriangle className="size-4" />
              </div>
              <h3 className="font-display mt-4 text-base font-semibold text-fg">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

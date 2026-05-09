import { Container, Section, Eyebrow } from "@/components/ui/container";

export function Process({
  eyebrow = "Ablauf",
  title,
  steps,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  steps: { title: string; body: string }[];
}) {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-16">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <ul className="space-y-10">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative grid grid-cols-[40px_1fr] gap-4 md:grid-cols-2 md:gap-12"
              >
                <div
                  className={`flex md:contents ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`relative z-10 ${
                      i % 2 === 0 ? "md:text-right" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 ${
                        i % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand/40 bg-brand/10 font-display text-sm font-semibold text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-fg">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {s.body}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block" />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

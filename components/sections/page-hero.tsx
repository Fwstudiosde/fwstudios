import { Container, Eyebrow } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="orb left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 bg-brand/25"
        aria-hidden
      />
      <div
        className="orb right-[-15%] top-32 h-[400px] w-[400px] bg-accent-purple/25"
        aria-hidden
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            <span className="text-gradient">{title}</span>
            {highlight && (
              <>
                <br />
                <span className="text-gradient-brand">{highlight}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

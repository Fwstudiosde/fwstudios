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
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-40 sm:pb-16 md:pt-48">
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
          <h1 className="font-display mt-5 text-[2rem] font-semibold leading-[1.08] tracking-tight text-fg sm:mt-6 sm:text-5xl md:text-6xl">
            <span className="text-gradient">{title}</span>
            {highlight && (
              <>
                <br />
                <span className="text-gradient-brand">{highlight}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:mt-6 sm:text-lg">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

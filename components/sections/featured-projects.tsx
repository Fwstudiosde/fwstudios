import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { PROJECTS } from "@/lib/content/projects";

const ACCENT_GRADIENTS: Record<string, string> = {
  brand: "from-brand/30 to-brand-2/10",
  purple: "from-accent-purple/30 to-brand-3/10",
  orange: "from-warning/30 to-warning/5",
  green: "from-success/30 to-success/5",
};

export function FeaturedProjects() {
  const featured = PROJECTS.slice(0, 3);
  return (
    <Section className="border-t border-border" id="projekte">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <Eyebrow>Ausgewählte Cases</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Was wir{" "}
              <span className="text-gradient-brand">geliefert haben.</span>
            </h2>
          </div>
          <Link
            href="/projekte"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg"
          >
            Alle Projekte
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projekte/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.005] p-6 transition-all duration-300 hover:border-border-strong"
            >
              <div
                className={`absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br ${ACCENT_GRADIENTS[p.accent]} opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90`}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-border bg-bg/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
                    {p.category}
                  </span>
                  <ArrowUpRight className="size-4 text-fg-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                </div>
                <h3 className="font-display mt-5 text-lg font-semibold leading-snug text-fg">
                  {p.title}
                </h3>
                <div className="mt-1 text-xs text-fg-subtle">{p.client}</div>

                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-base font-semibold tracking-tight text-fg">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-fg-subtle">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

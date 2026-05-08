import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { PROJECTS, getProject } from "@/lib/content/projects";
import { Button } from "@/components/ui/button";
import { Container, Section, Eyebrow } from "@/components/ui/container";
import { CTA } from "@/components/sections/cta";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Projekt" };
  return {
    title: p.title,
    description: p.summary,
  };
}

export default async function ProjektDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="absolute inset-0 bg-grid" aria-hidden />
        <div
          className="orb left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 bg-brand/25"
          aria-hidden
        />
        <Container className="relative">
          <Link
            href="/projekte"
            className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-3.5" /> Alle Projekte
          </Link>
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <Eyebrow>{project.category}</Eyebrow>
              <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl md:text-6xl">
                <span className="text-gradient">{project.hero}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
                {project.summary}
              </p>
              {project.appHref && (
                <div className="mt-8">
                  <Button href={project.appHref} variant="brand" size="lg">
                    App-Seite ansehen
                    <ArrowUpRight className="size-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-white/[0.02] p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                Auf einen Blick
              </div>
              <dl className="mt-4 space-y-3">
                <Pair label={<Tag className="size-3.5" />} value={project.client} />
                <Pair
                  label={<Calendar className="size-3.5" />}
                  value={`${project.year}`}
                />
                <Pair
                  label={<Clock className="size-3.5" />}
                  value={project.duration}
                />
              </dl>
              <div className="mt-5 border-t border-border pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  Stack
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-white/[0.04] px-2 py-0.5 text-xs text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics strip */}
      <section className="border-y border-border bg-bg-subtle/40 py-10">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
                  <span className="text-gradient-brand">{m.value}</span>
                </div>
                <div className="mt-2 text-sm text-fg-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <Container size="sm">
          <div className="space-y-12">
            <Block title="Die Ausgangslage" body={project.problem} />
            <Block title="Unser Ansatz" body={project.solution} />
            <Block title="Das Ergebnis" body={project.outcome} />
          </div>
        </Container>
      </Section>

      {/* Other projects */}
      <Section className="border-t border-border">
        <Container>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-fg">
              Weitere Projekte
            </h2>
            <Link
              href="/projekte"
              className="text-sm text-fg-muted hover:text-fg"
            >
              Alle ansehen →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((p) => (
              <Link
                key={p.slug}
                href={`/projekte/${p.slug}`}
                className="group rounded-2xl border border-border bg-white/[0.02] p-6 transition-colors hover:border-border-strong hover:bg-white/[0.04]"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-fg-subtle">
                  {p.category}
                </div>
                <h3 className="font-display mt-2 text-xl font-semibold text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-fg-muted">{p.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-fg-muted">{body}</p>
    </div>
  );
}

function Pair({
  label,
  value,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex size-6 items-center justify-center rounded-md border border-border bg-white/[0.04] text-fg-muted">
        {label}
      </span>
      <span className="text-fg">{value}</span>
    </div>
  );
}

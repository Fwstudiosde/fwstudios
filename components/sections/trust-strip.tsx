import { PARTNERS } from "@/lib/content/partners";
import { Container } from "@/components/ui/container";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-bg-subtle/40 py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-fg-subtle">
          Vertraut von Teams in DACH
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 md:grid-cols-6">
          {PARTNERS.map((p) => (
            <div
              key={p.abbr}
              className="flex h-10 items-center justify-center rounded-md border border-border bg-white/[0.02] px-4 transition-colors hover:bg-white/[0.04]"
            >
              <span className="font-display text-sm font-semibold tracking-wider text-fg-muted">
                {p.abbr}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container, Section } from "@/components/ui/container";

const STATS = [
  { value: "7 Tage", label: "Time-to-Live" },
  { value: "40+", label: "Sprachen" },
  { value: "99.9%", label: "Uptime" },
  { value: "DSGVO", label: "konform" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-bg-subtle/40 py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <div className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

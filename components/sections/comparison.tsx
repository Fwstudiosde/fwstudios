import { Container, Section, Eyebrow } from "@/components/ui/container";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = "yes" | "no" | "partial" | string;

const ROWS: { feature: string; fw: Cell; agency: Cell; freelancer: Cell; diy: Cell }[] = [
  { feature: "Time-to-Live (Standard)", fw: "7 Tage", agency: "8–12 Wochen", freelancer: "4–8 Wochen", diy: "Monate" },
  { feature: "Festpreis", fw: "yes", agency: "no", freelancer: "partial", diy: "—" },
  { feature: "Eigenes Engineering-Team", fw: "yes", agency: "yes", freelancer: "no", diy: "no" },
  { feature: "KI-Spezialisierung", fw: "yes", agency: "partial", freelancer: "partial", diy: "no" },
  { feature: "DSGVO + EU-Hosting", fw: "yes", agency: "partial", freelancer: "partial", diy: "yes" },
  { feature: "Wartung & Weiterentwicklung", fw: "yes", agency: "yes", freelancer: "partial", diy: "no" },
  { feature: "Dedizierter Ansprechpartner", fw: "yes", agency: "no", freelancer: "yes", diy: "—" },
  { feature: "Code-Übergabe / kein Vendor-Lock", fw: "yes", agency: "no", freelancer: "yes", diy: "yes" },
];

function CellIcon({ value }: { value: Cell }) {
  if (value === "yes")
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-success/30 bg-success/10 text-success">
        <Check className="size-3.5" />
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-border bg-white/[0.02] text-fg-faint">
        <Minus className="size-3.5" />
      </span>
    );
  if (value === "partial")
    return (
      <span className="rounded-full border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
        teilweise
      </span>
    );
  return <span className="text-sm text-fg-muted">{value}</span>;
}

const COLUMNS: { key: "fw" | "agency" | "freelancer" | "diy"; label: string; recommended?: boolean }[] = [
  { key: "fw", label: "FWStudios", recommended: true },
  { key: "agency", label: "Klassische Agentur" },
  { key: "freelancer", label: "Freelancer" },
  { key: "diy", label: "DIY / Inhouse" },
];

export function Comparison() {
  return (
    <Section className="border-t border-border" id="vergleich">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Im Vergleich</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
            Warum FWStudios statt{" "}
            <span className="text-gradient-brand">der üblichen Wege?</span>
          </h2>
          <p className="mt-4 text-base text-fg-muted sm:text-lg">
            Eine ehrliche Gegenüberstellung — Sie entscheiden.
          </p>
        </div>

        {/* Mobile / small tablet: card-per-feature */}
        <div className="mt-10 grid gap-3 md:hidden">
          {ROWS.map((row) => (
            <div
              key={row.feature}
              className="rounded-2xl border border-border bg-white/[0.02] p-4"
            >
              <div className="text-sm font-semibold text-fg">{row.feature}</div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-lg border px-3 py-2",
                      col.recommended
                        ? "border-brand/30 bg-brand/[0.05]"
                        : "border-border bg-white/[0.02]"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs font-medium",
                        col.recommended ? "text-fg" : "text-fg-muted"
                      )}
                    >
                      {col.label}
                    </span>
                    <div className="shrink-0">
                      <CellIcon value={row[col.key]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tablet+ / desktop: comparison table */}
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-border bg-white/[0.02] md:mt-14 md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-white/[0.02]">
                  <th className="px-5 py-4 text-left font-medium text-fg-subtle"></th>
                  <th className="px-5 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand">
                        Empfohlen
                      </span>
                      <span className="font-display text-base font-semibold text-fg">
                        FWStudios
                      </span>
                    </div>
                  </th>
                  <th className="px-5 py-4 text-center font-display text-base font-semibold text-fg-muted">
                    Klassische Agentur
                  </th>
                  <th className="px-5 py-4 text-center font-display text-base font-semibold text-fg-muted">
                    Freelancer
                  </th>
                  <th className="px-5 py-4 text-center font-display text-base font-semibold text-fg-muted">
                    DIY / Inhouse
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={cn(i % 2 === 0 && "bg-white/[0.01]")}
                  >
                    <td className="px-5 py-4 text-fg">{row.feature}</td>
                    <td className="px-5 py-4 text-center">
                      <CellIcon value={row.fw} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CellIcon value={row.agency} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CellIcon value={row.freelancer} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <CellIcon value={row.diy} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </Section>
  );
}

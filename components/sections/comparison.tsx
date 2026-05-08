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

export function Comparison() {
  return (
    <Section className="border-t border-border" id="vergleich">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Im Vergleich</Eyebrow>
          <h2 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            Warum FWStudios statt{" "}
            <span className="text-gradient-brand">der üblichen Wege?</span>
          </h2>
          <p className="mt-4 text-lg text-fg-muted">
            Eine ehrliche Gegenüberstellung — Sie entscheiden.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-white/[0.02]">
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

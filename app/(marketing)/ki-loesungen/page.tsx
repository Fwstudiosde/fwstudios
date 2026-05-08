import {
  Bot,
  Cpu,
  Workflow,
  FileSearch,
  Plug,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";

export const metadata = {
  title: "KI-Lösungen",
  description:
    "Maßgeschneiderte KI-Workflows: RAG, Agents, Dokumentenanalyse und Prozess-Automatisierung für Unternehmen.",
};

export default function KiLoesungenPage() {
  return (
    <>
      <PageHero
        eyebrow="KI-Lösungen"
        title="Maßgeschneiderte"
        highlight="KI-Lösungen."
        description="Wir entwickeln KI-Workflows, die echte Engpässe in Ihrem Geschäft auflösen — von Dokumentenanalyse über Agents bis zu vollständig automatisierten Prozessen."
      >
        <Button href="/#kontakt" variant="brand" size="lg">
          Use-Case besprechen
        </Button>
        <Button href="/projekte" variant="secondary" size="lg">
          KI-Cases ansehen
        </Button>
      </PageHero>

      <FeatureGrid
        eyebrow="Was wir bauen"
        title={
          <>
            Sechs Bausteine —
            <br />
            <span className="text-gradient-brand">unbegrenzt kombinierbar.</span>
          </>
        }
        features={[
          {
            icon: Bot,
            title: "Custom Chatbots",
            body: "Domain-spezifische Assistenten mit RAG, Tool-Use und persistentem Gedächtnis.",
          },
          {
            icon: Workflow,
            title: "Workflow-Automatisierung",
            body: "Ende-zu-Ende-Automatisierung: Trigger, Decision-Logic, Aktionen, Monitoring.",
          },
          {
            icon: FileSearch,
            title: "Dokumentenanalyse",
            body: "Verträge, Rechnungen, PDFs strukturiert extrahieren — Audit-fest archiviert.",
          },
          {
            icon: Plug,
            title: "API & Integrationen",
            body: "Verbindung zu CRM, ERP, Zammad, Salesforce, HubSpot, internen Datenbanken.",
          },
          {
            icon: LineChart,
            title: "KI-Analytics",
            body: "Forecasts, Segmentierung, Anomalie-Erkennung — auf Ihren Daten, in Ihrem Stack.",
          },
          {
            icon: Cpu,
            title: "On-Premise / EU-Cloud",
            body: "Open-Source-Modelle in Ihrer Infrastruktur — kein Datenabfluss, volle Kontrolle.",
          },
        ]}
      />

      <Process
        title={
          <>
            So arbeiten wir —{" "}
            <span className="text-gradient-brand">vier Schritte.</span>
          </>
        }
        steps={[
          {
            title: "Discovery",
            body: "Kostenloser 30-Min-Call. Wir verstehen Ihren Use-Case und ob KI das richtige Werkzeug ist.",
          },
          {
            title: "Konzept & Festpreis",
            body: "Innerhalb einer Woche: technisches Konzept, Architektur, Festpreis-Angebot.",
          },
          {
            title: "Build",
            body: "Iteratives Bauen mit wöchentlichen Demos. Sie sehen jede Iteration, bevor sie live geht.",
          },
          {
            title: "Launch & Care",
            body: "Wir gehen produktiv und übernehmen Wartung, Monitoring und Weiterentwicklung.",
          },
        ]}
      />

      <CTA />
    </>
  );
}

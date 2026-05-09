export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "KI-Chatbot" | "KI-Lösung" | "Plattform" | "Mobile App";
  summary: string;
  hero: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  duration: string;
  year: number;
  accent: "brand" | "purple" | "orange" | "green";
  appHref?: string;
  externalHref?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "working-ben",
    title: "Working Ben — Job-Plattform mit umgedrehtem Prozess",
    client: "Working Ben (working-ben.de)",
    category: "Plattform",
    summary:
      "Komplett konzipierte und entwickelte Job-Matching-Plattform, die den klassischen Bewerbungsprozess umdreht — Unternehmen kommen auf passende Kandidat:innen zu, statt umgekehrt.",
    hero: "Statt sich bewerben — bewerben lassen.",
    problem:
      "Klassische Job-Portale verlangen Bewerbungs-Marathon: Lebensläufe schreiben, Anschreiben formulieren, hoffen. Wer bereits einen Job hat, will diesen Aufwand nicht. Unternehmen wiederum suchen Stunden in Datenbanken nach passenden Profilen.",
    solution:
      "Komplette Plattform — von Konzept und Informationsarchitektur über Branding bis zu Frontend, Backend und Hosting. Kandidat:innen pflegen ein schlankes Profil, Unternehmen erhalten kuratierte Matches. Der Bewerbungsprozess startet auf Augenhöhe statt mit Standard-Anschreiben.",
    outcome:
      "Eine schnelle, durchdachte Plattform, die Job-Matching auf den Kopf stellt — passive Kandidat:innen werden erreichbar, Unternehmen sparen den Recruiting-Aufwand klassischer Portale.",
    metrics: [
      { value: "End-to-end", label: "Konzept → Design → Code" },
      { value: "Match First", label: "Statt Bewerbungs-Marathon" },
      { value: "DACH", label: "Markt-Fokus" },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Tailwind", "Vercel"],
    duration: "Konzept + Entwicklung",
    year: 2026,
    accent: "brand",
    externalHref: "https://www.working-ben.de",
  },
  {
    slug: "frauenarzt-zentrum-giessen",
    title: "Interne KI-Prozessoptimierung im Frauenarzt-Zentrum",
    client: "Frauenarzt-Zentrum · Gießen",
    category: "KI-Lösung",
    summary:
      "Maßgeschneiderte interne KI-Systeme, die Routineaufgaben im Praxisalltag automatisieren und Ärzten und Personal mehr Zeit für Patientinnen verschaffen — DSGVO-konform und ohne Datenabfluss.",
    hero: "Weniger Verwaltung, mehr Patientinnen-Zeit — durch KI im Hintergrund.",
    problem:
      "Im Praxisalltag bindet Verwaltung — Akten-Recherche, Dokumentation, interne Korrespondenz, Termin-Triage — Stunden, die in der Patientinnen-Versorgung fehlen. Standard-Cloud-Tools können sensible Patientendaten nicht ohne Weiteres rechtssicher verarbeiten.",
    solution:
      "Interne KI-Workflows, individuell auf die Prozesse des Praxiszentrums zugeschnitten. Daten verlassen das Praxisumfeld nicht ungewollt; die KI integriert sich in die bestehende Software-Landschaft und unterstützt das Team direkt dort, wo Aufgaben anfallen.",
    outcome:
      "Spürbar entlastetes Team, schnellere Bearbeitung wiederkehrender Aufgaben und mehr Fokus auf das, was wirklich zählt: die Patientinnen.",
    metrics: [
      { value: "DSGVO-konform", label: "Patientendaten geschützt" },
      { value: "Maßgeschneidert", label: "Auf Praxis-Prozesse" },
      { value: "Interne Pipeline", label: "Daten bleiben sicher" },
    ],
    stack: ["Python", "Claude", "Postgres", "EU-Hosting", "n8n"],
    duration: "laufende Zusammenarbeit",
    year: 2026,
    accent: "green",
  },
  {
    slug: "liian-fashion-support",
    title: "KI-Support-Agent für LIIAN Damenbekleidung",
    client: "LIIAN — Damenbekleidung Onlineshop",
    category: "KI-Chatbot",
    summary:
      "KI-Agenten, die eingehende Kunden-E-Mails verstehen, kategorisieren und in der Markenstimme beantworten — von Größenberatung über Versandstatus bis Retouren.",
    hero: "Inbox auf Autopilot — höfliche, korrekte Antworten in Markenstimme.",
    problem:
      "Online-Shops im Mode-Segment haben hohes E-Mail-Volumen: Größenfragen, Lieferstatus, Retouren-Wünsche, Reklamationen. Standard-Auto-Replies wirken kalt, manuelle Beantwortung skaliert nicht und bindet das Team auch in Hochphasen.",
    solution:
      "KI-Agent, trainiert auf den LIIAN-Brand-Voice und die Produktdaten. Greift für Versandstatus auf das Shop-Backend zu, beantwortet Standardanfragen autonom und eskaliert nur unklare Fälle ans Team — mit vollständigem Audit-Log.",
    outcome:
      "Kundinnen erhalten innerhalb von Minuten passende Antworten in der LIIAN-Stimme — und das Team konzentriert sich auf Fälle, die wirklich Aufmerksamkeit brauchen.",
    metrics: [
      { value: "24/7", label: "Antwort innerhalb Minuten" },
      { value: "Brand-Voice", label: "Trainiert auf LIIAN-Tonalität" },
      { value: "EU-Hosting", label: "DSGVO-konform" },
    ],
    stack: ["Claude", "Next.js", "Postgres", "n8n", "Resend"],
    duration: "laufender Betrieb",
    year: 2026,
    accent: "purple",
  },
  {
    slug: "velos",
    title: "Velos — KI-Fitness-, Lauf- und Ernährungs-Coach",
    client: "FWStudios · Eigenprodukt",
    category: "Mobile App",
    summary:
      "Komplette Trainings-, Lauf- und Ernährungs-App. Free-Tier mit GPS-Lauftracker und kuratierten Programmen, Velos Pro mit personalisierten KI-Trainings- und Ernährungsplänen.",
    hero: "Personal Trainer, Lauf-Coach und Ernährungsberater — in einer App.",
    problem:
      "Wer ernsthaft trainiert, jongliert mit Workout-App, Lauf-Tracker und Ernährungs-Tagebuch. Personalisierte Pläne sind teuer, generische Pläne wirken nicht — und keiner adaptiert auf Performance, Recovery und Ziele.",
    solution:
      "Flutter-App mit Riverpod und dunklem Material-3-Design. Supabase-Backend in Frankfurt, GPS-Lauftracking via OpenStreetMap, KI-Pläne über Claude (Opus für strukturierte Plan-Generierung mit Tool-Use, Sonnet für Coach-Chat). Alle KI-Calls server-seitig in Edge Functions. Subscriptions plattformübergreifend via RevenueCat.",
    outcome:
      "Eine integrierte App, die Krafttraining, Ausdauer und Ernährung an einem Ort vereint — und mit Velos Pro adaptives KI-Coaching ohne Personal-Trainer-Preise liefert.",
    metrics: [
      { value: "Claude Opus + Sonnet", label: "KI-Coaching server-seitig" },
      { value: "iOS · Android · Web", label: "3 Plattformen, 1 Codebase" },
      { value: "EU-Hosting", label: "Supabase Frankfurt" },
    ],
    stack: ["Flutter", "Dart", "Supabase", "Claude (Anthropic)", "RevenueCat", "OpenStreetMap"],
    duration: "Eigenprodukt · laufend",
    year: 2026,
    accent: "brand",
  },
  {
    slug: "sparkoch",
    title: "SparKoch — KI-Koch-App, die Kühlschrank & Prospekte scannt",
    client: "FWStudios · Eigenprodukt",
    category: "Mobile App",
    summary:
      "iOS- und Android-App, die mit KI Lebensmittel im Kühlschrank erkennt, daraus Rezepte generiert und Supermarkt-Angebote aus Prospekten extrahiert.",
    hero: "Foto vom Kühlschrank — Rezept aus den passenden Angeboten.",
    problem:
      "Lebensmittel verderben, weil man vergisst, was im Kühlschrank steht. Gleichzeitig wandern Wochen-Prospekte ungelesen in den Müll, obwohl darin oft genau die Zutaten reduziert sind.",
    solution:
      "Flutter-App mit GPT-4-Vision-gestützter Bilderkennung für Lebensmittel und Prospekte, einer Rezept-Engine, die Match-Quoten zu vorhandenen Zutaten berechnet, und Supabase-Backend für Accounts, Familien-Sharing und Favoriten.",
    outcome:
      "Eine Eigen-App im Apple App Store und Google Play, mit Privacy-Manifest, EU-Hosting und Family-Mode für Haushalte.",
    metrics: [
      { value: "GPT-4 Vision", label: "Lebensmittel-Erkennung" },
      { value: "iOS + Android", label: "Native Stores" },
      { value: "EU-Hosting", label: "Supabase Frankfurt" },
    ],
    stack: ["Flutter", "Dart", "OpenAI Vision", "Supabase", "Riverpod", "App Store / Play Store"],
    duration: "Eigenprodukt · laufend",
    year: 2026,
    accent: "green",
    appHref: "/apps/sparkoch",
  },
  {
    slug: "peinlich-nicht-zu-wissen",
    title: "Peinlich nicht zu wissen — Quiz für deutsches Allgemeinwissen",
    client: "FWStudios · Eigenprodukt",
    category: "Mobile App",
    summary:
      "Quiz-App mit kuratierten Fragen, die man als Deutsche:r eigentlich wissen sollte — Geschichte, Politik, Geographie, Kultur, Wissenschaft und Sprache.",
    hero: "Das Allgemeinwissen, das man eigentlich kennen sollte — als Quiz.",
    problem:
      "Trivia-Apps sind voll mit beliebigem Wissen. Was fehlt: ein kuratierter Pool an Fragen rund um Verfassung, Geschichte, Geographie und Kultur, die für das Leben in Deutschland wirklich relevant sind.",
    solution:
      "Flutter-App mit handverlesenen Fragen in sechs Kategorien, Erklärungen zu jeder Antwort, Schnellrunde-Modus über alle Kategorien, klares Material-Design — komplett werbe-finanziert über interstitial Ads.",
    outcome:
      "Eine fokussierte, schnelle Quiz-App ohne Account-Zwang, mit klarer Rolle: Wissen auffrischen statt sammeln.",
    metrics: [
      { value: "162", label: "Kuratierte Fragen" },
      { value: "6", label: "Kategorien" },
      { value: "Kein Login", label: "Sofort losspielen" },
    ],
    stack: ["Flutter", "Dart", "Material 3", "Google Mobile Ads"],
    duration: "Eigenprodukt · laufend",
    year: 2026,
    accent: "orange",
    appHref: "/apps/peinlich-nicht-zu-wissen",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

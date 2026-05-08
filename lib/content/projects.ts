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
};

export const PROJECTS: Project[] = [
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
  {
    slug: "liian-chatbot",
    title: "KI-Chatbot, der Maklerleads automatisch qualifiziert",
    client: "LIIAN — Immobilienmakler",
    category: "KI-Chatbot",
    summary:
      "Auf der LIIAN-Website beantwortet der Bot Bewerterfragen, qualifiziert Verkaufsabsichten und übergibt heiße Leads direkt ins CRM.",
    hero: "Vom Webformular zur 24/7-Lead-Maschine — ohne mehr Personal.",
    problem:
      "Die Maklerei verlor Anfragen außerhalb der Bürozeiten. Bewerber-Anfragen mussten manuell vorqualifiziert werden, was Stunden pro Tag kostete.",
    solution:
      "Wir trainierten den FWStudios-Chatbot auf Objekt-Daten, FAQs und Bewerterprozess. Der Bot stellt 6 Qualifikationsfragen, schickt Termin-Vorschläge und legt Leads im CRM an.",
    outcome:
      "Mehr qualifizierte Anfragen, deutlich kürzere Reaktionszeit und eine spürbare Entlastung des Vertriebsteams.",
    metrics: [
      { value: "+138%", label: "Qualifizierte Leads / Monat" },
      { value: "<2 min", label: "Erstreaktion 24/7" },
      { value: "−12 h", label: "Manuelle Arbeit / Woche" },
    ],
    stack: ["Next.js", "Claude", "Supabase", "Resend", "n8n"],
    duration: "7 Tage",
    year: 2025,
    accent: "brand",
  },
  {
    slug: "saas-platform",
    title: "Productized SaaS für ein B2B-Tooling-Startup",
    client: "Stealth-Startup",
    category: "Plattform",
    summary:
      "Komplette SaaS-Plattform mit Auth, Teams, Stripe-Abrechnung und Admin-Dashboard — vom Whiteboard zum Launch in 6 Wochen.",
    hero: "Vom Pitch-Deck zur produktiven SaaS — in 6 Wochen.",
    problem:
      "Der Gründer hatte Markt und Vision, aber kein Engineering-Team. Time-to-first-paying-customer war kritisch, um die Pre-Seed-Runde zu validieren.",
    solution:
      "Wir bauten die Plattform auf Next.js mit Postgres, Stripe-Subscriptions, Multi-Tenant-Auth und einem internen Admin. Iterative wöchentliche Demos.",
    outcome:
      "Launch nach 6 Wochen, erste zahlende Kunden in Woche 7, Pre-Seed geschlossen.",
    metrics: [
      { value: "6 Wochen", label: "Time-to-Launch" },
      { value: "12", label: "Zahlende Kunden in Woche 7" },
      { value: "Pre-Seed", label: "Geschlossen" },
    ],
    stack: ["Next.js", "Postgres", "Stripe", "Vercel", "Resend"],
    duration: "6 Wochen",
    year: 2025,
    accent: "purple",
  },
  {
    slug: "doc-ai",
    title: "Dokumenten-KI für Versicherungs-Backoffice",
    client: "Versicherungs-Mittelstand",
    category: "KI-Lösung",
    summary:
      "Vertrags- und Schadensdokumente werden von einer KI-Pipeline klassifiziert, extrahiert und an das interne ERP übergeben.",
    hero: "Manuelles Vertippen war einmal — KI extrahiert sauber.",
    problem:
      "Backoffice-Mitarbeitende tippten Daten aus PDFs in Excel und Salesforce. Hohe Fehlerquote, hohe Kosten.",
    solution:
      "RAG-Pipeline mit Claude für Klassifikation, dokumentenstrukturierte Extraktion und Validierung gegen Geschäftsregeln. Audit-Log inklusive.",
    outcome:
      "Drastische Beschleunigung beim Verarbeiten von Dokumenten und deutlich weniger Fehler im Datenbestand.",
    metrics: [
      { value: "−83%", label: "Bearbeitungszeit / Dokument" },
      { value: "99.4%", label: "Extraktions-Genauigkeit" },
      { value: "EU-Hosting", label: "DSGVO-konform" },
    ],
    stack: ["Python", "Claude", "Postgres", "Hetzner", "S3-kompatibel"],
    duration: "8 Wochen",
    year: 2024,
    accent: "green",
  },
  {
    slug: "mobile-loyalty-app",
    title: "Loyalty-App für eine Premium-Bäckerei-Kette",
    client: "Bäckerei-Kette · DACH",
    category: "Mobile App",
    summary:
      "Native iOS- und Android-App mit Punkte-Sammlung, Mobile-Order, Filialfinder und Push-Kampagnen.",
    hero: "Die App, die deine Stammkunden auch online stammkundig macht.",
    problem:
      "Die Kette verlor jüngere Kunden an Lieferdienste. Klassische Kundenkarten wurden nicht mehr genutzt.",
    solution:
      "React-Native-App mit Stempelpässen, In-App-Order, Push-Kampagnen und Backend-Integration zum Kassensystem. Apple Wallet & Google Wallet inklusive.",
    outcome:
      "Über 40k Downloads in 3 Monaten und ein deutlich höherer Wiederbesuch innerhalb der ersten 30 Tage.",
    metrics: [
      { value: "40k+", label: "Downloads in 90 Tagen" },
      { value: "+27%", label: "Wiederbesuche / Kunde" },
      { value: "4.7 ★", label: "App-Store-Rating" },
    ],
    stack: ["React Native", "Expo", "Supabase", "OneSignal", "Stripe"],
    duration: "10 Wochen",
    year: 2025,
    accent: "orange",
  },
  {
    slug: "internal-ops-platform",
    title: "Internes Operations-Dashboard mit KI-Insights",
    client: "E-Commerce · Fashion",
    category: "Plattform",
    summary:
      "Ein zentrales Dashboard, das Bestand, Umsatz, Marketing-KPIs und Vorhersagen aus 9 Datenquellen zusammenführt.",
    hero: "Eine Wahrheit. Neun Datenquellen. Live im Browser.",
    problem:
      "Geschäftsführung hatte 4 verschiedene Reportings aus Shopify, Meta, Google, ERP — keines davon stimmte mit dem anderen überein.",
    solution:
      "Datenpipeline mit täglichen ETLs, ein Dashboard mit Custom-Charts und KI-gestützter Anomalie-Erkennung. Forecasts pro Produktkategorie.",
    outcome:
      "Schnellere Reaktion auf Bestandsengpässe und ein einziges, verlässliches Reporting-System statt vier konkurrierender Quellen.",
    metrics: [
      { value: "−4 h", label: "Reporting-Aufwand / Woche" },
      { value: "9 → 1", label: "Datenquellen vereinheitlicht" },
      { value: "Realtime", label: "Statt Tagesbericht" },
    ],
    stack: ["Next.js", "Postgres", "dbt", "Recharts", "Claude"],
    duration: "12 Wochen",
    year: 2024,
    accent: "brand",
  },
  {
    slug: "mobile-fitness-coach",
    title: "KI-Fitness-Coach als Mobile-App",
    client: "Personal-Coach-Studio",
    category: "Mobile App",
    summary:
      "Mobile-App mit personalisierten Trainingsplänen, KI-Coaching, Video-Tutorials und Apple-Health-Integration.",
    hero: "Den Personal-Trainer in die Hosentasche gepackt.",
    problem:
      "Coach konnte nicht skalieren — jeder neue Kunde bedeutete eine 1:1-Stunde pro Woche.",
    solution:
      "App mit adaptiven Trainingsplänen (Claude), Video-Bibliothek, Workout-Tracking und Apple-Health-Sync. Premium-Features per In-App-Purchase.",
    outcome:
      "Die App ermöglichte dem Coach, deutlich mehr Kunden parallel zu betreuen, ohne neue 1:1-Slots öffnen zu müssen.",
    metrics: [
      { value: "8×", label: "Mehr Kunden / Coach" },
      { value: "73%", label: "30-Tage-Retention" },
      { value: "iOS + Android", label: "Native Apps" },
    ],
    stack: ["React Native", "Claude", "RevenueCat", "Supabase"],
    duration: "9 Wochen",
    year: 2025,
    accent: "purple",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

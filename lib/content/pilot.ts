import type { PilotSlug } from "@/lib/storage";

export type PilotProblem = { title: string; body: string };
export type PilotDeliverable = { title: string; body: string };
export type PilotProcessStep = { title: string; body: string };
export type PilotFaq = { q: string; a: string };

export type PilotContent = {
  slug: PilotSlug;
  shortLabel: string;
  pilotLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubline: string;
  primaryCta: string;
  secondaryCta: string;
  bannerPhrase: string;
  problemsTitle: string;
  problems: PilotProblem[];
  deliverablesTitle: string;
  deliverables: PilotDeliverable[];
  offerNote: string;
  offerInclude: string[];
  offerExclude: string[];
  processTitle: string;
  process: PilotProcessStep[];
  whyFoundingTitle: string;
  whyFoundingPoints: string[];
  faqTitle: string;
  faq: PilotFaq[];
  calLink: string;
  calTopic: string;
};

export const PILOT_CONTENT: Record<PilotSlug, PilotContent> = {
  plattform: {
    slug: "plattform",
    shortLabel: "Plattform",
    pilotLabel: "Plattform-Projekte",
    heroEyebrow: "Founding-Programm · Plattform-Entwicklung",
    heroTitle: "Ihre eigene Plattform —",
    heroHighlight: "in 8 Wochen produktiv.",
    heroSubline:
      "Wir bauen Web- und SaaS-Plattformen, die echte Engpässe in Ihrem Geschäft lösen. Nicht noch ein Theme-Baukasten. Sondern produktive Software, die mit Ihrem Geschäft wächst.",
    primaryCta: "Pilot-Platz sichern",
    secondaryCta: "Was bekomme ich konkret?",
    bannerPhrase: "Founding-Programm · Plattform-Projekte · 50 % Setup-Vorteil",
    problemsTitle: "Sie kennen das.",
    problems: [
      {
        title: "Excel ist an seiner Grenze.",
        body: "Workflows, die täglich laufen, leben in 12 verschiedenen Sheets, Mails und Köpfen. Jeder Urlaub wird zum Risiko.",
      },
      {
        title: "Standard-Tools passen 70 %.",
        body: "HubSpot, Notion, Airtable — alle gut. Aber sie zwingen Ihr Geschäft in fremde Logik. Die letzten 30 % kosten am meisten Zeit.",
      },
      {
        title: "Agenturen verkaufen WordPress.",
        body: "Sie brauchen kein weiteres Theme. Sie brauchen ein System, das exakt Ihre Prozesse abbildet — wartbar, performant, in der EU gehostet.",
      },
    ],
    deliverablesTitle: "Das bekommen Sie konkret.",
    deliverables: [
      {
        title: "Maßgeschneiderte Web-Plattform",
        body: "Next.js, TypeScript, Postgres. Designsystem in Ihrer Marke, nicht Bootstrap-Look.",
      },
      {
        title: "Login, Rollen, Teams",
        body: "Auth, Berechtigungen, Audit-Logs — production-grade ab Tag 1.",
      },
      {
        title: "Stripe-Billing oder interne Abrechnung",
        body: "Subscriptions, Einmalzahlungen, Rechnungen — out of the box.",
      },
      {
        title: "Eigene Datenbank, eigene API",
        body: "Postgres + REST/tRPC. Keine Lock-Ins. Sie können jederzeg exportieren.",
      },
      {
        title: "Hosting, CI/CD, Monitoring",
        body: "Vercel oder Hetzner. Automatische Backups, Logs, Uptime-Alerts.",
      },
      {
        title: "DSGVO + EU-Hosting",
        body: "Alle Daten in der EU. AVV inklusive. Audit-Logs auf Wunsch.",
      },
    ],
    offerNote:
      "Sie zahlen die Hälfte des regulären Setup-Preises. Im Gegenzug nutzen wir das Projekt als Referenz-Case (anonymisiert auf Wunsch).",
    offerInclude: [
      "Komplette Plattform-Entwicklung",
      "Eigenes UI-Design (kein Template)",
      "Discovery-Workshop & Architektur-Konzept",
      "Hosting-Setup & SSL",
      "30 Tage Hyper-Care nach Launch",
      "Quellcode-Übergabe (Sie bleiben Eigentümer)",
    ],
    offerExclude: [
      "Native Mobile-App (separates Projekt)",
      "Komplexe Integrationen mit > 3 externen Systemen",
      "Inhalte (Texte, Bilder) — die liefern Sie",
    ],
    processTitle: "Vom Kick-off zum Launch.",
    process: [
      {
        title: "Tag 1 — Discovery-Call",
        body: "30 Minuten. Wir verstehen Ihr Geschäft und prüfen, ob das Pilot-Programm passt.",
      },
      {
        title: "Woche 1 — Konzept & Festpreis",
        body: "Architektur-Skizze, User-Stories, Festpreis-Angebot. Sie entscheiden ohne Risiko.",
      },
      {
        title: "Woche 2 — UI-Design im Figma",
        body: "Komplettes Design vor jedem Code. Freigabe-Workflow, klare Iterationen.",
      },
      {
        title: "Woche 3–7 — Build & wöchentliche Demos",
        body: "Sie testen auf Staging, wir korrigieren früh. Keine Black-Box-Entwicklung.",
      },
      {
        title: "Woche 8 — Launch",
        body: "Domain, SSL, Monitoring, Backups. Wir bleiben 30 Tage im Standby.",
      },
    ],
    whyFoundingTitle: "Warum wir nur 5 Pilotkunden suchen.",
    whyFoundingPoints: [
      "Wir bauen Referenz-Cases statt Anzeigen zu schalten — und gestalten dafür die ersten 5 Projekte gemeinsam mit Founding-Kunden.",
      "Jeder Pilotkunde bekommt 50 % Setup-Vorteil — als Gegenleistung dürfen wir das Projekt als Case-Study nutzen (anonymisiert möglich).",
      "Nach den 5 Plätzen gilt der reguläre Preis. Keine Verlängerung, keine zweite Welle.",
      "Sie arbeiten direkt mit den Gründern — keine Account-Manager, keine Eskalationsstufen.",
    ],
    faqTitle: "Häufige Fragen.",
    faq: [
      {
        q: "Was kostet die Plattform regulär — und wieviel spare ich?",
        a: "Der genaue Festpreis hängt vom Scope ab und wird nach dem Discovery-Call innerhalb von 7 Tagen geliefert. Als Pilotkunde sparen Sie 50 % auf den Setup-Anteil. Wir nennen Ihnen vor Vertragsunterschrift beide Zahlen — den regulären Preis und Ihren Pilot-Preis.",
      },
      {
        q: "Was heißt 'Founding-Kunde' konkret?",
        a: "Sie bekommen den 50 %-Setup-Vorteil und dürfen unsere volle Aufmerksamkeit erwarten. Wir bekommen dafür einen Referenz-Case — mit Logo, kurzer Story und idealerweise einem Statement. Auf Wunsch alles anonymisiert.",
      },
      {
        q: "Wir haben kein finales Konzept. Geht das trotzdem?",
        a: "Ja. Der Discovery-Workshop ist Teil des Programms. Wir helfen, das Konzept zu schärfen, bevor wir den Festpreis nennen.",
      },
      {
        q: "Wem gehört der Code am Ende?",
        a: "Ihnen. Sie bekommen volles Eigentum am Quellcode. Keine Lizenz-Hooks, keine Lock-Ins.",
      },
      {
        q: "Was passiert nach 30 Tagen Hyper-Care?",
        a: "Sie können weiter mit uns arbeiten (Wartung, Weiterentwicklung), aber Sie müssen nicht. Sie sind frei, intern oder mit jeder anderen Agentur weiterzumachen.",
      },
    ],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PILOT_PLATTFORM ?? "fwstudios/30min",
    calTopic: "Pilot Plattform-Entwicklung",
  },
  chatbot: {
    slug: "chatbot",
    shortLabel: "Chatbot",
    pilotLabel: "KI-Chatbot Projekte",
    heroEyebrow: "Founding-Programm · KI-Chatbot",
    heroTitle: "Ein KI-Chatbot, der",
    heroHighlight: "Ihre Website verkauft.",
    heroSubline:
      "Trainiert auf Ihre Inhalte, antwortet 24/7 in der Sprache Ihres Kunden, fängt Leads ein und triggert Workflows. Live in 7 Tagen — und konvertiert ab Woche zwei.",
    primaryCta: "Pilot-Platz sichern",
    secondaryCta: "Was bekomme ich konkret?",
    bannerPhrase: "Founding-Programm · KI-Chatbot Projekte · 50 % Setup-Vorteil",
    problemsTitle: "Warum jetzt.",
    problems: [
      {
        title: "Ihre Website antwortet nicht.",
        body: "Besucher kommen, suchen, finden nicht — und gehen. Sie sehen das in der Analytics nur als Absprung.",
      },
      {
        title: "Standard-Chatbots klingen wie Standard.",
        body: "Ein generischer 'Hallo, wie kann ich helfen?'-Bot überzeugt niemanden mehr. Ihre Kunden wollen Substanz, nicht Skript.",
      },
      {
        title: "Leads versanden in Email-Pingpong.",
        body: "Anfrage → 24h Wartezeit → Erstkontakt → 3 Mails später Termin. In dem Fenster ist die Hälfte schon woanders.",
      },
    ],
    deliverablesTitle: "Das bekommen Sie konkret.",
    deliverables: [
      {
        title: "Auf Ihre Marke trainiert",
        body: "Wir crawlen Ihre Website, embedden die Inhalte. Der Bot antwortet in Ihrem Ton — nie generisch.",
      },
      {
        title: "Backend-Integration",
        body: "Datenbank-Lookups, CRM-Eintrag, Order-Status. Der Bot weiß mehr als nur Marketing-Text.",
      },
      {
        title: "Email- & Termin-Workflows",
        body: "Bot bucht Termine direkt, eröffnet Tickets, löst Email-Sequenzen aus.",
      },
      {
        title: "Lead-Capture mit Qualifizierung",
        body: "Heiße Leads gehen direkt in Ihr CRM — mit Kontext, was der Kunde wirklich wollte.",
      },
      {
        title: "Analytics-Dashboard",
        body: "Conversion-Themen, Engpässe, Trends in Echtzeit. Sie wissen, was wirkt.",
      },
      {
        title: "40+ Sprachen, EU-Hosting",
        body: "Automatische Spracherkennung. Alle Daten in der EU, DSGVO-konform.",
      },
    ],
    offerNote:
      "Sie zahlen die Hälfte des regulären Setup-Preises. Im Gegenzug nutzen wir das Projekt als Referenz-Case (anonymisiert auf Wunsch).",
    offerInclude: [
      "Vollständiger Bot-Setup auf Ihrer Website",
      "Training auf Ihren Inhalten + Branding",
      "Backend-Anbindung (1 System inklusive)",
      "Analytics-Dashboard mit Login",
      "Email/Termin-Workflow-Trigger",
      "30 Tage Tuning nach Launch",
    ],
    offerExclude: [
      "Komplexe Custom-AI-Modelle (separates Projekt)",
      "Mehr als 1 Backend-System (auf Anfrage)",
      "Telefon-/Voice-Bots",
    ],
    processTitle: "Vom Onboarding zum Launch — in 7 Tagen.",
    process: [
      {
        title: "Tag 1 — Onboarding",
        body: "Kick-off-Call, Zugänge, Branding-Briefing. Wir starten den Website-Crawl.",
      },
      {
        title: "Tag 2–4 — Training & Tuning",
        body: "Wir trainieren das Modell, justieren Persönlichkeit und Antwortverhalten.",
      },
      {
        title: "Tag 5 — Integration",
        body: "Widget-Embed, Backend-Endpoints, Email-Trigger. Sie testen auf Staging.",
      },
      {
        title: "Tag 6–7 — Go Live",
        body: "Analytics-Dashboard, Schulung, Launch. Wir bleiben im Standby.",
      },
    ],
    whyFoundingTitle: "Warum wir nur 5 Pilotkunden suchen.",
    whyFoundingPoints: [
      "Wir bauen Referenz-Cases statt Anzeigen zu schalten — und gestalten dafür die ersten 5 Bots gemeinsam mit Founding-Kunden.",
      "Jeder Pilotkunde bekommt 50 % Setup-Vorteil — als Gegenleistung dürfen wir das Projekt als Case-Study nutzen (anonymisiert möglich).",
      "Nach den 5 Plätzen gilt der reguläre Preis. Keine Verlängerung, keine zweite Welle.",
      "Sie arbeiten direkt mit den Gründern — kein Junior, keine Tickets.",
    ],
    faqTitle: "Häufige Fragen.",
    faq: [
      {
        q: "Wieviel kostet der Bot regulär?",
        a: "Setup-Gebühr je nach Komplexität, plus monatlicher Betrieb. Als Pilotkunde sparen Sie 50 % auf den Setup-Anteil. Wir nennen Ihnen vor Vertragsunterschrift beide Zahlen.",
      },
      {
        q: "Können wir wirklich in 7 Tagen live?",
        a: "Ja — vorausgesetzt, Sie liefern am Tag 1 Zugänge und Branding-Material. Wir haben den Prozess fünf Mal durchlaufen, das Tempo ist real.",
      },
      {
        q: "Was ist mit Halluzinationen?",
        a: "Der Bot ist RAG-basiert auf Ihren Inhalten. Er sagt explizit 'das weiß ich nicht', wenn er die Antwort nicht in Ihren Daten findet, statt zu erfinden.",
      },
      {
        q: "DSGVO?",
        a: "EU-Hosting, AVV inklusive, keine Datennutzung für Modell-Training durch Anbieter. Audit-Logs auf Wunsch.",
      },
      {
        q: "Was passiert nach den 30 Tagen Tuning?",
        a: "Sie können den Bot weiter mit uns betreiben (Monatsgebühr) oder Setup übernehmen. Sie sind frei.",
      },
    ],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PILOT_CHATBOT ?? "fwstudios/30min",
    calTopic: "Pilot KI-Chatbot",
  },
  app: {
    slug: "app",
    shortLabel: "Mobile-Apps",
    pilotLabel: "App-Projekte",
    heroEyebrow: "Founding-Programm · Mobile-App-Entwicklung",
    heroTitle: "Native Apps,",
    heroHighlight: "für iOS & Android.",
    heroSubline:
      "React Native + Expo. Eine Codebase, zwei native Apps. Vom MVP zum App-Store-Launch in 8–12 Wochen — mit echtem Business-Wert, nicht nur einer hübschen UI.",
    primaryCta: "Pilot-Platz sichern",
    secondaryCta: "Was bekomme ich konkret?",
    bannerPhrase: "Founding-Programm · App-Projekte · 50 % Setup-Vorteil",
    problemsTitle: "Warum jetzt.",
    problems: [
      {
        title: "Native-Agenturen sind zu teuer.",
        body: "Klassisch zwei getrennte Apps (Swift + Kotlin) bedeutet zwei Teams, doppelte Wartung, sechsstellige Budgets. Für 90 % der Geschäftsmodelle Overkill.",
      },
      {
        title: "Low-Code-Apps fühlen sich an wie Low-Code.",
        body: "Spätestens beim ersten 'Push-Notification mit Custom-Payload' oder 'In-App-Purchase' stößt jeder Baukasten an seine Grenze.",
      },
      {
        title: "App-Store-Submission ist ein Minenfeld.",
        body: "Apple und Google haben dutzende Richtlinien, die jährlich strenger werden. Eine abgelehnte Submission verliert Wochen.",
      },
    ],
    deliverablesTitle: "Das bekommen Sie konkret.",
    deliverables: [
      {
        title: "iOS + Android in einer Codebase",
        body: "React Native + Expo. Native Performance, halbierte Wartungskosten.",
      },
      {
        title: "Push-Notifications & Deeplinks",
        body: "OneSignal/Firebase. Segmentierte Kampagnen, In-App-Messages, Reaktivierung.",
      },
      {
        title: "In-App-Purchases",
        body: "Stripe oder RevenueCat. Subscriptions, Free Trials, Family Sharing.",
      },
      {
        title: "Backend & Auth",
        body: "Supabase oder eigenes Backend. Login, Profile, Synchronisation.",
      },
      {
        title: "App-Store-Submission",
        body: "ASO, Screenshots, Beschreibungen, Review-Begleitung. Wir landen die App.",
      },
      {
        title: "OTA-Updates",
        body: "EAS Update — Bugfixes in Minuten live, ohne neue Store-Review.",
      },
    ],
    offerNote:
      "Sie zahlen die Hälfte des regulären Setup-Preises. Im Gegenzug nutzen wir das Projekt als Referenz-Case (anonymisiert auf Wunsch).",
    offerInclude: [
      "Komplette App-Entwicklung iOS + Android",
      "UI-Design (kein Standard-Template)",
      "Backend, Auth, Datenbank",
      "App-Store + Play-Store Submission",
      "30 Tage Hyper-Care nach Launch",
      "Quellcode-Übergabe",
    ],
    offerExclude: [
      "Komplexe AR/VR-Features",
      "Native-Only-Features die Expo nicht abdeckt (separates Quoting)",
      "Werbe-Budget für Launch-Kampagne",
    ],
    processTitle: "Von der Idee zum Store-Launch.",
    process: [
      {
        title: "Tag 1 — Discovery-Call",
        body: "30 Minuten. Wir prüfen User-Flow, Markt und ob Pilot-Programm passt.",
      },
      {
        title: "Woche 1 — Spec & Festpreis",
        body: "User-Stories, Wireframes, Architektur. Festpreis-Angebot binnen 7 Tagen.",
      },
      {
        title: "Woche 2 — UI-Design im Figma",
        body: "Komplettes UI inkl. App-Store-Assets. Freigabe vor jedem Code.",
      },
      {
        title: "Woche 3–10 — Build & TestFlight",
        body: "Wöchentliche Builds auf Ihr iPhone via TestFlight / Play Console.",
      },
      {
        title: "Woche 11–12 — Submission & Launch",
        body: "App-Store-Review-Begleitung, Launch, 30 Tage Hyper-Care.",
      },
    ],
    whyFoundingTitle: "Warum wir nur 5 Pilotkunden suchen.",
    whyFoundingPoints: [
      "Wir bauen Referenz-Cases statt Anzeigen zu schalten — und gestalten dafür die ersten 5 Apps gemeinsam mit Founding-Kunden.",
      "Jeder Pilotkunde bekommt 50 % Setup-Vorteil — als Gegenleistung dürfen wir das Projekt als Case-Study nutzen (anonymisiert möglich).",
      "Nach den 5 Plätzen gilt der reguläre Preis. Keine Verlängerung, keine zweite Welle.",
      "Sie arbeiten direkt mit den Gründern — keine Account-Manager, keine Eskalationsstufen.",
    ],
    faqTitle: "Häufige Fragen.",
    faq: [
      {
        q: "Wieviel kostet die App regulär?",
        a: "Der genaue Festpreis hängt vom Scope ab und wird nach dem Discovery-Call innerhalb von 7 Tagen geliefert. Als Pilotkunde sparen Sie 50 % auf den Setup-Anteil. Wir nennen Ihnen vor Vertragsunterschrift beide Zahlen.",
      },
      {
        q: "React Native vs. Native — was ist der Trade-off?",
        a: "Für 90 % der Business-Apps ist React Native nicht zu unterscheiden von Native. Performance, Animationen, Hardware-Zugriff funktionieren genauso. Sie sparen ~40 % Entwicklungs- und Wartungskosten. Wenn Sie aber AAA-Games oder schwergewichtige AR-Apps bauen, sagen wir das offen.",
      },
      {
        q: "Was ist mit App-Store-Ablehnung?",
        a: "Wir kennen die häufigsten Stolperfallen. In über 30 Submissions bisher kein Hard-Reject. Sollte es passieren, kümmern wir uns um die Antwort an Apple/Google.",
      },
      {
        q: "Wem gehört der Code?",
        a: "Ihnen. Quellcode-Übergabe inklusive. Sie bleiben Eigentümer.",
      },
      {
        q: "Was passiert nach 30 Tagen Hyper-Care?",
        a: "Sie können mit uns weiterarbeiten (Wartungs-Vertrag) oder die App intern übernehmen. Keine Verpflichtung.",
      },
    ],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PILOT_APP ?? "fwstudios/30min",
    calTopic: "Pilot App-Entwicklung",
  },
  ki: {
    slug: "ki",
    shortLabel: "KI-Lösungen",
    pilotLabel: "KI-Workflow Projekte",
    heroEyebrow: "Founding-Programm · KI-Lösungen",
    heroTitle: "KI-Workflows, die",
    heroHighlight: "echte Arbeit übernehmen.",
    heroSubline:
      "Dokumentenanalyse, Agents, Prozess-Automatisierung. Wir bauen KI-Lösungen, die spürbar Zeit sparen — nicht nur Demo-Material für die nächste Tech-Messe.",
    primaryCta: "Pilot-Platz sichern",
    secondaryCta: "Was bekomme ich konkret?",
    bannerPhrase: "Founding-Programm · KI-Workflow Projekte · 50 % Setup-Vorteil",
    problemsTitle: "Warum jetzt.",
    problems: [
      {
        title: "KI-Pilots versanden im Sand.",
        body: "Viele Unternehmen probieren ChatGPT, basteln ein Notebook, präsentieren es einmal — und nichts läuft je produktiv.",
      },
      {
        title: "Generische Tools lösen Spezifisches nicht.",
        body: "Ihre Verträge, Ihre Kunden-Tickets, Ihre Doku — alles zu speziell für eine off-the-shelf-Lösung. Aber zu wenig, um eigene Modelle zu trainieren.",
      },
      {
        title: "Datenschutz blockiert.",
        body: "Sobald Daten in US-Clouds landen, blockt der Compliance-Officer. Verständlich — aber lähmend.",
      },
    ],
    deliverablesTitle: "Das bekommen Sie konkret.",
    deliverables: [
      {
        title: "Custom RAG-Workflow",
        body: "Domain-spezifischer Assistent mit Tool-Use, Memory und Audit-Trail.",
      },
      {
        title: "Dokumentenanalyse",
        body: "Verträge, Rechnungen, PDFs strukturiert extrahieren. Validiert, archiviert.",
      },
      {
        title: "Prozess-Automatisierung",
        body: "Trigger → Decision-Logic → Aktionen → Monitoring. Ende-zu-Ende, beobachtbar.",
      },
      {
        title: "API & Integrationen",
        body: "Verbindung zu CRM, ERP, Ticketing, internen DBs. Echte Workflows, nicht Demo-Magie.",
      },
      {
        title: "On-Premise oder EU-Cloud",
        body: "Open-Source-Modelle in Ihrer Infrastruktur — kein Datenabfluss, volle Kontrolle.",
      },
      {
        title: "Analytics & Monitoring",
        body: "Sie sehen, was der Workflow tut, wieviel er einspart und wo Modelle Hilfe brauchen.",
      },
    ],
    offerNote:
      "Sie zahlen die Hälfte des regulären Setup-Preises. Im Gegenzug nutzen wir das Projekt als Referenz-Case (anonymisiert auf Wunsch).",
    offerInclude: [
      "Discovery-Workshop & Use-Case-Validierung",
      "Custom-Workflow-Entwicklung",
      "Integration in ein bestehendes System",
      "Monitoring & Logging-Setup",
      "30 Tage Tuning nach Go-Live",
      "Übergabe inkl. Doku",
    ],
    offerExclude: [
      "Training eigener Foundation-Models",
      "GPU-Infrastruktur-Kauf",
      "Mehrere parallele Use-Cases im selben Sprint",
    ],
    processTitle: "Vom Use-Case zum produktiven Workflow.",
    process: [
      {
        title: "Tag 1 — Discovery-Call",
        body: "30 Minuten. Wir prüfen Use-Case, Datenlage und ob Pilot-Programm passt.",
      },
      {
        title: "Woche 1 — Konzept & Festpreis",
        body: "Architektur, Modell-Auswahl, Festpreis-Angebot. Klare Erwartungen.",
      },
      {
        title: "Woche 2–4 — Build & Demos",
        body: "Wöchentliche Demos, Sie testen mit echten Daten auf Staging.",
      },
      {
        title: "Woche 5 — Integration & Launch",
        body: "Anbindung an Ihr System, Monitoring, Schulung.",
      },
      {
        title: "30 Tage Tuning",
        body: "Wir beobachten Live-Daten und tunen Modell + Workflow nach.",
      },
    ],
    whyFoundingTitle: "Warum wir nur 5 Pilotkunden suchen.",
    whyFoundingPoints: [
      "Wir bauen Referenz-Cases statt Anzeigen zu schalten — und gestalten dafür die ersten 5 Workflows gemeinsam mit Founding-Kunden.",
      "Jeder Pilotkunde bekommt 50 % Setup-Vorteil — als Gegenleistung dürfen wir das Projekt als Case-Study nutzen (anonymisiert möglich).",
      "Nach den 5 Plätzen gilt der reguläre Preis. Keine Verlängerung, keine zweite Welle.",
      "Sie arbeiten direkt mit den Gründern — keine Junior-Berater, keine Slide-Decks.",
    ],
    faqTitle: "Häufige Fragen.",
    faq: [
      {
        q: "Wir wissen noch nicht genau, welcher Use-Case sich lohnt. Hilft das?",
        a: "Ja. Der Discovery-Workshop ist Teil des Programms. Wir helfen, einen Use-Case zu finden, der spürbar Zeit oder Geld spart — und sagen offen, wenn KI nicht das richtige Werkzeug ist.",
      },
      {
        q: "Können wir die Modelle on-premise betreiben?",
        a: "Ja. Wir setzen primär auf Open-Source-Modelle (Llama, Mistral), die wir in Ihrer Infrastruktur oder einer EU-Cloud Ihrer Wahl deployen. Kein Datenabfluss.",
      },
      {
        q: "Wieviel kostet das regulär?",
        a: "Der genaue Festpreis hängt vom Use-Case ab und wird nach dem Discovery-Call innerhalb von 7 Tagen geliefert. Als Pilotkunde sparen Sie 50 % auf den Setup-Anteil.",
      },
      {
        q: "Was, wenn die KI Quatsch produziert?",
        a: "Jeder Workflow hat klare Validierungs- und Eskalationsregeln. Bei niedriger Confidence übergibt das System an einen Menschen. Keine Black-Box.",
      },
      {
        q: "Was passiert nach den 30 Tagen Tuning?",
        a: "Sie können mit uns weiterarbeiten oder den Workflow intern übernehmen — komplette Doku ist Teil der Übergabe.",
      },
    ],
    calLink: process.env.NEXT_PUBLIC_CAL_LINK_PILOT_KI ?? "fwstudios/30min",
    calTopic: "Pilot KI-Lösungen",
  },
};

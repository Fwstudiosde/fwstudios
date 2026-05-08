export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Finn Weinnoldt",
    role: "Founder & Lead Engineer",
    bio: "Baut seit über 8 Jahren digitale Produkte. Spezialist für KI-Workflows und produktreife SaaS-Plattformen.",
    initials: "FW",
  },
];

export const COMPANY = {
  founded: 2022,
  location: "Deutschland",
  values: [
    {
      title: "Ehrliche Beratung",
      body: "Wenn KI nicht das richtige Werkzeug ist, sagen wir es. Lieber kein Projekt als das falsche.",
    },
    {
      title: "Schnelle Auslieferung",
      body: "Wöchentliche Demos statt monatelanger Konzeptphasen. Sie sehen Fortschritt, bevor Sie zahlen.",
    },
    {
      title: "Ownership",
      body: "Wir liefern Code, Doku und Übergabe. Sie sind nie an uns gebunden — auch wenn die meisten bleiben.",
    },
    {
      title: "Made in Germany",
      body: "EU-Hosting, DSGVO-konform, deutscher Vertrag, deutsche Ansprache. Keine Überraschungen.",
    },
  ],
};

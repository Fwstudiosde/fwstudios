export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Innerhalb von einer Woche stand der Chatbot — und nach zwei Wochen war er ohne Wenn und Aber Teil unseres Verkaufsteams. Hat sich nach drei Monaten bezahlt gemacht.",
    author: "Tim Hauser",
    role: "Geschäftsführer",
    company: "LIIAN Immobilien",
    initials: "TH",
  },
  {
    quote:
      "Vom Pitch-Deck zur produktiven SaaS in sechs Wochen. FWStudios denkt wie ein Co-Founder, nicht wie eine Agentur.",
    author: "S. Brandt",
    role: "Founder",
    company: "Stealth · B2B SaaS",
    initials: "SB",
  },
  {
    quote:
      "Die KI-Pipeline hat unser Backoffice komplett auf den Kopf gestellt — im positiven Sinn. Saubere Architektur, klare Übergabe, ehrliche Beratung.",
    author: "Dr. M. Rötzer",
    role: "Operations Lead",
    company: "Versicherung · Mittelstand",
    initials: "MR",
  },
  {
    quote:
      "Wir haben drei Agenturen vorher angeschaut. FWStudios war die einzige, die zuerst gefragt hat, ob KI überhaupt das richtige Werkzeug ist. Refreshing.",
    author: "L. Voss",
    role: "Head of Digital",
    company: "E-Commerce DACH",
    initials: "LV",
  },
  {
    quote:
      "Saubere App, schneller Launch, faire Preise. Unsere Stammkunden lieben das Stempelpass-Feature.",
    author: "J. Krämer",
    role: "Marketing Director",
    company: "Bäckerei-Kette",
    initials: "JK",
  },
];

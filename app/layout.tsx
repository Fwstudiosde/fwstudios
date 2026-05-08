import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FWStudios — KI-Lösungen, Chatbots & Plattform-Entwicklung",
    template: "%s · FWStudios",
  },
  description:
    "FWStudios entwickelt maßgeschneiderte KI-Chatbots, KI-Lösungen und digitale Plattformen für Unternehmen, die echten Vorsprung wollen.",
  metadataBase: new URL("https://fwstudios.de"),
  openGraph: {
    title: "FWStudios — KI-Lösungen & Plattformen",
    description:
      "KI-Chatbots, KI-Workflows und Plattform-Entwicklung für moderne Unternehmen.",
    locale: "de_DE",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg text-fg font-sans">{children}</body>
    </html>
  );
}

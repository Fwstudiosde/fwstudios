import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/content/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fwstudios.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/chatbot",
    "/ki-loesungen",
    "/plattform-entwicklung",
    "/app-entwicklung",
    "/projekte",
    "/ueber-uns",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/widerruf",
    "/apps/sparkoch",
    "/apps/sparkoch/datenschutz",
    "/apps/sparkoch/support",
    "/apps/sparkoch/nutzungsbedingungen",
    "/apps/peinlich-nicht-zu-wissen",
    "/apps/peinlich-nicht-zu-wissen/datenschutz",
    "/apps/peinlich-nicht-zu-wissen/support",
    "/apps/peinlich-nicht-zu-wissen/nutzungsbedingungen",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASE}/projekte/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}

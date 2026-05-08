import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FWStudios — KI-Lösungen, Chatbots & Plattformen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.25), transparent 60%), #08090a",
          padding: 80,
          color: "#f5f6f7",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background:
                "linear-gradient(135deg, #00d4ff 0%, #7c5cff 60%, #b56bff 100%)",
            }}
          />
          FWStudios
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: "#ffffff",
              maxWidth: 1000,
            }}
          >
            KI, die für Ihr
          </div>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              backgroundImage:
                "linear-gradient(135deg, #00d4ff 0%, #7c5cff 60%, #b56bff 100%)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: 1000,
            }}
          >
            Geschäft arbeitet.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "#a1a5ad",
              maxWidth: 900,
            }}
          >
            KI-Chatbots · KI-Lösungen · Plattformen · Mobile Apps
          </div>
        </div>
      </div>
    ),
    size
  );
}

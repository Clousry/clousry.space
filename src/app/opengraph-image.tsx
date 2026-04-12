import { ImageResponse } from "next/og";

export const alt = "CLOUSRY portfolio preview";
export const dynamic = "force-static";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(85, 145, 255, 0.36), transparent 32%), linear-gradient(135deg, #08101f 0%, #0f1a33 48%, #050812 100%)",
          color: "#f6f8ff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            borderRadius: 34,
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "78px 84px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "rgba(190, 210, 255, 0.78)",
              }}
            >
              Personal Portfolio
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 106,
                lineHeight: 0.92,
                letterSpacing: "-0.08em",
                fontWeight: 700,
              }}
            >
              <span>CLOUSRY</span>
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 760,
                fontSize: 34,
                lineHeight: 1.35,
                color: "rgba(226, 233, 247, 0.82)",
              }}
            >
              Post-production, motion, editing and visual craft presented through a refined bilingual portfolio experience.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,
                fontSize: 22,
                textTransform: "uppercase",
                color: "rgba(192, 224, 255, 0.72)",
              }}
            >
              <span>Editing</span>
              <span>Motion</span>
              <span>Visual Design</span>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              clousry.space
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

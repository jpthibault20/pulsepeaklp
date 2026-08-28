import { ImageResponse } from "next/og";

export const alt = "PulsePeak — Coach IA vélo, course à pied, natation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #1d4ed8 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 100, fontWeight: 800, letterSpacing: -2, color: "#ffffff" }}>
          PulsePeak
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 900,
            textAlign: "center",
            fontSize: 38,
            fontWeight: 500,
            color: "#bfdbfe",
          }}
        >
          Coach IA vélo, course à pied, natation
        </div>
      </div>
    ),
    { ...size }
  );
}

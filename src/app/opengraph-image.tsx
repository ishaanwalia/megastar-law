import { ImageResponse } from "next/og";
import { firm } from "@/lib/firm-data";

export const alt = "Megastar Law Associates — Advocates, Chandigarh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1F1B14",
          color: "#F5F1E6",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#C79A44",
          }}
        >
          Advocates &middot; Chandigarh
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {firm.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            color: "#C9BFA8",
          }}
        >
          Criminal &middot; Civil &middot; Family &middot; Corporate &middot; Arbitration
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 56,
            paddingTop: 32,
            borderTop: "2px solid #C79A44",
            fontSize: 26,
            color: "#C79A44",
          }}
        >
          {firm.helplineLabel}: {firm.helpline}
        </div>
      </div>
    ),
    { ...size }
  );
}

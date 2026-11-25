import { ImageResponse } from "next/og";
import { BRAND, LOCATION, SERVICE_TAGS } from "@/data/brand";

export const alt = `${BRAND.fullName} — ${LOCATION.shortLabel}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #08090B 0%, #111318 60%, #161820 100%)",
          color: "#F5F7FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#A3E635" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#A3E635" }} />
          {BRAND.fullName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            {BRAND.motto}
          </div>
          <div style={{ fontSize: 28, color: "#9CA3AF" }}>{SERVICE_TAGS.join(" · ")}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#22D3EE" }}>{LOCATION.workingScope}</div>
      </div>
    ),
    size
  );
}

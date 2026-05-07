import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? SITE.title;
  const subtitle = searchParams.get("subtitle") ?? SITE.description;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          padding: 80,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "white",
          fontFamily: "Geist, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#94a3b8", marginBottom: 24 }}>
          {SITE.title}
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? 48 : 60,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", maxWidth: "70%" }}>
          {subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}

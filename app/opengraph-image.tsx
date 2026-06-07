import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(weight: number): Promise<ArrayBuffer> {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&display=swap`, {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
    })
  ).text();
  const match = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"](?:woff2?)['"]\)/);
  if (!match) return new ArrayBuffer(0);
  const resp = await fetch(match[1]);
  return resp.arrayBuffer();
}

export default async function Image() {
  const [semiBold, regular] = await Promise.all([
    loadFont(600).catch(() => new ArrayBuffer(0)),
    loadFont(400).catch(() => new ArrayBuffer(0)),
  ]);

  const fonts = [];
  if (semiBold.byteLength > 0) fonts.push({ name: "Inter", data: semiBold, weight: 600 as const, style: "normal" as const });
  if (regular.byteLength > 0) fonts.push({ name: "Inter", data: regular, weight: 400 as const, style: "normal" as const });

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
          background: "linear-gradient(135deg, #f8f4ec 0%, #f2ede3 100%)",
          fontFamily: fonts.length > 0 ? "Inter" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 40,
            background: "linear-gradient(135deg, #292524, #1c1917)",
            boxShadow: "0 8px 24px rgba(28,25,23,0.15)",
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: "#fafaf9", letterSpacing: "-0.04em" }}>R</span>
        </div>
        <h1
          style={{
            marginTop: 28,
            fontSize: 56,
            fontWeight: 600,
            color: "#1c1917",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            textAlign: "center",
          }}
        >
          Rohit Moningi
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 22,
            fontWeight: 400,
            color: "#57534e",
            textAlign: "center",
          }}
        >
          Full-Stack Solutions Engineer
        </p>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            gap: 12,
          }}
        >
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(28,25,23,0.08)",
              fontSize: 13,
              fontWeight: 500,
              color: "#57534e",
            }}
          >
            Next.js
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(28,25,23,0.08)",
              fontSize: 13,
              fontWeight: 500,
              color: "#57534e",
            }}
          >
            React
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(28,25,23,0.08)",
              fontSize: 13,
              fontWeight: 500,
              color: "#57534e",
            }}
          >
            TypeScript
          </span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              background: "rgba(28,25,23,0.08)",
              fontSize: 13,
              fontWeight: 500,
              color: "#57534e",
            }}
          >
            Python
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}

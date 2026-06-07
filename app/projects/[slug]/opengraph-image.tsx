import { ImageResponse } from "next/og";
import { projectMap, projects } from "@/components/portfolio-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

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

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projectMap[slug];
  const title = project?.title ?? "Project";
  const category = project?.category ?? "";
  const tags = project?.tags ?? [];

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
          padding: "56px 64px",
          background: "linear-gradient(135deg, #1c1917 0%, #292524 100%)",
          fontFamily: fonts.length > 0 ? "Inter" : undefined,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 20,
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fafaf9" }}>R</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 400, color: "#a8a29e" }}>rohitmoningi.in</span>
        </div>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "center", gap: 16 }}>
          {category && (
            <span
              style={{
                display: "flex",
                padding: "6px 14px",
                borderRadius: 20,
                background: "rgba(251,191,36,0.15)",
                fontSize: 12,
                fontWeight: 500,
                color: "#fbbf24",
              }}
            >
              {category}
            </span>
          )}
          <h1
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: "#fafaf9",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
              maxWidth: 900,
            }}
          >
            {title}
          </h1>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.08)",
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#d6d3d1",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 20,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 400, color: "#a8a29e" }}>
            Rohit Moningi — Full-Stack Solutions Engineer
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

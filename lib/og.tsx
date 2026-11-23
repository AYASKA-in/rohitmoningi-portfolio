import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export async function createSocialImage(title: string, label: string) {
  const font = await readFile(join(process.cwd(), "public/fonts/display.ttf"));
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#111113", color: "#f6f5f1", padding: "55px 65px", borderRight: "18px solid #ef273e" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontFamily: "Display", fontSize: 48, color: "#ef273e" }}>ROHIT.</span><span style={{ fontSize: 18, color: "#b4adb9" }}>rohitmoningi.in</span></div><div style={{ display: "flex", flexDirection: "column", gap: 14 }}><span style={{ fontSize: 17, color: "#b9b3bf", textTransform: "uppercase", letterSpacing: 3 }}>{label}</span><span style={{ fontFamily: "Display", fontSize: title.length > 30 ? 76 : 110, lineHeight: 1, maxWidth: 1020 }}>{title}</span></div><span style={{ fontSize: 19, color: "#c5bfcd" }}>Web platforms. Business systems. Applied AI.</span></div>, { width: 1200, height: 630, fonts: [{ name: "Display", data: new Uint8Array(font).buffer, weight: 400, style: "normal" }] });
}

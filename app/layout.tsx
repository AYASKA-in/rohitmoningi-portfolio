import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { pageMetadata, seoPages, siteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { MotionDirector } from "@/components/motion-director";
import { ArtworkDepth } from "@/components/artwork-depth";
const display = localFont({ src: "../public/fonts/display.ttf", variable: "--font-display", display: "swap" });
const body = localFont({ src: "../public/fonts/body.ttf", variable: "--font-body", display: "swap" });
export const viewport: Viewport = { themeColor: "#111113" };
export const metadata: Metadata = {
 ...pageMetadata(seoPages.home), metadataBase: new URL(site.url),
 icons: { icon: "/favicon.svg" }, authors: [{ name: site.name, url: site.url }], creator: site.name,
 robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
 verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};
export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
 return <html lang="en" className={`${display.variable} ${body.variable}`}><body><a href="#main-content" className="skip-link">Skip to content</a><JsonLd data={siteSchema} /><SiteHeader /><main id="main-content">{children}</main><SiteFooter />{modal}<MotionDirector /><ArtworkDepth /></body></html>;
}

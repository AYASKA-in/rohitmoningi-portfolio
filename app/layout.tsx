import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";
import { LenisProvider } from "@/components/lenis-provider";

const BASE_URL = "https://rohitmoningi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Rohit Moningi — Full-Stack Solutions Engineer",
    template: "%s — Rohit Moningi",
  },
  description:
    "Rohit Moningi is a Full-Stack Solutions Engineer based in Parlakhemundi, Odisha, India. Builds production e-commerce, B2B systems, IEEE-published AI research, and client-delivered software with Next.js, TypeScript, React, and Python.",
  keywords: [
    "Rohit Moningi",
    "Full-Stack Developer India",
    "Next.js Developer",
    "React Developer",
    "Solutions Engineer",
    "Web Developer Odisha",
    "IEEE Research Author",
    "B2B Systems Developer",
    "E-commerce Development",
    "Full Stack Engineer Portfolio",
    "VIT Vellore Developer",
    "Explainable AI",
    "TypeScript Developer",
    "Freelance Web Developer India",
  ],
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  alternates: { canonical: BASE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Rohit Moningi — Full-Stack Solutions Engineer",
    description:
      "Production e-commerce, B2B systems, IEEE research, and client-delivered software built with Next.js, TypeScript, and React.",
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Rohit Moningi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohit Moningi — Full-Stack Solutions Engineer",
    description:
      "Production e-commerce, B2B systems, IEEE research, and client-delivered software.",
  },
  other: {
    "theme-color": "#f8f4ec",
    "referrer": "strict-origin-when-cross-origin",
    "format-detection": "telephone=no",
    "profile:first_name": "Rohit",
    "profile:last_name": "Moningi",
    "profile:username": "moningi-rohit",
    "article:author": "https://www.linkedin.com/in/moningi-rohit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rohit Moningi",
    givenName: "Rohit",
    familyName: "Moningi",
    jobTitle: "Full-Stack Solutions Engineer",
    url: BASE_URL,
    sameAs: [
      "https://github.com/AYASKA-in",
      "https://www.linkedin.com/in/moningi-rohit",
      "https://www.instagram.com/mrohit_88/",
      "https://leetcode.com/u/codeforlife125/",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Python",
      "Machine Learning",
      "Explainable AI",
      "Computer Vision",
      "Full-Stack Development",
      "Supabase",
      "PostgreSQL",
      "Node.js",
    ],
    alumniOf: "VIT Vellore",
    birthPlace: { "@type": "Place", address: "Parlakhemundi, Odisha, India" },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rohit Moningi Portfolio",
    url: BASE_URL,
    description: "Portfolio of Rohit Moningi — Full-Stack Solutions Engineer specializing in production web apps, B2B systems, and AI research.",
    author: { "@type": "Person", name: "Rohit Moningi" },
  };

  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-50 -translate-y-20 rounded-full bg-stone-950 px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform focus-visible:translate-y-0 focus-visible:outline-none"
        >
          Skip to content
        </a>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />

        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://iad.microlink.io" />

        <noscript>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f8f4ec] p-6">
            <div className="max-w-md text-center">
              <h1 className="text-2xl font-semibold text-stone-950">Rohit Moningi</h1>
              <p className="mt-3 text-sm text-stone-600">Full-Stack Solutions Engineer — production web apps, B2B systems, and AI research.</p>
              <div className="mt-6 flex flex-col gap-2 text-sm text-stone-500">
                <a href="https://github.com/AYASKA-in" className="underline hover:text-stone-950">GitHub</a>
                <a href="https://www.linkedin.com/in/moningi-rohit" className="underline hover:text-stone-950">LinkedIn</a>
                <a href="mailto:rohitmoningi125@gmail.com" className="underline hover:text-stone-950">Email</a>
              </div>
            </div>
          </div>
        </noscript>
        <ScrollProgress />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

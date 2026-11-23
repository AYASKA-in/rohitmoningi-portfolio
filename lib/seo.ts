import type { Metadata } from "next";
import type { Project } from "./content";
import { site } from "./site";

export const personId = `${site.url}/#person`;
export const websiteId = `${site.url}/#website`;
export const absoluteUrl = (path = "") => `${site.url}${path}`;

export const seoPages = {
  home: {
    path: "",
    title: "Rohit Moningi | Full-Stack Software Engineer",
    description: "Rohit Moningi is a full-stack software engineer in Bengaluru building web platforms, business software and applied AI. Explore projects and experience.",
  },
  projects: {
    path: "/projects",
    title: "Full-Stack Projects & AI Research | Rohit Moningi",
    description: "Explore 13 projects by Rohit Moningi: e-commerce, real-time auctions, business software, open-source systems and explainable AI, with code and case studies.",
  },
  about: {
    path: "/about",
    title: "About Rohit Moningi | Engineering Experience & Skills",
    description: "Explore Rohit Moningi’s engineering experience and AI research, plus his upcoming Software Engineer role at Bosch in Bengaluru, starting 5 January 2027.",
  },
  contact: {
    path: "/contact",
    title: "Contact Rohit Moningi | Engineering & Project Enquiries",
    description: "Contact Rohit Moningi about software engineering roles, web platforms and product collaborations. Find his email, LinkedIn, GitHub and downloadable resume.",
  },
};

type PageSeo = { title: string; description: string; path: string; image?: string };
export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(image || `${path}/opengraph-image`);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: site.name, locale: "en_IN", images: [{ url: socialImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: socialImage, alt: title }] },
  };
}

const projectSearchTitles: Record<string, string> = {
  "explainable-ecg-heartbeat-classification": "Explainable AI for ECG Classification",
  "casting-surface-defect-detection": "Casting Defect Detection with Grad-CAM",
  "sri-lalitha-signature-noodles": "Sri Lalitha: E-commerce Platform",
  "tryfactor-product-strategy": "TryFactor: Full-Stack Product Engineering",
};

export function projectMetadata(project: Project) {
  return pageMetadata({
    title: `${projectSearchTitles[project.slug] || project.title} | ${site.name}`,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export const personSchema = {
  "@type": "Person", "@id": personId,
  name: site.name, url: site.url, jobTitle: site.title,
  sameAs: [site.github, site.linkedin],
  homeLocation: { "@type": "Place", name: "Bengaluru, India" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [personSchema, {
    "@type": "WebSite", "@id": websiteId, name: site.name, url: site.url,
    description: seoPages.home.description, inLanguage: "en-IN", publisher: { "@id": personId },
  }],
};

export function webPageSchema(page: PageSeo, type = "WebPage") {
  const url = absoluteUrl(page.path);
  return {
    "@context": "https://schema.org", "@type": type, "@id": `${url}#webpage`,
    url, name: page.title, description: page.description, inLanguage: "en-IN",
    isPartOf: { "@id": websiteId }, about: { "@id": personId },
  };
}

export type Crumb = { name: string; href: string };
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absoluteUrl(item.href === "/" ? "" : item.href) })),
  };
}

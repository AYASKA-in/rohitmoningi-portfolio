import type { Metadata } from "next";
import { ProjectCatalogue } from "@/components/project-catalogue";
import { projects } from "@/lib/content";
import { pageMetadata, seoPages, webPageSchema, absoluteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
export const metadata: Metadata = pageMetadata(seoPages.projects);
export default function Projects() { return <div data-motion-route="/projects" className="wrap page-content"><JsonLd data={{ ...webPageSchema(seoPages.projects, "CollectionPage"), mainEntity: { "@type": "ItemList", numberOfItems: projects.length, itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: absoluteUrl(`/projects/${p.slug}`) })) } }} /><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Work", href: "/projects" }]} /><div className="page-intro"><p className="eyebrow"><span className="red-dash" /> THE COMPLETE COLLECTION</p><h1>EVERY BUILD<br />HAS A <span>STORY.</span></h1><p>Explore my software engineering portfolio: web platforms,<br />business systems, open-source projects, and AI research.</p></div><ProjectCatalogue /></div>; }

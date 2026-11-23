import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectMap, projects } from "@/lib/content";
import { site } from "@/lib/site";
import { ProjectDetail } from "@/components/project-detail";
import { projectMetadata, personId, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params; const p = projectMap.get(slug); if (!p) return {};
 return projectMetadata(p);
}
export default async function ProjectPage({ params }: Props) {
 const { slug } = await params; const p = projectMap.get(slug); if (!p) notFound();
 const url = `${site.url}/projects/${slug}`;
 const json = { "@context": "https://schema.org", "@graph": [
   { ...webPageSchema({ title: p.title, description: p.description, path: `/projects/${slug}` }), mainEntity: { "@id": `${url}#project` } },
   { "@type": "CreativeWork", "@id": `${url}#project`, name: p.title, description: p.description, url, author: { "@id": personId }, mainEntityOfPage: { "@id": `${url}#webpage` }, image: `${url}/opengraph-image`, keywords: p.stack.join(", "), inLanguage: "en-IN" },
 ] };
 return <div data-motion-route={`/projects/${slug}`} className="detail-page"><JsonLd data={json} /><ProjectDetail project={p} /></div>;
}

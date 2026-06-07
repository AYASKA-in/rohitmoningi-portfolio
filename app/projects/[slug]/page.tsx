import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectMap, projects } from "@/components/portfolio-data";
import { ProjectContent } from "@/components/project-content";

const BASE_URL = "https://rohitmoningi.in";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectMap[slug];
  if (!project) return {};

  const title = project.title;
  const description = project.summary || project.description;
  const canonicalUrl = `${BASE_URL}/projects/${slug}`;
  const keywords = [project.category, ...project.tags, ...project.stack, "Rohit Moningi", "Portfolio"];

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    keywords,
    openGraph: {
      title: `${title} — Rohit Moningi`,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "Rohit Moningi Portfolio",
      locale: "en_IN",
      images: [{ url: project.image, width: 1600, height: 813, alt: title }],
      publishedTime: new Date(project.date).toISOString(),
      tags: [project.category, ...project.tags],
      section: project.category,
      authors: ["https://www.linkedin.com/in/moningi-rohit"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Rohit Moningi`,
      description,
      images: [project.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectMap[slug];

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const canonicalUrl = `${BASE_URL}/projects/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${BASE_URL}/#projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: canonicalUrl },
    ],
  };

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary || project.description,
    url: canonicalUrl,
    keywords: [project.category, ...project.tags, ...project.stack],
    author: { "@type": "Person", name: "Rohit Moningi" },
    datePublished: project.date,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
      <ProjectContent
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </>
  );
}

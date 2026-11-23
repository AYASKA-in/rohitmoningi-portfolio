import { notFound } from "next/navigation";
import { projectMap } from "@/lib/content";
import { ProjectModal } from "@/components/project-modal";
import { ProjectDetail } from "@/components/project-detail";
export default async function Preview({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params; const project = projectMap.get(slug); if (!project) notFound();
 return <ProjectModal><ProjectDetail project={project} preview /></ProjectModal>;
}

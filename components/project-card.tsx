import Link from "next/link";
import { Project } from "@/lib/content";
import { ProjectImage } from "./project-image";

export function ProjectCard({ project, rank, priority }: { project: Project; rank?: number; priority?: boolean }) {
  return <article className={`project-card ${project.collection}`}>
    <Link href={`/projects/${project.slug}`} prefetch={false} className="project-card-link" aria-label={`${project.title} — view project`}>
      <div className="project-art"><div className="project-poster"><ProjectImage src={project.image} priority={priority} /></div><div className="art-shade" /><span className="poster-glint" aria-hidden="true" /><span className="card-category">{project.category}</span><div className="art-title"><span className="card-strap">{project.strap}</span><h3>{project.shortTitle}</h3></div>{rank && <span className="card-rank" aria-hidden="true">0{rank}</span>}</div>
      <div className="card-caption"><span>{project.tags.slice(0, 2).join(" · ")}</span><span className="card-status"><span className="status-dot" />{project.status}</span></div>
      <p className="card-description">{project.description}</p><span className="card-text-link">View project<span className="card-link-line" aria-hidden="true" /></span>
    </Link>
  </article>;
}

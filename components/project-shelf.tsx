"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/lib/content";
import { ProjectCard } from "./project-card";

export function ProjectShelf({ title, subtitle, id, projects, ranked = false }: { title: string; subtitle: string; id: string; projects: Project[]; ranked?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update(); const observer = new ResizeObserver(update); observer.observe(el); el.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); };
  }, []);
  function scroll(direction: number) { const el = ref.current; if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }
  return <section className={`shelf ${ranked ? "featured-shelf" : ""}`} id={id} aria-labelledby={`${id}-title`}><div className="section-heading wrap"><div><p className="eyebrow">{subtitle}</p><h2 id={`${id}-title`}>{title}<span className="red">.</span></h2></div><div className="shelf-actions"><Link href="/projects" className="text-link">View all <ArrowRight size={15} /></Link><div className="shelf-arrows" hidden={edges.start && edges.end}><button className="icon-button" onClick={() => scroll(-1)} aria-label={`Previous ${title} projects`} disabled={edges.start}><ChevronLeft size={20} /></button><button className="icon-button" onClick={() => scroll(1)} aria-label={`Next ${title} projects`} disabled={edges.end}><ChevronRight size={20} /></button></div></div></div><div ref={ref} className={`shelf-track ${ranked ? "ranked" : ""}`}><div className="shelf-items">{projects.map((p, i) => <ProjectCard key={p.slug} project={p} rank={ranked ? i + 1 : undefined} />)}</div></div></section>;
}


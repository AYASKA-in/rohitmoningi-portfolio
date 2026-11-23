"use client";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
const filters = [{ id: "all", label: "All work" }, { id: "business", label: "Business & commerce" }, { id: "systems", label: "Systems & open source" }, { id: "research", label: "AI & research" }];
export function ProjectCatalogue() {
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => projects.filter(p => (filter === "all" || p.collection === filter) && `${p.title} ${p.shortTitle} ${p.description} ${p.stack.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())), [query, filter]);
  return <><div className="catalogue-controls"><div className="filters" role="group" aria-label="Filter projects">{filters.map(f => <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>)}</div><div className="project-search"><Search size={18} /><label htmlFor="search" className="sr-only">Search projects by name or technology</label><input id="search" type="search" placeholder="Search work or technology…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button className="icon-button" aria-label="Clear search" onClick={() => setQuery("")}><X size={17} /></button>}</div></div><p className="results-count" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{filter !== "all" || query ? " found" : " to explore"}</p>{filtered.length ? <div className="catalogue-grid">{filtered.map(p => <ProjectCard key={p.slug} project={p} />)}</div> : <div className="empty-state"><Search size={32} /><h2>No projects in this collection.</h2><p>Try another technology or reset your filters.</p><button className="button button-light" onClick={() => { setFilter("all"); setQuery(""); }}>Show all projects</button></div>}</>;
}

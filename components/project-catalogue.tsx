"use client";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { projects } from "@/lib/content";
import { motionTokens as tokens } from "@/lib/motion-tokens";
import { useMotionAllowed } from "@/lib/use-motion-allowed";
import { ProjectCard } from "./project-card";
const filters = [{ id: "all", label: "All work" }, { id: "business", label: "Business & commerce" }, { id: "systems", label: "Systems & open source" }, { id: "research", label: "AI & research" }];

export function ProjectCatalogue() {
  const animated = useMotionAllowed();
  const catalogue = useRef<HTMLDivElement>(null);
  const positions = useRef<Map<string, DOMRect> | null>(null);
  const selection = useRef<DOMRect | null>(null);
  const animations = useRef(new Set<Animation>());
  const [query, setQuery] = useState(""); const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => projects.filter(p => (filter === "all" || p.collection === filter) && `${p.title} ${p.shortTitle} ${p.description} ${p.stack.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())), [query, filter]);

  // Capture the visible position before React updates, including an interrupted animation.
  function capture() {
    positions.current = new Map(Array.from(catalogue.current?.querySelectorAll<HTMLElement>(".catalogue-item") || [], el => [el.dataset.project!, el.getBoundingClientRect()]));
    selection.current = catalogue.current?.querySelector(".filter-selection")?.getBoundingClientRect() || null;
  }
  useLayoutEffect(() => {
    const active = animations.current;
    const finish = () => { for (const animation of active) animation.cancel(); active.clear(); };
    const previous = positions.current;
    if (animated && previous) {
      const play = (element: HTMLElement, frames: Keyframe[]) => {
        if (!element.animate) return;
        const animation = element.animate(frames, { duration: tokens.duration.normal * 1000, easing: `cubic-bezier(${tokens.ease.join(",")})` });
        active.add(animation);
        void animation.finished.then(() => active.delete(animation), () => active.delete(animation));
      };
      catalogue.current?.querySelectorAll<HTMLElement>(".catalogue-item").forEach(element => {
        const before = previous.get(element.dataset.project!);
        const after = element.getBoundingClientRect();
        if (after.bottom <= 0 || after.top >= window.innerHeight) return;
        const retained = before && before.bottom > 0 && before.top < window.innerHeight;
        const x = retained ? before.left - after.left : 0;
        const y = retained ? before.top - after.top : tokens.distance.sm;
        if (!retained || Math.abs(x) + Math.abs(y) > 0.5) play(element, [{ transform: `translate(${x}px,${y}px)`, opacity: retained ? 1 : 0.85 }, { transform: "none", opacity: 1 }]);
      });
      const highlight = catalogue.current?.querySelector<HTMLElement>(".filter-selection");
      if (highlight && selection.current) {
        const before = selection.current; const after = highlight.getBoundingClientRect();
        play(highlight, [{ transform: `translate(${before.left - after.left}px,${before.top - after.top}px) scale(${before.width / after.width},${before.height / after.height})` }, { transform: "none" }]);
      }
    }
    positions.current = null; selection.current = null;
    return finish;
  }, [animated, filtered]);

  return <div ref={catalogue} className="project-catalogue">
    <div className="catalogue-controls"><div className="filters" role="group" aria-label="Filter projects">{filters.map(f => <button key={f.id} aria-pressed={filter === f.id} onClick={() => { capture(); setFilter(f.id); }}>
      {filter === f.id && <span className="filter-selection" aria-hidden="true" />}
      <span>{f.label}</span>
    </button>)}</div><div className="project-search"><Search size={18} /><label htmlFor="search" className="sr-only">Search projects by name or technology</label><input id="search" type="search" placeholder="Search work or technology…" value={query} onChange={e => { capture(); setQuery(e.target.value); }} />{query && <button className="icon-button" aria-label="Clear search" onClick={() => { capture(); setQuery(""); }}><X size={17} /></button>}</div></div>
    <p className="results-count" role="status">{filtered.length} {filtered.length === 1 ? "project" : "projects"}{filter !== "all" || query ? " found" : " to explore"}</p>
    <div className="catalogue-grid">{filtered.map(p => <div key={p.slug} className="catalogue-item" data-project={p.slug}><ProjectCard project={p} /></div>)}</div>
    {!filtered.length && <div className="empty-state"><Search size={32} /><h2>No projects in this collection.</h2><p>Try another technology or reset your filters.</p><button className="button button-light" onClick={() => { capture(); setFilter("all"); setQuery(""); }}>Show all projects</button></div>}
  </div>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/react";
import { motionTokens as tokens, shouldAnimate } from "@/lib/motion-tokens";

const revealSelector = ".section-heading, .project-card, .research-copy, .experience-row, .skills-grid article, .education-grid>div, .contact-heading, .contact-options>a, .story-grid>section, .results-section";

/** Enhances server-rendered content; nothing is hidden while waiting for JS. */
export function MotionDirector() {
  const pathname = usePathname();
  const [contentVersion, setContentVersion] = useState(0);
  const seen = useRef(new WeakSet<Element>());
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main-content");
    const surface = main?.querySelector<HTMLElement>("[data-motion-route]");
    // Intercepted previews retain the background route and its scroll position.
    if (!main) return;
    if (!surface) {
      const contentObserver = new MutationObserver(() => {
        if (main.querySelector("[data-motion-route]")) { contentObserver.disconnect(); setContentVersion(version => version + 1); }
      });
      contentObserver.observe(main, { childList: true, subtree: true });
      return () => contentObserver.disconnect();
    }
    if (surface.dataset.motionRoute !== pathname) return;
    const running = new Set<ReturnType<typeof animate>>();
    const elements = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutation: MutationObserver | undefined;
    let queued = 0;

    const play = (element: HTMLElement, keyframes: Parameters<typeof animate>[1], duration: number, delay = 0) => {
      elements.add(element);
      const controls = animate(element, keyframes, { duration, delay, ease: tokens.ease });
      running.add(controls);
      void controls.then(() => { running.delete(controls); });
    };
    function clear() {
      observer?.disconnect();
      mutation?.disconnect();
      cancelAnimationFrame(queued);
      for (const controls of running) controls.cancel();
      running.clear();
      for (const element of elements) { element.style.removeProperty("opacity"); element.style.removeProperty("transform"); }
      if (progress.current) { progress.current.style.opacity = "0"; progress.current.style.transform = "scaleX(0)"; }
    }

    function setup() {
      document.documentElement.dataset.motionReady = "true";
      if (!shouldAnimate()) return;
      if (progress.current) {
        play(progress.current, { scaleX: [0, 0.75, 1], opacity: [0, 1, 0] }, tokens.duration.slow);
      }
      if (pathname === "/" && !seen.current.has(surface!)) {
        seen.current.add(surface!);
        const heroImage = main!.querySelector<HTMLElement>(".hero-image");
        if (heroImage) play(heroImage, { scale: [tokens.scale.pop, 1] }, tokens.duration.crawl);
        main!.querySelectorAll<HTMLElement>(".hero-role, [data-hero-word], .hero-specialty, .hero-description, .hero-actions, .hero-footnote").forEach((element, index) => {
          const isName = element.hasAttribute("data-hero-word");
          play(element, { y: [isName ? tokens.distance.lg * 1.5 : tokens.distance.md, 0], opacity: [isName ? 1 : 0.85, 1] }, tokens.duration.slow, index * tokens.stagger);
        });
      } else if (!seen.current.has(surface!)) {
        seen.current.add(surface!);
        // Stage the page's introduction rather than shifting its entire layout.
        const introduction = surface!.querySelectorAll<HTMLElement>(surface!.classList.contains("detail-page") ? ".detail-cover-copy, .detail-intro" : ".breadcrumbs, .page-intro>h1, .page-intro>p, .identity-block, .catalogue-controls");
        introduction.forEach((element, index) => {
          play(element, { y: [tokens.distance.md, 0], opacity: [0.85, 1] }, tokens.duration.slow, Math.min(index, 3) * tokens.stagger);
        });
      }

      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting && !seen.current.has(entry.target));
        visible.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          seen.current.add(element);
          observer?.unobserve(element);
          if (!shouldAnimate()) return;
          const delay = Math.min(index, 3) * tokens.stagger;
          if (element.classList.contains("project-card")) {
            const poster = element.querySelector<HTMLElement>(".project-poster");
            if (poster) play(poster, { scale: [tokens.scale.poster, 1] }, tokens.duration.reveal, delay);
            const title = element.querySelector<HTMLElement>(".art-title");
            if (title) play(title, { y: [tokens.distance.md, 0], opacity: [0.9, 1] }, tokens.duration.slow, delay);
            element.querySelectorAll<HTMLElement>(".card-caption, .card-description, .card-text-link").forEach((caption, captionIndex) => {
              play(caption, { y: [tokens.distance.sm, 0], opacity: [0.8, 1] }, tokens.duration.slow, delay + captionIndex * tokens.stagger);
            });
          } else if (element.classList.contains("research-copy")) {
            play(element, { x: [tokens.distance.lg, 0], opacity: [0.8, 1] }, tokens.duration.reveal);
          } else {
            play(element, { y: [tokens.distance.md, 0], opacity: [0.8, 1] }, tokens.duration.slow, delay);
          }
        });
      }, { threshold: 0.06 });
      const register = () => {
        main!.querySelectorAll<HTMLElement>(revealSelector).forEach(element => {
          if (!seen.current.has(element)) observer?.observe(element);
        });
      };
      register();
      mutation = new MutationObserver(() => { cancelAnimationFrame(queued); queued = requestAnimationFrame(register); });
      mutation.observe(main!, { childList: true, subtree: true });
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    function preferenceChanged() { clear(); if (shouldAnimate()) setup(); }
    setup();
    reduced.addEventListener("change", preferenceChanged);
    forced.addEventListener("change", preferenceChanged);
    return () => { clear(); reduced.removeEventListener("change", preferenceChanged); forced.removeEventListener("change", preferenceChanged); };
  }, [pathname, contentVersion]);

  return <div ref={progress} className="route-light" aria-hidden="true" />;
}

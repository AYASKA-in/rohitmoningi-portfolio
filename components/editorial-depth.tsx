"use client";

import { useEffect } from "react";
import { motionTokens as tokens, shouldAnimate } from "@/lib/motion-tokens";

export function EditorialDepth() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".research-feature");
    const visual = section?.querySelector<HTMLElement>(".research-visual");
    if (!section || !visual) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    let visible = false; let frame = 0;
    function reset() { cancelAnimationFrame(frame); frame = 0; visual!.style.removeProperty("--editorial-y"); }
    function update() {
      frame = 0;
      if (!visible || !shouldAnimate() || document.hidden || document.querySelector("dialog[open]")) { reset(); return; }
      const box = section!.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (box.top + box.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + box.height / 2)));
      visual!.style.setProperty("--editorial-y", `${(-progress * tokens.depth.research).toFixed(2)}px`);
    }
    function schedule() { if (!frame && visible && shouldAnimate()) frame = requestAnimationFrame(update); }
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; if (visible) schedule(); else reset(); });
    observer.observe(section);
    function preferences() { reset(); schedule(); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", preferences);
    reduced.addEventListener("change", preferences); forced.addEventListener("change", preferences);
    return () => {
      reset(); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", preferences); reduced.removeEventListener("change", preferences); forced.removeEventListener("change", preferences);
    };
  }, []);
  return null;
}

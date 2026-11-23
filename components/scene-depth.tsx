"use client";

import { useEffect } from "react";
import { shouldAnimate } from "@/lib/motion-tokens";

/** A small, pointer-driven depth response; no continuous idle animation. */
export function SceneDepth() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const scene = hero?.querySelector<HTMLElement>(".hero-scene");
    if (!hero || !scene) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    let frame = 0;
    let visible = true;
    let x = 0; let y = 0; let targetX = 0; let targetY = 0;
    let previousTime = 0;
    const enabled = () => pointer.matches && shouldAnimate() && visible && !document.hidden && !document.querySelector("dialog[open]");

    function reset() {
      cancelAnimationFrame(frame); frame = 0; x = 0; y = 0; targetX = 0; targetY = 0;
      scene!.style.removeProperty("--scene-x"); scene!.style.removeProperty("--scene-y");
    }
    function draw(now: number) {
      frame = 0;
      if (!enabled()) { reset(); return; }
      const delta = Math.min(now - previousTime || 16, 50); previousTime = now;
      const ease = 1 - Math.exp(-delta / 100);
      x += (targetX - x) * ease; y += (targetY - y) * ease;
      scene!.style.setProperty("--scene-x", `${x.toFixed(2)}px`);
      scene!.style.setProperty("--scene-y", `${y.toFixed(2)}px`);
      if (Math.abs(x - targetX) + Math.abs(y - targetY) > 0.05) frame = requestAnimationFrame(draw);
    }
    function schedule() { if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(draw); } }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !enabled()) { reset(); return; }
      const box = hero!.getBoundingClientRect();
      targetX = (event.clientX / box.width - 0.5) * 16;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * 12;
      schedule();
    }
    function leave() { targetX = 0; targetY = 0; schedule(); }
    const intersection = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; if (!visible) reset(); });
    intersection.observe(hero);
    const dialogObserver = new MutationObserver(() => { if (document.querySelector("dialog[open]")) reset(); });
    dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", reset);
    for (const media of [pointer, reduced, forced]) media.addEventListener("change", reset);
    return () => {
      reset(); intersection.disconnect(); dialogObserver.disconnect();
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", reset); document.removeEventListener("visibilitychange", reset);
      for (const media of [pointer, reduced, forced]) media.removeEventListener("change", reset);
    };
  }, []);
  return null;
}

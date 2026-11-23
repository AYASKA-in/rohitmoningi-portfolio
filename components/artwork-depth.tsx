"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionTokens as tokens, shouldAnimate } from "@/lib/motion-tokens";

/** One delegated controller for all posters, including filtered-in projects. */
export function ArtworkDepth() {
  const pathname = usePathname();
  useEffect(() => {
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    let artwork: HTMLElement | null = null;
    let box: DOMRect | null = null;
    let frame = 0;
    let x = 0; let y = 0; let targetX = 0; let targetY = 0; let previousTime = 0;
    const enabled = () => pointer.matches && shouldAnimate() && !document.hidden && !document.querySelector("dialog[open]");
    function reset() {
      cancelAnimationFrame(frame); frame = 0;
      if (artwork) {
        delete artwork.dataset.depthActive;
        for (const name of ["--poster-rx", "--poster-ry", "--glow-x", "--glow-y"]) artwork.style.removeProperty(name);
      }
      artwork = null; box = null; x = 0; y = 0;
    }
    function draw(now: number) {
      frame = 0;
      if (!artwork?.isConnected || !enabled()) { reset(); return; }
      const delta = Math.min(now - previousTime || 16, 50); previousTime = now;
      const ease = 1 - Math.exp(-delta / 70);
      x += (targetX - x) * ease; y += (targetY - y) * ease;
      artwork.style.setProperty("--poster-rx", `${(-y * tokens.depth.tilt).toFixed(2)}deg`);
      artwork.style.setProperty("--poster-ry", `${(x * tokens.depth.tilt).toFixed(2)}deg`);
      artwork.style.setProperty("--glow-x", `${(x * tokens.depth.glowX).toFixed(2)}px`);
      artwork.style.setProperty("--glow-y", `${(y * tokens.depth.glowY).toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.002) frame = requestAnimationFrame(draw);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !enabled()) { reset(); return; }
      const next = event.target instanceof Element ? event.target.closest<HTMLElement>(".project-art") : null;
      if (!next) { reset(); return; }
      if (next !== artwork) { reset(); artwork = next; box = next.getBoundingClientRect(); artwork.dataset.depthActive = "true"; }
      if (!box) return;
      targetX = Math.max(-1, Math.min(1, (event.clientX - box.left) / box.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - box.top) / box.height * 2 - 1));
      if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(draw); }
    }
    function outside(event: PointerEvent) { if (!event.relatedTarget) reset(); }
    const dialogs = new MutationObserver(() => { if (document.querySelector("dialog[open]")) reset(); });
    dialogs.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["open"] });
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", outside, { passive: true });
    document.addEventListener("keydown", reset);
    document.addEventListener("visibilitychange", reset);
    window.addEventListener("scroll", reset, { passive: true });
    window.addEventListener("resize", reset);
    window.addEventListener("blur", reset);
    for (const media of [pointer, reduced, forced]) media.addEventListener("change", reset);
    return () => {
      reset(); dialogs.disconnect();
      document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", outside);
      document.removeEventListener("keydown", reset); document.removeEventListener("visibilitychange", reset);
      window.removeEventListener("scroll", reset); window.removeEventListener("resize", reset); window.removeEventListener("blur", reset);
      for (const media of [pointer, reduced, forced]) media.removeEventListener("change", reset);
    };
  }, [pathname]);
  return null;
}

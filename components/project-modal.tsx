"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { animate } from "motion/react";
import { motionTokens as tokens, shouldAnimate } from "@/lib/motion-tokens";

export function ProjectModal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null); const router = useRouter();
  const closing = useRef(false);
  const animations = useRef<ReturnType<typeof animate>[]>([]);
  const entryOffset = useRef({ x: 0, y: tokens.distance.lg });
  function closePreview() {
    if (closing.current) return;
    closing.current = true;
    for (const control of animations.current) control.stop();
    if (!ref.current || !shouldAnimate()) { router.back(); return; }
    const exit = animate(ref.current, { opacity: 0.6, x: entryOffset.current.x / 2, y: entryOffset.current.y / 2, scale: tokens.scale.subtle }, { duration: tokens.duration.fast, ease: tokens.ease });
    animations.current.push(exit);
    void exit.then(() => router.back());
  }
  useEffect(() => {
    const dialog = ref.current; const previous = document.activeElement as HTMLElement | null;
    const source = previous?.closest(".project-card-link")?.querySelector(".project-art")?.getBoundingClientRect();
    const overflow = document.body.style.overflow;
    dialog?.showModal(); document.body.style.overflow = "hidden";
    closing.current = false;
    if (dialog && shouldAnimate()) {
      const bounds = dialog.getBoundingClientRect();
      entryOffset.current = source ? {
        x: Math.max(-tokens.distance.lg, Math.min(tokens.distance.lg, (source.left + source.width / 2 - bounds.left - bounds.width / 2) * 0.1)),
        y: Math.max(-tokens.distance.lg, Math.min(tokens.distance.lg, (source.top + source.height / 2 - bounds.top - bounds.height / 2) * 0.1)),
      } : { x: 0, y: tokens.distance.lg };
      const origin = source ? Math.max(20, Math.min(80, (source.left + source.width / 2 - bounds.left) / bounds.width * 100)) : 50;
      dialog.style.transformOrigin = `${origin}% 20%`;
      animations.current.push(animate(dialog, { opacity: [0.65, 1], x: [entryOffset.current.x, 0], y: [entryOffset.current.y, 0], scale: [tokens.scale.preview, 1] }, { duration: tokens.duration.slow, ease: tokens.ease }));
      const poster = dialog.querySelector<HTMLElement>(".detail-cover img");
      if (poster) animations.current.push(animate(poster, { scale: [1.06, 1] }, { duration: tokens.duration.reveal, ease: tokens.ease }));
      const intro = dialog.querySelector<HTMLElement>(".detail-intro");
      if (intro) animations.current.push(animate(intro, { opacity: [0.8, 1], y: [tokens.distance.sm, 0] }, { duration: tokens.duration.slow, delay: tokens.stagger, ease: tokens.ease }));
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forced = window.matchMedia("(forced-colors: active)");
    function settle() { if (!shouldAnimate()) for (const control of animations.current) control.complete(); }
    reduced.addEventListener("change", settle);
    forced.addEventListener("change", settle);
    const heading = dialog?.querySelector<HTMLElement>("h1"); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    function trapFocus(event: KeyboardEvent) {
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]')).filter(element => element.getClientRects().length > 0);
      const first = controls[0]; const last = controls[controls.length - 1];
      if (!first) { event.preventDefault(); heading?.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || document.activeElement === heading)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    dialog?.addEventListener("keydown", trapFocus);
    return () => { reduced.removeEventListener("change", settle); forced.removeEventListener("change", settle); for (const control of animations.current) control.cancel(); animations.current = []; dialog?.removeEventListener("keydown", trapFocus); dialog?.close(); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={ref} className="project-modal" aria-modal="true" aria-labelledby="preview-title" onCancel={e => { e.preventDefault(); closePreview(); }} onClick={e => { if (e.target === ref.current) { const r = ref.current.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closePreview(); } }}><button className="modal-close icon-button" aria-label="Close project preview" onClick={closePreview}><X size={22} /></button>{children}</dialog>;
}

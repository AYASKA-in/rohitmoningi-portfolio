"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type Point = { x: number; y: number; time: number };
type Spark = Point & { vx: number; vy: number };

/** Decorative only: the native pointer, hit targets and focus behavior stay intact. */
export function CursorLight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || pathname !== "/") return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    const allowed = () => finePointer.matches && !reducedMotion.matches && !forcedColors.matches;
    let frame = 0;
    let active = false;
    let interactive = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let radius = 17;
    let lastMove = 0;
    let lastFrame = 0;
    let trail: Point[] = [];
    let sparks: Spark[] = [];

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      active = false;
      trail = [];
      sparks = [];
      canvas!.style.opacity = "0";
      context!.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function resize() {
      stop();
      if (!allowed()) { canvas!.width = 0; canvas!.height = 0; return; }
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.round(window.innerWidth * scale);
      canvas!.height = Math.round(window.innerHeight * scale);
      context!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    function draw(now: number) {
      frame = 0;
      if (!active || !allowed()) return;
      const age = now - lastMove;
      if (age > 850) { stop(); return; }
      const delta = Math.min(now - lastFrame || 16, 50);
      lastFrame = now;
      const ease = 1 - Math.exp(-delta / 55);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      radius += ((interactive ? 27 : 17) - radius) * ease;
      const opacity = Math.min(1, (850 - age) / 350);
      canvas!.style.opacity = String(opacity);

      const ctx = context!;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 85);
      glow.addColorStop(0, "rgba(239,39,62,0.15)");
      glow.addColorStop(1, "rgba(239,39,62,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(x - 85, y - 85, 170, 170);

      trail = trail.filter(point => now - point.time < 260);
      for (let i = 1; i < trail.length; i++) {
        const point = trail[i];
        const previous = trail[i - 1];
        ctx.strokeStyle = `rgba(255,77,98,${(1 - (now - point.time) / 260) * 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = interactive ? "rgba(255,226,206,0.85)" : "rgba(255,83,105,0.75)";
      const rotation = now / 1600;
      for (let i = 0; i < 4; i++) {
        const start = rotation + i * Math.PI / 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, start, start + Math.PI / 3);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(255,124,135,0.8)";
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fill();

      sparks = sparks.filter(spark => now - spark.time < 450);
      for (const spark of sparks) {
        const elapsed = (now - spark.time) / 1000;
        ctx.strokeStyle = `rgba(255,190,164,${(1 - elapsed / 0.45) * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(spark.x + spark.vx * elapsed, spark.y + spark.vy * elapsed);
        ctx.lineTo(spark.x + spark.vx * (elapsed + 0.035), spark.y + spark.vy * (elapsed + 0.035));
        ctx.stroke();
      }
      frame = requestAnimationFrame(draw);
    }

    function move(event: PointerEvent) {
      if (!allowed() || event.pointerType !== "mouse" || document.querySelector("dialog[open]")) { stop(); return; }
      const now = performance.now();
      targetX = event.clientX;
      targetY = event.clientY;
      if (!active) { x = targetX; y = targetY; lastFrame = now; }
      active = true;
      lastMove = now;
      const target = event.target instanceof Element ? event.target : null;
      interactive = !!target?.closest("a, button, input, textarea, select, [role='button']");
      const previous = trail[trail.length - 1];
      if (!previous || Math.hypot(targetX - previous.x, targetY - previous.y) > 4) {
        trail.push({ x: targetX, y: targetY, time: now });
        if (trail.length > 18) trail.shift();
      }
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function click(event: PointerEvent) {
      if (!allowed() || event.pointerType !== "mouse" || event.button !== 0 || document.querySelector("dialog[open]")) return;
      move(event);
      lastMove = performance.now();
      sparks = Array.from({ length: 8 }, (_, i) => {
        const angle = i * Math.PI / 4;
        return { x: event.clientX, y: event.clientY, vx: Math.cos(angle) * 95, vy: Math.sin(angle) * 95, time: lastMove };
      });
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function leave(event: PointerEvent) { if (!event.relatedTarget) stop(); }
    function visibility() { if (document.hidden) stop(); }
    function preferences() { resize(); }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("blur", stop);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", click, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("keydown", stop);
    document.addEventListener("visibilitychange", visibility);
    for (const media of [finePointer, reducedMotion, forcedColors]) media.addEventListener("change", preferences);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", stop);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", click);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("keydown", stop);
      document.removeEventListener("visibilitychange", visibility);
      for (const media of [finePointer, reducedMotion, forcedColors]) media.removeEventListener("change", preferences);
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="cursor-light" aria-hidden="true" />;
}

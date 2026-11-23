/** Shared timing follows the motion-foundations scale, in seconds. */
export const motionTokens = {
  duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, reveal: 0.85, crawl: 1 },
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  distance: { xs: 4, sm: 8, md: 16, lg: 24 },
  stagger: 0.065,
  scale: { subtle: 0.98, pop: 1.025, poster: 1.1, preview: 0.94 },
  depth: { tilt: 3, glowX: 60, glowY: 40, research: 18 },
};

export function shouldAnimate() {
  return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !window.matchMedia("(forced-colors: active)").matches;
}

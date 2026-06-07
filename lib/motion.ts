import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const softTransition = (duration = 0.65, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE_OUT,
});

export const fadeUp = (reduced = false, y = 24): Variants => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(8px)" },
  show: reduced
    ? { opacity: 1, transition: softTransition(0.35) }
    : {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: softTransition(0.7),
      },
});

export const staggerContainer = (
  reduced = false,
  staggerChildren = 0.1,
  delayChildren = 0.04,
): Variants => ({
  hidden: {},
  show: {
    transition: reduced
      ? { staggerChildren: 0.02, delayChildren: 0 }
      : { staggerChildren, delayChildren },
  },
});

export const lineReveal = (reduced = false): Variants => ({
  hidden: reduced ? { opacity: 0.4 } : { scaleY: 0, opacity: 0.3 },
  show: reduced
    ? { opacity: 1, transition: softTransition(0.25) }
    : { scaleY: 1, opacity: 1, transition: softTransition(0.9) },
});

export const cardHover = (reduced = false) =>
  reduced
    ? {}
    : {
        y: -6,
        scale: 1.01,
        transition: softTransition(0.28),
      };

export const skillFill = (reduced = false, value = 0) => ({
  initial: { width: reduced ? `${value}%` : 0 },
  whileInView: { width: `${value}%` },
  transition: softTransition(reduced ? 0.01 : 0.8),
  viewport: { once: true, amount: 0.75 },
});


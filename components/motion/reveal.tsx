"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { fadeUp, staggerContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  amount?: number;
  once?: boolean;
  y?: number;
};

export function Reveal({
  children,
  variants,
  amount = 0.2,
  once = true,
  y = 24,
  ...props
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={variants ?? fadeUp(Boolean(reduced), y)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  amount?: number;
  once?: boolean;
  stagger?: number;
  delayChildren?: number;
  variants?: Variants;
};

export function Stagger({
  children,
  amount = 0.15,
  once = true,
  stagger = 0.1,
  delayChildren = 0.04,
  variants,
  ...props
}: StaggerProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={variants ?? staggerContainer(Boolean(reduced), stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

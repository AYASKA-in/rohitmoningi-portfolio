"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

export function CountUp({
  target,
  suffix,
  label,
  reduced,
}: {
  target: number;
  suffix?: string;
  label: string;
  reduced?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView && !reduced) {
      animate(count, target, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    } else if (inView || reduced) {
      count.set(target);
    }
  }, [inView, target, reduced, count]);

  return (
    <div ref={ref} className="flex items-center gap-2">
      <span className="text-lg font-semibold tracking-[-0.03em] text-stone-950 tabular-nums">
        {reduced ? target : <motion.span>{rounded}</motion.span>}
        {suffix && <span className="text-lg font-semibold tracking-[-0.03em] text-stone-950">{suffix}</span>}
      </span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-stone-500">{label}</span>
    </div>
  );
}

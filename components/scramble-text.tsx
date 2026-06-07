"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/abcdefghijklmnopqrstuvwxyz";

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView) {
      setDisplay("");
      return;
    }

    let frame: number;
    let step = 0;
    const totalSteps = text.length + 8;

    const tick = () => {
      const result = text
        .split("")
        .map((char, i) => {
          if (i < step - 8) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(result);
      step++;
      if (step <= totalSteps) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {display || "\u00A0"}
    </span>
  );
}

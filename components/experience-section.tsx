"use client";

import React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  type LucideIcon,
  FlaskConical,
  Sparkles,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { experienceEntries, type ExperienceEntry } from "@/components/portfolio-data";
import { cardHover } from "@/lib/motion";
import { cn } from "@/lib/utils";

const domainIcons: Record<ExperienceEntry["domain"], LucideIcon> = {
  Product: Sparkles,
  Engineering: BriefcaseBusiness,
  Research: FlaskConical,
  Leadership: Users,
};

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative border-t border-black/6 bg-[linear-gradient(180deg,#fbfaf6_0%,#f4efe5_100%)] px-6 py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-stone-500">
            <ScrambleText text="Experience" />
          </p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            A timeline built around ownership, systems thinking, and delivery.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            The through line is steady: take responsibility early, improve how the
            system works, and leave the product in better shape than you found it.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[180px_minmax(0,1fr)]">
          <Reveal className="hidden lg:block">
            <div className="sticky top-28 rounded-[1.75rem] border border-black/7 bg-white/70 p-5 shadow-[0_12px_34px_-24px_rgba(28,25,23,0.32)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-600">Breadth</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Product", "Engineering", "Research", "Leadership"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-black/8 bg-stone-50 px-3 py-1 text-xs text-stone-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Timeline />
        </div>

        <Reveal className="mt-12 max-w-3xl text-sm leading-7 text-stone-600">
          The strongest pattern across these roles is not variety alone. It is the
          ability to move from interface quality to execution detail without losing
          product judgment.
        </Reveal>
      </div>
    </section>
  );
}

function Timeline() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <svg
        className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px lg:block"
        viewBox="0 0 2 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M1 0V100"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          style={reduced ? undefined : { pathLength }}
          initial={false}
        />
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(28,25,23,0.45)" />
            <stop offset="60%" stopColor="rgba(120,113,108,0.7)" />
            <stop offset="100%" stopColor="rgba(120,113,108,0)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="space-y-6">
        {experienceEntries.map((entry, index) => (
          <ExperienceCard key={`${entry.company}-${entry.role}`} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  const reduced = useReducedMotion();
  const DomainIcon = domainIcons[entry.domain];

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 0, x: -24 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={cardHover(Boolean(reduced))}
      className="group relative lg:pl-12"
    >
      <div className="absolute left-0 top-8 hidden lg:block">
        <motion.span
          className={cn(
            "block size-8 rounded-full border shadow-sm transition-colors duration-300",
            entry.featured
              ? "border-stone-950/20 bg-stone-950"
              : "border-stone-300 bg-white group-hover:border-stone-500",
          )}
          animate={
            reduced
              ? undefined
              : entry.featured
                ? { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }
                : undefined
          }
          transition={
            reduced || !entry.featured
              ? undefined
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div
        className={cn(
          "rounded-[1.8rem] border bg-white/76 p-6 shadow-[0_18px_42px_-30px_rgba(28,25,23,0.34)] backdrop-blur transition-all duration-300 sm:p-7",
          entry.featured ? "border-stone-950/12" : "border-black/7",
          "group-hover:border-stone-950/18 group-hover:shadow-[0_28px_60px_-38px_rgba(28,25,23,0.46)]",
        )}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em]",
                  entry.status === "currently"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-stone-100 text-stone-700",
                )}
              >
                {entry.status}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-stone-600">
                <DomainIcon className="size-3.5" />
                {entry.domain}
              </span>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
              {entry.company}
            </p>
            <p className="mt-2 text-sm text-stone-500">
              <time dateTime={entry.period.match(/\d{4}/)?.[0]}>{entry.period}</time>
              {index === 0 && (
                <ArrowUpRight className="ml-1 inline size-3.5 align-middle text-stone-700" />
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {entry.highlights.map((highlight) => (
            <div
              key={highlight}
              className="relative border-l-[3px] border-stone-300 pl-4 text-sm leading-7 text-stone-700 transition-colors duration-200 hover:border-stone-500"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

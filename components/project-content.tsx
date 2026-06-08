"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

import type { Project } from "@/components/portfolio-data";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const toneStyles: Record<NonNullable<Project["tone"]>, string> = {
  warm: "from-orange-900/25 via-orange-700/20 to-amber-300/15",
  green: "from-emerald-950/25 via-emerald-700/18 to-lime-300/12",
  blue: "from-slate-950/30 via-sky-900/20 to-cyan-300/10",
  amber: "from-stone-950/28 via-amber-900/18 to-orange-300/12",
  slate: "from-slate-950/30 via-slate-700/20 to-slate-300/10",
  violet: "from-violet-950/28 via-violet-800/18 to-pink-300/12",
};

export function ProjectContent({
  project,
  prevProject,
  nextProject,
}: {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}) {
  const reduced = useReducedMotion();

  return (
    <main id="main-content" className="min-h-screen bg-[linear-gradient(180deg,#faf7f0_0%,#f4efe5_100%)] px-6 py-12 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? undefined : { y: -8, opacity: 0 }}
          animate={reduced ? undefined : { y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-stone-500">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-400">/</li>
              <li>
                <Link
                  href="/#projects"
                  className="transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden="true" className="text-stone-400">/</li>
              <li aria-current="page" className="truncate text-stone-700 max-w-[200px] sm:max-w-xs">
                {project.title}
              </li>
            </ol>
          </nav>
          <Link
            href="/#projects"
            className="mt-4 inline-flex items-center gap-2 text-sm text-stone-600 transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
        </motion.div>

        <motion.section
          initial={reduced ? undefined : { y: 24, opacity: 0, filter: "blur(4px)" }}
          animate={reduced ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 overflow-hidden rounded-[2rem] border border-black/8 bg-white/78 shadow-[0_24px_60px_-36px_rgba(28,25,23,0.36)] backdrop-blur"
        >
          <div className="relative h-72 bg-stone-900 md:h-96">
            <Image
              priority
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover object-top"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br",
                project.tone ? toneStyles[project.tone] : toneStyles.slate,
              )}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.18)_40%,rgba(15,23,42,0.68)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/75">
                {project.category}
              </p>
              <h1 className="mt-3 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
                {project.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_320px]">
            <div>
              <Stagger className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={fadeUp(Boolean(reduced), 10)}
                    className="rounded-full border border-black/8 bg-stone-50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-600 transition-colors duration-200 hover:border-stone-400 hover:bg-stone-100"
                  >
                    {tag}
                  </motion.span>
                ))}
              </Stagger>

              <section className="mt-8">
                <Reveal>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    Overview
                  </h2>
                </Reveal>
                <Stagger className="mt-4 space-y-4">
                  {project.overview.map((paragraph) => (
                    <motion.p
                      key={paragraph}
                      variants={fadeUp(Boolean(reduced), 14)}
                      className="text-sm leading-8 text-stone-700 sm:text-base"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </Stagger>
              </section>

              {project.results && project.results.length > 0 && (
                <section className="mt-10">
                  <Reveal>
                    <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                      Results
                    </h2>
                  </Reveal>
                  <Stagger className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {project.results.map((result) => (
                      <motion.div
                        key={result}
                        variants={fadeUp(Boolean(reduced), 14)}
                        className="rounded-[1.25rem] border border-black/6 bg-stone-950 px-4 py-5 text-sm leading-6 text-stone-50 shadow-sm"
                      >
                        {result}
                      </motion.div>
                    ))}
                  </Stagger>
                </section>
              )}

              <section className="mt-10">
                <Reveal>
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">
                    Key Outcomes
                  </h2>
                </Reveal>
                <Stagger className="mt-4 grid gap-4">
                  {project.highlights.map((highlight) => (
                    <motion.div
                      key={highlight}
                      variants={fadeUp(Boolean(reduced), 14)}
                      className="relative rounded-[1.25rem] border-l-[3px] border-stone-950/20 bg-white px-5 py-4 text-sm leading-7 text-stone-800 shadow-sm transition-all duration-200 hover:border-stone-950/40 hover:shadow-md"
                    >
                      {highlight}
                    </motion.div>
                  ))}
                </Stagger>
              </section>
            </div>

            <aside className="space-y-6">
              <Reveal>
                <div className="rounded-[1.6rem] border border-black/7 bg-stone-50/90 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Stack</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-black/8 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-600 transition-colors duration-200 hover:border-stone-400 hover:bg-stone-100"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="rounded-[1.6rem] border border-black/7 bg-stone-50/90 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Project Access</p>
                  <div className="mt-4">
                    {project.externalUrl ? (
                      <Button
                        asChild
                        size="lg"
                        className="h-12 w-full rounded-full bg-stone-950 text-stone-50 hover:bg-stone-800"
                      >
                        <Link href={project.externalUrl} target="_blank" rel="noreferrer">
                          {project.externalLabel ?? "Open Project"}
                          <ExternalLink className="ml-2 size-4" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="rounded-[1.2rem] border border-dashed border-black/10 bg-white px-4 py-4 text-sm leading-7 text-stone-600">
                        {project.notes ?? "A public project link was not provided for this work."}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {project.notes && project.externalUrl ? (
                <Reveal>
                  <div className="rounded-[1.6rem] border border-black/7 bg-stone-50/90 p-5 text-sm leading-7 text-stone-600">
                    {project.notes}
                  </div>
                </Reveal>
              ) : null}
            </aside>
          </div>
        </motion.section>

        <Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-stone-800/60 bg-[linear-gradient(180deg,rgba(28,25,23,0.96),rgba(41,37,36,0.96))] px-6 py-6 text-stone-50 shadow-[0_24px_65px_-34px_rgba(28,25,23,0.72)] sm:px-7">
            <div>
              <p className="font-medium">Need the full implementation story?</p>
              <p className="mt-1 text-sm text-stone-400">
                Walkthrough, private repo access, or implementation details available.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-stone-600/80 bg-stone-900 px-5 py-3.5 text-sm font-medium text-stone-50 transition-all duration-200 hover:bg-stone-800 hover:border-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Schedule a walkthrough
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <nav className="mt-8 grid gap-4 sm:grid-cols-2">
          {prevProject ? (
            <Reveal>
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 rounded-[1.6rem] border border-black/7 bg-white/70 px-5 py-4 text-left backdrop-blur transition-all duration-200 hover:bg-white hover:border-stone-400/60 hover:shadow-[0_12px_30px_-24px_rgba(28,25,23,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <ChevronLeft className="size-4 shrink-0 text-stone-500 transition group-hover:text-stone-800" />
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">Previous</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-stone-800">{prevProject.title}</p>
                </div>
              </Link>
            </Reveal>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Reveal>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center gap-3 rounded-[1.6rem] border border-black/7 bg-white/70 px-5 py-4 text-right backdrop-blur transition-all duration-200 hover:bg-white hover:border-stone-400/60 hover:shadow-[0_12px_30px_-24px_rgba(28,25,23,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:flex-row-reverse"
              >
                <ChevronRight className="size-4 shrink-0 text-stone-500 transition group-hover:text-stone-800" />
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">Next</p>
                  <p className="mt-0.5 truncate text-sm font-medium text-stone-800">{nextProject.title}</p>
                </div>
              </Link>
            </Reveal>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </main>
  );
}

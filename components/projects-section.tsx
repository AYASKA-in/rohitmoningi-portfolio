"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { projects, type Project } from "@/components/portfolio-data";
import { softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const toneStyles: Record<NonNullable<Project["tone"]>, string> = {
  warm: "from-orange-900/25 via-orange-700/20 to-amber-300/15",
  green: "from-emerald-950/25 via-emerald-700/18 to-lime-300/12",
  blue: "from-slate-950/30 via-sky-900/20 to-cyan-300/10",
  amber: "from-stone-950/28 via-amber-900/18 to-orange-300/12",
  slate: "from-slate-950/30 via-slate-700/20 to-slate-300/10",
  violet: "from-violet-950/28 via-violet-800/18 to-pink-300/12",
};

const INITIAL_SHOWN = 6;

export function ProjectsSection() {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(INITIAL_SHOWN);

  function handleShowAll() {
    setShown(projects.length);
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rohit Moningi — Portfolio Projects",
    description: "Production e-commerce, B2B systems, IEEE research, AI/ML projects, and client-delivered software.",
    url: "https://rohitmoningi.vercel.app/#projects",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://rohitmoningi.vercel.app/projects/${project.slug}`,
      name: project.title,
    })),
  };

  return (
    <section
      id="projects"
      className="border-t border-black/6 bg-[linear-gradient(180deg,#f8f5ee_0%,#fbfaf6_100%)] px-6 py-24 lg:px-12 lg:py-28"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-stone-500">
            <ScrambleText text="Featured Projects" />
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            Product work, research builds, and systems designed to ship cleanly.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            The portfolio spans client delivery, research rigor, operational tooling,
            and product strategy work without collapsing everything into the same shape.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {["E-commerce", "Research", "Cloud", "Operations Software", "Product Strategy"].map(
            (label) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-600"
              >
                {label}
              </motion.span>
            ),
          )}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-12">
          {projects.slice(0, shown).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {shown < projects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={handleShowAll}
              className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-5 py-2.5 text-sm text-stone-700 shadow-sm transition-all duration-200 hover:border-stone-400 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              See all {projects.length} projects
              <ChevronDown className="size-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function handleClick() {
    router.push(`/projects/${project.slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      router.push(`/projects/${project.slug}`);
    }
  }

  return (
    <div
      style={{ perspective: 800 }}
      className={project.size === "lg" ? "xl:col-span-7" : "xl:col-span-5"}
    >
      <motion.article
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.6, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="link"
        tabIndex={0}
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        className="group relative cursor-pointer overflow-hidden rounded-[2rem] border border-black/7 bg-white/78 shadow-[0_18px_42px_-30px_rgba(28,25,23,0.34)] backdrop-blur transition-all duration-300 hover:border-stone-950/12 hover:shadow-[0_26px_62px_-34px_rgba(28,25,23,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <div className="relative h-64 overflow-hidden bg-stone-900">
          <motion.div
            className="absolute inset-0"
            whileHover={reduced ? undefined : { scale: 1.045 }}
            transition={softTransition(0.5)}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
              className="object-cover object-top"
            />
          </motion.div>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              project.tone ? toneStyles[project.tone] : toneStyles.slate,
            )}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.08)_40%,rgba(15,23,42,0.58)_100%)] transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-tl from-white/8 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/92 backdrop-blur transition-all duration-300 group-hover:scale-105 group-hover:bg-white/18 group-hover:shadow-lg">
            <Sparkles className="size-3.5" />
            {project.category}
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/7 bg-stone-50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-stone-950">
            {project.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-medium text-stone-900 transition-all duration-300 group-hover:border-stone-950/10 group-hover:bg-stone-950 group-hover:px-4 group-hover:text-white group-hover:shadow-md">
              Read Case Study
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>

            {project.externalUrl ? (
              <Link
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 text-sm text-stone-600 transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {project.externalLabel ?? "Open Project"}
              </Link>
            ) : (
              <span className="text-sm text-stone-500">Implementation under NDA — case study on request</span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

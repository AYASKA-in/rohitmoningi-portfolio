"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal, Stagger } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { skillCategories, type SkillCategory } from "@/components/portfolio-data";
import { cardHover, fadeUp } from "@/lib/motion";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="border-t border-black/6 bg-[linear-gradient(180deg,#f4efe5_0%,#fbfaf6_100%)] px-6 py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-stone-500">
            <ScrambleText text="Skills" />
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            A calibrated capability map built around real shipping work.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            The strongest edge is product UI and TypeScript execution, supported by
            practical backend depth and research-oriented ML fluency.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SkillCategory({ category }: { category: SkillCategory }) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp(Boolean(reduced), 18)}
      whileHover={cardHover(Boolean(reduced))}
      className="rounded-[1.8rem] border border-black/7 bg-white/76 p-6 shadow-[0_18px_42px_-30px_rgba(28,25,23,0.34)] backdrop-blur transition-all duration-300 hover:shadow-[0_28px_60px_-36px_rgba(28,25,23,0.42)]"
    >
      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">{category.subtitle}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-stone-950">
        {category.title}
      </h3>

      <div className="mt-6 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="rounded-full border border-black/8 bg-stone-50 px-3 py-1.5 text-xs text-stone-700 transition-all duration-200 hover:border-stone-400 hover:bg-white hover:shadow-sm"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Github,
  Instagram,
  Linkedin,
  type LucideIcon,
  Mail,
  MapPin,
  SquareCode,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ScrambleText } from "@/components/scramble-text";
import { socialLinks } from "@/components/portfolio-data";
import { fadeUp, softTransition } from "@/lib/motion";
import { Button } from "@/components/ui/button";

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  LeetCode: SquareCode,
};

export function ContactSection() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="border-t border-black/6 bg-[linear-gradient(180deg,#fbfaf6_0%,#f3eee5_100%)] px-6 py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.26em] text-stone-500">
            <ScrambleText text="Contact" />
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-5xl">
            Let&apos;s build something production-grade.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            Open to full-time roles and freelance work where product quality,
            engineering clarity, and dependable execution all matter.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
          <Contact3DCard reduced={Boolean(reduced)} />

          <Reveal className="rounded-[2rem] border border-black/7 bg-white/78 p-6 shadow-[0_18px_42px_-30px_rgba(28,25,23,0.34)] backdrop-blur sm:p-7">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Socials</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} label={link.label} href={link.href} />
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-black/7 bg-stone-50/90 p-4">
              <p className="text-sm leading-7 text-stone-700">
                Calm collaboration, serious product thinking, and software that can
                stand up outside the mockup.
              </p>
            </div>

            <motion.div
              initial={reduced ? undefined : { scale: 0.96, opacity: 0 }}
              whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={
                reduced
                  ? undefined
                  : {
                      boxShadow: "0 0 0 1px rgba(24,24,27,0.08), 0 18px 42px -28px rgba(28,25,23,0.35)",
                    }
              }
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 rounded-full border border-stone-300/90 p-[1px]"
            >
              <Button
                asChild
                size="lg"
                className="h-12 w-full rounded-full bg-stone-950 px-5 text-stone-50 hover:bg-stone-900"
              >
                <Link href="https://www.linkedin.com/in/moningi-rohit" target="_blank" rel="noreferrer">
                  Start a Conversation
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </motion.div>
          </Reveal>
        </div>

        <Reveal className="mt-14 rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(28,25,23,0.96),rgba(41,37,36,0.96))] p-6 text-stone-50 shadow-[0_24px_65px_-34px_rgba(28,25,23,0.72)] sm:p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-stone-100">
                Built with care for production-grade product work.
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Parlakhemundi, Odisha — IST (UTC+5:30)
              </p>
            </div>
            <div className="flex flex-wrap gap-5">
              <Link
                href="#projects"
                className="text-sm text-stone-400 transition hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Projects
              </Link>
              <Link
                href="#experience"
                className="text-sm text-stone-400 transition hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Experience
              </Link>
              <Link
                href="#skills"
                className="text-sm text-stone-400 transition hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-50/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Skills
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-white/10">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">{label}</p>
        <p className="mt-1 text-sm text-stone-100">{value}</p>
      </div>
    </div>
  );
}

export function SocialLink({ label, href }: { label: string; href: string }) {
  const reduced = useReducedMotion();
  const Icon = socialIcons[label];

  return (
    <motion.div whileHover={reduced ? undefined : { y: -3 }} transition={softTransition(0.22)}>
      <Link
        href={href}
        target="_blank"
        rel="me noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-stone-700 transition hover:border-stone-900/15 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <Icon className="size-4" />
        {label}
      </Link>
    </motion.div>
  );
}

const CONTACT_DEPTHS = [0.3, 0.6, 0.9];

function Contact3DCard({ reduced }: { reduced: boolean }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 18, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 18, mass: 0.45 });

  const rotX = useSpring(useTransform(smoothY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(smoothX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const items = [
    { icon: Mail, label: "Email", value: "rohitmoningi125@gmail.com", depth: CONTACT_DEPTHS[0] },
    { icon: MapPin, label: "Location", value: "Parlakhemundi, Odisha, India", depth: CONTACT_DEPTHS[1] },
  ];

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      variants={fadeUp(reduced, 20)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={reduced ? undefined : { perspective: 800 }}
      className="rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(28,25,23,0.96),rgba(41,37,36,0.96))] p-6 text-stone-50 shadow-[0_24px_65px_-34px_rgba(28,25,23,0.72)] sm:p-7"
    >
      <motion.div
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        className="relative"
      >
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
          <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Reach Out</p>
        </div>
        <div className="mt-8 space-y-4">
          {items.map((item, i) => (
            <Contact3DItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              smoothX={smoothX}
              smoothY={smoothY}
              depth={item.depth}
              reduced={reduced}
            />
          ))}
          <motion.div
            style={
              reduced
                ? undefined
                : {
                    x: useTransform(smoothX, [-0.5, 0.5], [-12 * CONTACT_DEPTHS[2], 12 * CONTACT_DEPTHS[2]]),
                    y: useTransform(smoothY, [-0.5, 0.5], [-8 * CONTACT_DEPTHS[2], 8 * CONTACT_DEPTHS[2]]),
                  }
            }
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-emerald-500/20">
              <span className="size-2 rounded-full bg-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">Availability</p>
              <p className="mt-1 text-sm text-stone-100">Open to full-time & freelance</p>
              <p className="mt-0.5 text-[11px] text-stone-500">Responds within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Contact3DItem({
  icon: Icon,
  label,
  value,
  smoothX,
  smoothY,
  depth,
  reduced,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
  depth: number;
  reduced: boolean;
}) {
  const itemX = useTransform(smoothX, [-0.5, 0.5], [-10 * depth, 10 * depth]);
  const itemY = useTransform(smoothY, [-0.5, 0.5], [-6 * depth, 6 * depth]);

  return (
    <motion.div
      style={reduced ? undefined : { x: itemX, y: itemY }}
      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
    >
      <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-white/10">
        <Icon className="size-4" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-stone-400">{label}</p>
        <p className="mt-1 text-sm text-stone-100">{value}</p>
      </div>
    </motion.div>
  );
}

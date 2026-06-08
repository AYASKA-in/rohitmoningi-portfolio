"use client";

import Link from "next/link";
import React from "react";
import {
  ArrowRight,
  Braces,
  Layers3,
  Menu,
  Sparkles,
  X,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { CountUp } from "@/components/count-up";
import { softTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HEADLINE = "Full-Stack Solutions Engineer";
const HEADLINE_WORDS = HEADLINE.split(" ");
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const menuItems = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const floatingCards = [
  {
    title: "B2B Systems",
    meta: "Interfaces and workflows that stay usable as complexity grows.",
    tag: "Product Engineering",
    offsetX: "-8%",
    offsetY: "6%",
    rotate: -8,
  },
  {
    title: "Research Builds",
    meta: "Readable technical outputs with a stronger interaction layer.",
    tag: "Applied Research",
    offsetX: "18%",
    offsetY: "-8%",
    rotate: 6,
  },
  {
    title: "Production Web Apps",
    meta: "Shipped experiences for clients, operations, and real users.",
    tag: "Frontend / Full-stack",
    offsetX: "8%",
    offsetY: "30%",
    rotate: -4,
  },
];

type FloatingCard = (typeof floatingCards)[number];

export function HeroSection() {
  const reduced = useReducedMotion();

  const spotlightX = useMotionValue(0.5);
  const spotlightY = useMotionValue(0.5);
  const smoothSpotX = useSpring(spotlightX, { stiffness: 120, damping: 22 });
  const smoothSpotY = useSpring(spotlightY, { stiffness: 120, damping: 22 });
  const spotBg = useTransform(
    [smoothSpotX, smoothSpotY],
    ([x, y]: number[]) => `radial-gradient(600px at ${x * 100}% ${y * 100}%, rgba(251,191,36,0.06), transparent 70%)`,
  );

  function handleHeroMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotlightX.set((e.clientX - rect.left) / rect.width);
    spotlightY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <div onPointerMove={handleHeroMove} className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8f4ec_0%,#fbfaf6_34%,#f2ede3_100%)] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.035 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduced ? undefined : { x: [-10, 12, -10], y: [0, 8, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute left-[-6%] top-[-8%] h-64 w-64 rounded-full bg-cyan-300/22 blur-3xl"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -10, 0], y: [0, 10, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute right-[4%] top-[10%] h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, 10, 0], y: [0, -8, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute bottom-[-10%] right-[18%] h-80 w-80 rounded-full bg-sky-200/18 blur-3xl"
        />
      </div>

      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotBg }}
        />
      )}

      <HeroHeader />

      <main id="main-content" className="relative z-10">
        <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-12 pt-28 sm:pt-32 lg:px-12 lg:pb-16 lg:pt-32">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(min(420px,100%),0.98fr)] lg:gap-10">
            <div className="max-w-2xl">
              <motion.p
                initial={reduced ? undefined : { y: 16, opacity: 0 }}
                animate={reduced ? undefined : { y: 0, opacity: 1 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/65 shadow-sm backdrop-blur sm:text-xs"
              >
                <Sparkles className="size-3.5 text-primary" />
                Product-minded engineering
              </motion.p>

              <motion.h1 className="max-w-xl text-balance text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-stone-950 sm:text-4xl md:text-5xl xl:text-[4.25rem]">
                {HEADLINE_WORDS.map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-0.5">
                    <motion.span
                      initial={reduced ? undefined : { clipPath: "inset(0 0 100% 0)" }}
                      animate={reduced ? undefined : { clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.35 + i * 0.08 }}
                      className="inline-block"
                    >
                      {word}{i < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={reduced ? undefined : { y: 16, opacity: 0, filter: "blur(4px)" }}
                animate={reduced ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
                className="mt-6 max-w-xl text-balance text-lg leading-8 text-stone-700"
              >
                I build production web apps, B2B systems, and research projects with a calm product lens and the execution to back it up.
              </motion.p>

              <motion.div
                initial={reduced ? undefined : { y: 16, opacity: 0, filter: "blur(4px)" }}
                animate={reduced ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.85, ease: EASE }}
                className="mt-8 flex flex-col items-start gap-3 sm:flex-row"
              >
                  <Magnetic reduced={Boolean(reduced)}>
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full bg-stone-950 px-5 text-base text-stone-50 shadow-[0_16px_40px_-18px_rgba(28,25,23,0.7)] hover:bg-stone-800"
                    >
                      <Link href="#projects">
                        View Projects
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </Magnetic>

                  <Magnetic reduced={Boolean(reduced)}>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-full border-stone-400/90 bg-white/70 px-5 text-base text-stone-800 backdrop-blur transition-all duration-200 hover:border-stone-600 hover:bg-white"
                    >
                      <Link href="#contact">Let&apos;s Talk</Link>
                    </Button>
                  </Magnetic>
                </motion.div>

                <motion.p
                  initial={reduced ? undefined : { y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={reduced ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
                  className="mt-6 max-w-xl text-sm leading-7 text-stone-600"
                >
                  Shipping across e-commerce, B2B operations, IEEE research, and product strategy.
                </motion.p>

                <motion.div
                  initial={reduced ? undefined : { y: 16, opacity: 0, filter: "blur(4px)" }}
                  animate={reduced ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 1.15, ease: EASE }}
                  className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
                >
                  <CountUp target={1} label="IEEE Publication" reduced={Boolean(reduced)} />
                  <CountUp target={3} label="Production Clients" reduced={Boolean(reduced)} />
                  <CountUp target={10} suffix="+" label="Shipped Projects" reduced={Boolean(reduced)} />
                  <CountUp target={1} label="Azure Certified" reduced={Boolean(reduced)} />
                </motion.div>
            </div>

            <HeroVisual />
          </div>
        </section>

        <motion.div
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-stone-400"
          >
            <span className="text-[10px] uppercase tracking-[0.24em] sm:text-xs">Scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="stroke-stone-400">
              <path d="M6 0V14M6 14L1 9M6 14L11 9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

const HeroHeader = () => {
  const reduced = useReducedMotion();
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.02);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  React.useEffect(() => {
    if (menuState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuState]);

  return (
    <motion.header
      initial={reduced ? undefined : { y: -20, opacity: 0 }}
      animate={reduced ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-0 top-0 z-30"
    >
      <nav aria-label="Primary" data-state={menuState ? "active" : "idle"} className="group px-4 pt-4 sm:px-6">
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/8 bg-white/72 px-4 py-2.5 shadow-[0_8px_30px_-20px_rgba(28,25,23,0.45)] backdrop-blur-xl transition-all duration-300 lg:px-5",
              scrolled && "bg-white/88 shadow-[0_14px_35px_-24px_rgba(28,25,23,0.5)]",
            )}
          >
          <Link
            href="/"
            className="flex items-center gap-3 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="home"
          >
            <img src="/logo.svg" alt="Moningi Rohit" className="size-10 shrink-0" />
            <div className="leading-snug">
              <p className="text-sm font-semibold tracking-[-0.02em] text-stone-950">
                Moningi Rohit
              </p>
              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <p className="text-[11px] tracking-[0.04em] text-stone-500">
                  Full-stack Solutions Engineer
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-6">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="relative text-sm text-stone-600 transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span className="relative">
                      {item.name}
                      <motion.span
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-stone-950"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setMenuState((value) => !value)}
            aria-label={menuState ? "Close Menu" : "Open Menu"}
            className="relative flex size-11 items-center justify-center rounded-full border border-stone-200 bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:hidden"
          >
            <Menu className="size-5 transition group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
            <X className="absolute size-5 scale-0 opacity-0 transition group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={
            menuState
              ? { height: "auto", opacity: 1, y: 0 }
              : { height: 0, opacity: 0, y: -8 }
          }
          transition={{ duration: 0.28, ease: EASE }}
          className="mx-auto max-w-7xl overflow-hidden pt-3 lg:hidden"
        >
          <div className="rounded-[1.75rem] border border-black/8 bg-white/90 p-5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.6)] backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuState(false)}
                  className="text-sm text-stone-700 transition hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

const HeroVisual = () => {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 18, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 18, mass: 0.45 });

  const haloX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const haloY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const rotX = useSpring(useTransform(smoothY, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const rotY = useSpring(useTransform(smoothX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={reduced ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative mx-auto w-full max-w-[560px]"
      style={reduced ? undefined : { perspective: 800 }}
    >
      <motion.div
        style={reduced ? undefined : { rotateX: rotX, rotateY: rotY }}
        className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.85),rgba(245,241,232,0.92))] p-5 shadow-[0_28px_80px_-36px_rgba(28,25,23,0.45)] backdrop-blur-xl sm:p-6"
      >
        <motion.div
          style={reduced ? undefined : { x: haloX, y: haloY }}
          className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(125,211,252,0.24),transparent_30%),radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.16),transparent_24%),radial-gradient(circle_at_55%_72%,rgba(255,255,255,0.9),transparent_38%)]"
        />

        <div className="relative rounded-[1.6rem] border border-white/70 bg-stone-950 p-5 text-stone-50 shadow-inner sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                Portfolio Snapshot
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                Calm systems, sharp product taste
              </h2>
            </div>
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10">
                  <Layers3 className="size-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
                    Focus
                  </p>
                  <p className="text-sm text-stone-100">
                    Product UX, interface systems, and shipping clarity
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.3rem] border border-white/10 bg-white/6 p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-white/10">
                  <Braces className="size-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
                    Stack
                  </p>
                  <p className="text-sm text-stone-100">
                    Next.js, TypeScript, APIs, ML, and production delivery
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 h-[320px] sm:h-[260px] rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
            <style>{`
              @media (max-width: 639px) {
                .floating-card {
                  width: 90% !important;
                  left: 5% !important;
                  rotate: 0deg !important;
                }
                .floating-card:nth-child(1) { top: 4% !important; }
                .floating-card:nth-child(2) { top: 34% !important; }
                .floating-card:nth-child(3) { top: 64% !important; }
              }
            `}</style>
            <div className="absolute inset-x-6 top-6 h-px bg-white/10" />
            <div className="absolute inset-x-6 bottom-6 h-px bg-white/5" />

            {floatingCards.map((card, index) => (
              <FloatingProjectCard
                key={card.title}
                card={card}
                index={index}
                smoothX={smoothX}
                smoothY={smoothY}
                reduced={Boolean(reduced)}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DEPTHS = [0.5, 1, 0.75];

function FloatingProjectCard({
  card,
  index,
  smoothX,
  smoothY,
  reduced,
}: {
  card: FloatingCard;
  index: number;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  const depth = DEPTHS[index] ?? 0.5;
  const cardX = useTransform(smoothX, [-0.5, 0.5], [-16 * depth, 16 * depth]);
  const cardY = useTransform(smoothY, [-0.5, 0.5], [-12 * depth, 12 * depth]);

  return (
    <motion.article
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, transition: softTransition(0.72, 0.3 + index * 0.1) }
      }
      whileHover={reduced ? undefined : { y: -8, scale: 1.018 }}
      transition={softTransition(0.3)}
      className="floating-card absolute w-[74%] rounded-[1.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.07))] p-4 shadow-[0_24px_40px_-26px_rgba(0,0,0,0.85)] backdrop-blur-md"
      style={{
        left: card.offsetX,
        top: card.offsetY,
        rotate: `${card.rotate}deg`,
        x: reduced ? 0 : cardX,
        y: reduced ? 0 : cardY,
      }}
    >
      <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400 sm:text-xs">
        {card.tag}
      </p>
      <h3 className="mt-3 text-base font-medium text-stone-50">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-300">{card.meta}</p>
    </motion.article>
  );
}

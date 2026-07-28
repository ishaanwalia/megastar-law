"use client";

// Scroll-driven card stack: each card pins, then shrinks as the next one
// slides over it, so the deck compresses into a spine as you scroll.
// Framer Motion only — no smooth-scroll library, the native scroller drives
// it fine. Falls back to a plain list under prefers-reduced-motion.

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Area = { slug: string; title: string; summary: string };

function StickyCard({
  area,
  i,
  total,
  progress,
}: {
  area: Area;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - i - 1) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-[16vh] flex h-[62vh] items-start justify-center">
      <motion.div
        style={{ scale, top: i * 18 }}
        className="relative w-full max-w-3xl origin-top overflow-hidden rounded-3xl border border-brand/20 bg-card/85 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_30px_70px_-40px_rgba(31,42,51,0.55)] backdrop-blur-xl sm:p-10"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        />
        <div className="flex items-start justify-between gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-brand tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Practice Area
          </span>
        </div>
        <h3 className="mt-6 font-heading text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
          {area.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {area.summary}
        </p>
        <Link
          href={`/practice-areas/${area.slug}`}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-ink"
        >
          Explore this practice
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>
    </div>
  );
}

export function StickyPracticeCards({ areas }: { areas: Area[] }) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <div className="mx-auto grid max-w-3xl gap-4">
        {areas.map((a) => (
          <Link
            key={a.slug}
            href={`/practice-areas/${a.slug}`}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/50"
          >
            <h3 className="font-heading text-xl font-medium">{a.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.summary}</p>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div ref={container} className="relative pb-[30vh]">
      {areas.map((area, i) => (
        <StickyCard
          key={area.slug}
          area={area}
          i={i}
          total={areas.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

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
import {
  ArrowUpRight,
  Building2,
  FileSignature,
  Gavel,
  HardHat,
  Handshake,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

type Area = { slug: string; title: string; summary: string };

// One mark per practice area; anything unmapped falls back to the scales.
const areaIcons: Record<string, LucideIcon> = {
  "criminal-cyber-crime": Gavel,
  "civil-litigation": Scale,
  "family-law": Users,
  "corporate-banking": Building2,
  arbitration: Handshake,
  "labour-law": HardHat,
  "legal-documentation": FileSignature,
};

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
  const Icon = areaIcons[area.slug] ?? Scale;
  const targetScale = 1 - (total - i - 1) * 0.04;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-[14vh] flex h-[42vh] items-start sm:top-[16vh] sm:h-[52vh] justify-center">
      <motion.div
        style={{ scale, top: i * 18 }}
        className="group relative w-full max-w-3xl origin-top overflow-hidden rounded-3xl border border-brand/20 bg-card/85 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_30px_70px_-40px_rgba(31,42,51,0.55)] backdrop-blur-xl sm:p-10"
      >
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
        />
        <div className="flex items-start justify-between gap-6">
          {/* The tile turns a full 360 on hover and holds — it comes back as
              the practice icon, never parks on a decorative arrow. */}
          <div className="[perspective:600px]">
            <div className="flex size-14 items-center justify-center rounded-xl bg-slate text-slate-foreground shadow-sm group-hover:animate-[icon-spin_1.1s_cubic-bezier(0.65,0,0.35,1)] motion-reduce:group-hover:animate-none">
              <Icon className="size-6" />
            </div>
          </div>
          <span className="font-mono text-xs tracking-[0.25em] text-brand tabular-nums">
            {String(i + 1).padStart(2, "0")}
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
    <div ref={container} className="relative pb-[18vh] sm:pb-[30vh]">
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

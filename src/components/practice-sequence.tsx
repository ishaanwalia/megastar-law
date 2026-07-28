"use client";

// One pinned section, four phases driven by a single scroll progress:
//
//   0  the marble plate is present from the start, transparent, no card —
//      every later phase overlays it.
//   1  practice cards rise from below and stack into a deck, upper right.
//   2  the "Where the firm appears" heading + paragraph rise and park in the
//      gap directly under the finished deck.
//   3  the credential rail tracks right-to-left across the bottom.
//
// Then the section releases. Falls back to a plain stacked layout under
// prefers-reduced-motion — no pinning, no transforms, all content present.

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
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
import { Justitia } from "@/components/justitia";

type Area = { slug: string; title: string; summary: string };
type Credential = { label: string; detail: string };

const areaIcons: Record<string, LucideIcon> = {
  "criminal-cyber-crime": Gavel,
  "civil-litigation": Scale,
  "family-law": Users,
  "corporate-banking": Building2,
  arbitration: Handshake,
  "labour-law": HardHat,
  "legal-documentation": FileSignature,
};

// Phase boundaries in section progress.
const CARDS_END = 0.56;
const HEAD_END = 0.68;

function DeckCard({
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
  const step = CARDS_END / total;
  const start = i * step;
  const end = start + step * 0.9;

  // Skiper's stacking model: a card arrives at full size, then keeps shrinking
  // for the rest of the phase as later cards land on top of it. That is what
  // compresses the deck into a spine — fixed rest offsets just look like a
  // pile. Each card also holds a small vertical offset so its top edge stays
  // visible above the one in front.
  const targetScale = Math.max(0.62, 1 - (total - 1 - i) * 0.055);
  const restY = -(total - 1 - i) * 14;

  const y = useTransform(progress, [start, end], [restY + 460, restY]);
  const scale = useTransform(progress, [start, CARDS_END], [1, targetScale]);
  const opacity = useTransform(progress, [start, start + step * 0.3], [0, 1]);

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: i }}
      className="liquid-glass-deck group/card absolute inset-x-0 top-0 origin-top rounded-3xl p-6 shadow-lg sm:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="[perspective:600px]">
          <div className="flex size-12 items-center justify-center rounded-xl bg-slate text-slate-foreground shadow-sm group-hover/card:animate-[icon-spin_1.1s_cubic-bezier(0.65,0,0.35,1)] motion-reduce:group-hover/card:animate-none sm:size-14">
            <Icon className="size-5 sm:size-6" />
          </div>
        </div>
        <span className="font-mono text-xs tracking-[0.25em] text-brand tabular-nums">
          {String(i + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-xl leading-tight font-medium tracking-tight sm:text-2xl">
        {area.title}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {area.summary}
      </p>
      <Link
        href={`/practice-areas/${area.slug}`}
        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-ink"
      >
        Explore this practice
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

function RailCard({ c, i }: { c: Credential; i: number }) {
  return (
    <article className="liquid-glass flex w-64 shrink-0 flex-col rounded-2xl p-5 sm:w-80">
      <span className="font-mono text-xs text-brand tabular-nums">
        {String(i + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 font-heading text-lg leading-tight font-medium">
        {c.label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {c.detail}
      </p>
    </article>
  );
}

export function PracticeSequence({
  areas,
  credentials,
}: {
  areas: Area[];
  credentials: Credential[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // How far the rail must move to bring its last card fully into view.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view) return;
      setTravel(Math.max(0, track.scrollWidth - view.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, []);

  const headY = useTransform(scrollYProgress, [CARDS_END, HEAD_END], [70, 0]);
  const headOpacity = useTransform(
    scrollYProgress,
    [CARDS_END, CARDS_END + (HEAD_END - CARDS_END) * 0.6],
    [0, 1]
  );
  const railX = useTransform(scrollYProgress, [HEAD_END, 0.98], [0, -travel]);

  const heading = (
    <>
      <h2 className="font-heading text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
        Where the firm appears
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Forums Pradeep is enrolled in or regularly appears before — drawn from
        his bar enrolment, not from network boilerplate.
      </p>
    </>
  );

  if (reduceMotion) {
    return (
      <section className="relative px-5 py-16 sm:px-8 lg:px-14 xl:px-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            Practice Areas
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/practice-areas/${a.slug}`}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-heading text-lg font-medium">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {a.summary}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12">{heading}</div>
          <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
            {credentials.map((c, i) => (
              <RailCard key={c.label} c={c} i={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={container} className="relative h-[420vh]">
      <div className="sticky top-18 h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="mx-auto flex h-full max-w-7xl flex-col px-4 pt-8 pb-6 sm:px-6 lg:px-8 xl:px-12">
          <div className="relative z-30 flex shrink-0 flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
              Practice Areas
            </h2>
            <Link
              href="/practice-areas"
              className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="relative mt-5 grid min-h-0 flex-1 gap-x-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
            {/* Phase 0 — the plate. No card, no border: on mobile it sits
                behind everything, on desktop it holds the left column. */}
            <Justitia
              src="/hero-marble-alpha.webp"
              sizes="(max-width: 1024px) 80vw, 20rem"
              className="inset-0 scale-x-[-1] lg:inset-auto lg:top-0 lg:-bottom-6 lg:left-0 lg:w-[26rem]"
              imageClassName="object-contain object-bottom opacity-45 lg:opacity-100"
            />

            {/* Phases 1 + 2 — deck, then the heading parking beneath it. */}
            <div className="relative col-start-1 flex min-h-0 flex-col lg:col-start-2">
              <div className="relative min-h-0 flex-[3]">
                {areas.map((area, i) => (
                  <DeckCard
                    key={area.slug}
                    area={area}
                    i={i}
                    total={areas.length}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
              <motion.div
                style={{ y: headY, opacity: headOpacity }}
                className="relative z-20 shrink-0 pt-5"
              >
                {heading}
              </motion.div>
            </div>
          </div>

          {/* Phase 3 — the rail, full width beneath both columns. */}
          <div ref={viewportRef} className="mt-5 shrink-0 overflow-hidden">
            <motion.div ref={trackRef} style={{ x: railX }} className="flex gap-4">
              {credentials.map((c, i) => (
                <RailCard key={c.label} c={c} i={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

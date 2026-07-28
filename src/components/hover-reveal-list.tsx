"use client";

// Editorial index rows with a cursor-following plate reveal.
//
// Differences from the reference: no circular "View" badge, and the plate is a
// soft rounded frame rather than a hard rectangle on a colour block — the
// badge fights the row's own arrow, and the block reads as a placeholder.
// Springs come from framer-motion, already a dependency; GSAP's quickTo would
// be a second animation runtime for one effect.

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Area = { slug: string; title: string; summary: string };

export function HoverRevealList({ areas }: { areas: Area[] }) {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Two different stiffnesses give the plate its trailing drift.
  const sx = useSpring(x, { stiffness: 170, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  function point(e: React.MouseEvent) {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return null;
    return { px: e.clientX - r.left, py: e.clientY - r.top };
  }

  function onMove(e: React.MouseEvent) {
    const p = point(e);
    if (!p) return;
    x.set(p.px);
    y.set(p.py);
  }

  // Snap on entry. Without this the plate springs in from the origin, which
  // reads as a glitch on the first hover of the page.
  function onEnter(e: React.MouseEvent, i: number) {
    const p = point(e);
    if (p) {
      x.jump(p.px);
      y.jump(p.py);
      sx.jump(p.px);
      sy.jump(p.py);
    }
    setActive(i);
  }

  return (
    <div
      ref={wrap}
      onMouseMove={reduceMotion ? undefined : onMove}
      onMouseLeave={() => setActive(null)}
      className="relative mt-12"
    >
      <ul className="border-t border-border">
        {areas.map((area, i) => (
          <li key={area.slug} className="border-b border-border">
            <Link
              href={`/practice-areas/${area.slug}`}
              onMouseEnter={(e) => onEnter(e, i)}
              onFocus={() => setActive(i)}
              className="group flex items-center justify-between gap-6 py-7 transition-opacity duration-200 sm:py-9"
            >
              <div className="min-w-0">
                <h2 className="font-heading text-2xl leading-tight font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                  {area.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground transition-transform duration-300 group-hover:translate-x-2">
                  {area.summary}
                </p>
              </div>
              <ArrowUpRight className="size-6 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand" />
            </Link>
          </li>
        ))}
      </ul>

      {!reduceMotion && (
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key="plate"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.86 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute top-0 left-0 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            >
              <div className="relative h-56 w-80 overflow-hidden rounded-2xl border border-white/40 bg-ink shadow-[0_30px_70px_-30px_rgba(31,42,51,0.6)]">
                {areas.map((a, i) => (
                  <Image
                    key={a.slug}
                    src={`/practice/${a.slug}.webp`}
                    alt=""
                    fill
                    sizes="20rem"
                    className={`object-cover transition-opacity duration-300 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

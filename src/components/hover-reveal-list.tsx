"use client";

// Editorial index rows with a cursor-following plate reveal.
//
// Differences from the reference: no circular "View" badge, and the plate is a
// soft rounded frame rather than a hard rectangle on a colour block — the
// badge fights the row's own arrow, and the block reads as a placeholder.
// Springs come from framer-motion, already a dependency; GSAP's quickTo would
// be a second animation runtime for one effect.
//
// The plate is a live "small screen" preview, not a static image: it embeds
// the real /practice-areas/[slug] route in an iframe, rendered at desktop
// width and scaled down to fit. Keying the iframe on `active` forces a fresh
// mount per hover, so the destination page's own entrance animation plays out
// again each time — that's the "site loading in real time" effect.

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

// Plate is 20rem x 14rem (w-80 h-56); the chrome bar eats a fixed 24px off
// the top, the rest is the scaled iframe viewport.
const PLATE_W = 320;
const PLATE_H = 224;
const CHROME_H = 24;
const VIEWPORT_W = 1280;
const SCALE = PLATE_W / VIEWPORT_W;
const VIEWPORT_H = (PLATE_H - CHROME_H) / SCALE;

type Area = { slug: string; title: string; summary: string };

export function HoverRevealList({ areas }: { areas: Area[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Track *which* row finished loading rather than a bare boolean. A fresh
  // iframe mounts per hover, so "loaded" is derived by comparison — no effect
  // needed to reset it, and the skeleton can never show a stale last frame.
  const [loadedFor, setLoadedFor] = useState<number | null>(null);
  const loaded = loadedFor !== null && loadedFor === active;
  const reduceMotion = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);

  // A same-origin iframe can finish loading before React attaches the onLoad
  // prop (fast/cached navigations especially), which leaves the skeleton
  // stuck forever. A callback ref checks readyState immediately as a
  // fallback, in addition to listening for a load that hasn't happened yet.
  function handlePlateRef(node: HTMLIFrameElement | null) {
    if (!node) return;
    if (node.contentDocument?.readyState === "complete") {
      setLoadedFor(active);
    }
  }

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
              <div className="h-56 w-80 overflow-hidden rounded-2xl border border-white/40 bg-ink shadow-[0_30px_70px_-30px_rgba(31,42,51,0.6)]">
                {/* Mini browser chrome — sells the "small screen" framing. */}
                <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-black/30 px-3">
                  <span className="size-1.5 rounded-full bg-white/25" />
                  <span className="size-1.5 rounded-full bg-white/25" />
                  <span className="size-1.5 rounded-full bg-white/25" />
                  <span className="ml-2 truncate text-[9px] text-white/40">
                    megastar-law.vercel.app/practice-areas/{areas[active].slug}
                  </span>
                </div>

                <div className="relative h-[calc(100%-1.5rem)] w-full overflow-hidden bg-ink">
                  {/* Skeleton shows through until the fresh iframe fires onLoad. */}
                  <div
                    className={`absolute inset-0 animate-pulse bg-white/5 transition-opacity duration-300 ${
                      loaded ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <iframe
                    key={areas[active].slug}
                    ref={handlePlateRef}
                    src={`/practice-areas/${areas[active].slug}`}
                    title={`${areas[active].title} — live preview`}
                    tabIndex={-1}
                    aria-hidden="true"
                    onLoad={() => setLoadedFor(active)}
                    className={`pointer-events-none absolute top-0 left-0 origin-top-left border-0 transition-opacity duration-300 ${
                      loaded ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      width: VIEWPORT_W,
                      height: VIEWPORT_H,
                      transform: `scale(${SCALE})`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

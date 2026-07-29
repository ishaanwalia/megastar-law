"use client";

// One pinned section, four phases driven by a single scroll progress:
//
//   0  the marble plate is present from the start, transparent, no card —
//      every later phase overlays it.
//   1  practice cards rise from below and stack into a deck, upper right.
//   2  the deck fades out COMPLETELY, then the "Where the firm appears"
//      heading rises into the space it vacated. The two never share the
//      screen — overlapping them read as a collision at every width.
//   3  the credential rail tracks right-to-left across the bottom.
//
// Then the section releases. Falls back to a plain stacked layout under
// prefers-reduced-motion — no pinning, no transforms, all content present.

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
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
//   CARDS_END  last card lands, deck complete
//   DECK_HOLD  deck sits still so the finished stack can actually be read
//   DECK_OUT   deck is at zero opacity — nothing of it is painted past here
//   HEAD_END   heading fully arrived; the rail takes over from here
// The heading's window starts at DECK_OUT, not before, so there is no scroll
// position at which cards and heading are both on screen.
const CARDS_END = 0.52;
const DECK_HOLD = 0.58;
const DECK_OUT = 0.66;
const HEAD_END = 0.78;

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
  const restY = (total - 1 - i) * -14 + (total - 1) * 14;

  const y = useTransform(progress, [start, end], [restY + 460, restY]);
  const scale = useTransform(progress, [start, CARDS_END], [1, targetScale]);
  // Fade in on arrival AND out on exit, in one transform off the same scroll
  // progress. Doing the exit here rather than as an opacity on a wrapper
  // matters: the section re-renders mid-scroll (setTravel fires from the
  // ResizeObserver as the deck moves) and a wrapper-level opacity motion value
  // gets stranded at its progress-0 value when that happens, which is what put
  // the cards back on screen underneath the heading. Per-card opacity is on
  // the same code path as the fade-in, which never had the problem.
  const opacity = useTransform(
    progress,
    [start, start + step * 0.3, DECK_HOLD, DECK_OUT],
    [0, 1, 1, 0]
  );

  return (
    <motion.article
      style={{ y, scale, opacity, zIndex: i }}
      className="liquid-glass-deck group/card absolute inset-x-0 top-0 origin-top rounded-3xl p-6 shadow-lg [will-change:transform] sm:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="[perspective:600px]">
          <div className="flex size-12 items-center justify-center rounded-xl border border-brand/25 bg-brand/12 text-brand shadow-sm group-hover/card:animate-[icon-spin_1.1s_cubic-bezier(0.65,0,0.35,1)] motion-reduce:group-hover/card:animate-none sm:size-14">
            <Icon className="size-5 sm:size-6" />
          </div>
        </div>
        <span className="font-mono text-xs text-brand tabular-nums">
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

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // How far the rail must move to bring its last card fully into view.
  //
  // A motion value, NOT state, and this is the important part: state here made
  // the component re-render mid-scroll, because the ResizeObserver fires while
  // the deck is moving. Every re-render stranded the wrapper-level opacity
  // motion values at their progress-0 readings — transforms got re-applied by
  // the frame loop, opacity did not — which is how faded-out cards reappeared
  // underneath the heading. With no state, this component never re-renders
  // after mount and nothing can be stranded.
  const travel = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const view = viewportRef.current;
      if (!track || !view) return;
      travel.set(Math.max(0, track.scrollWidth - view.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [travel]);

  // Deck clears out first, heading comes in after — strictly sequential. The
  // deck lifts and shrinks on the way out so it reads as leaving to make room;
  // its fade lives on the cards themselves (see DeckCard).
  const deckY = useTransform(scrollYProgress, [DECK_HOLD, DECK_OUT], [0, -60]);
  const deckScale = useTransform(scrollYProgress, [DECK_HOLD, DECK_OUT], [1, 0.94]);
  // Invisible cards must stop swallowing taps on whatever is underneath.
  const deckEvents = useTransform(scrollYProgress, (p) =>
    p >= DECK_OUT ? "none" : "auto"
  );
  // Hard cutoffs, not just a fade. `visibility` flips discretely at the phase
  // boundary, so past DECK_OUT the deck and its title cannot be on screen no
  // matter what the opacity interpolation does — the fade is only there to
  // make the switch look smooth, never to enforce it.
  const deckVisibility = useTransform(scrollYProgress, (p) =>
    p >= DECK_OUT ? "hidden" : "visible"
  );
  const headVisibility = useTransform(scrollYProgress, (p) =>
    p >= DECK_OUT ? "visible" : "hidden"
  );
  // The section title exits on the deck's own schedule — same window, so they
  // read as one block leaving together.
  const titleY = useTransform(scrollYProgress, [DECK_HOLD, DECK_OUT], [0, -40]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [DECK_HOLD, DECK_OUT],
    [1, 0]
  );
  const titleEvents = useTransform(scrollYProgress, (p) =>
    p >= DECK_OUT ? "none" : "auto"
  );
  const headY = useTransform(scrollYProgress, [DECK_OUT, HEAD_END], [40, 0]);
  const headOpacity = useTransform(
    scrollYProgress,
    [DECK_OUT, DECK_OUT + (HEAD_END - DECK_OUT) * 0.6],
    [0, 1]
  );
  // Reads travel at call time, so a late measurement needs no re-render.
  const railX = useTransform(scrollYProgress, (p) => {
    const t = Math.min(1, Math.max(0, (p - HEAD_END) / (0.98 - HEAD_END)));
    return -t * travel.get();
  });

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

  // Only true in the pinned build — the reduced-motion rail is a plain
  // horizontal scroller and scrolling the page does nothing to it.
  const railHint = (
    <p className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground/70 uppercase">
      Keep scrolling — the rail moves with you
    </p>
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

  // ponytail: the no-JS <noscript> mirror of this whole section is gone. It
  // shipped a second full copy of both lists into every response, which is what
  // every text/accessibility extraction was picking up as duplicated Practice
  // Areas and duplicated credentials — invisible in a browser, present in the
  // markup. Bring it back only if no-JS traffic ever shows up in analytics;
  // Googlebot and screen readers both run JS and see the real section.
  return (
    <section ref={container} className="relative h-[420vh]">
      <div className="sticky top-18 h-[calc(100svh-4.5rem)] overflow-hidden">
        <div className="mx-auto flex h-full max-w-7xl flex-col px-4 pt-6 pb-3 sm:px-6 sm:pt-8 sm:pb-6 lg:px-8 xl:px-12">
          {/* The "Practice Areas" title belongs to the cards, so it leaves with
              them — a Practice Areas heading still sitting over the credential
              rail contradicts what is on screen. "Where the firm appears" then
              rises into the slot the title vacates, so there is always exactly
              one heading and it always names the content beneath it. */}
          <div className="relative z-30 shrink-0">
            <motion.div
              style={{
                y: titleY,
                opacity: titleOpacity,
                visibility: deckVisibility,
                pointerEvents: titleEvents,
              }}
              className="flex flex-wrap items-end justify-between gap-4"
            >
              <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
                Practice Areas
              </h2>
              <Link
                href="/practice-areas"
                className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
              >
                View all <ArrowRight className="size-3.5" />
              </Link>
            </motion.div>

            <motion.div
              style={{
                y: headY,
                opacity: headOpacity,
                visibility: headVisibility,
              }}
              className="absolute inset-x-0 top-0"
            >
              {heading}
              {railHint}
            </motion.div>
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

            {/* Phases 1 + 2 — deck, then the heading taking over the space the
                deck vacates. Both are absolutely positioned in the same box so
                the heading does not have to fit in a gap below a stack that is
                taller than its container. */}
            <div className="relative col-start-1 min-h-0 lg:col-start-2">
              <motion.div
                style={{
                  y: deckY,
                  scale: deckScale,
                  visibility: deckVisibility,
                  pointerEvents: deckEvents,
                }}
                className="absolute inset-0 origin-top [will-change:transform]"
              >
                {areas.map((area, i) => (
                  <DeckCard
                    key={area.slug}
                    area={area}
                    i={i}
                    total={areas.length}
                    progress={scrollYProgress}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Phase 3 — the rail, full width beneath both columns. */}
          <div className="mt-4 h-px w-full shrink-0 bg-border">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-px origin-left bg-brand"
            />
          </div>

          <div ref={viewportRef} className="mt-5 shrink-0 overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x: railX }}
              className="flex gap-4 [will-change:transform]"
            >
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

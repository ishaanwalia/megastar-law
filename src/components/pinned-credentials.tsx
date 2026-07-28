"use client";

// Credentials rail: the section pins while the row of cards tracks sideways
// with scroll. Track length is derived from the row's real width, so adding a
// credential doesn't require re-tuning any magic numbers.

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export type Credential = { label: string; detail: string };

export function PinnedCredentials({
  heading,
  items,
}: {
  heading: string;
  items: Credential[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  // Cards are w-80 (20rem) + gap-6 (1.5rem); shift by everything past the
  // first screenful, expressed in the same units so it stays honest.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0rem", `-${Math.max(0, items.length - 2) * 21.5}rem`]
  );

  const cards = items.map((c) => (
    <div
      key={c.label}
      className="flex w-80 shrink-0 flex-col justify-between rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-sm"
    >
      <div className="font-heading text-lg leading-tight font-medium">
        {c.label}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{c.detail}</p>
    </div>
  ));

  if (reduceMotion) {
    return (
      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-14">
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            {heading}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={container}
      className="relative border-t border-border"
      style={{ height: `${100 + items.length * 34}vh` }}
    >
      <div className="sticky top-18 flex h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-14">
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep scrolling — the rail moves with you.
          </p>
        </div>
        <motion.div
          style={{ x }}
          className="mt-10 flex gap-6 pl-5 sm:pl-8 lg:pl-[max(3.5rem,calc((100vw-80rem)/2+3.5rem))]"
        >
          {cards}
        </motion.div>
      </div>
    </section>
  );
}

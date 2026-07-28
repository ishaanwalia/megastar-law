"use client";

// The plate seen THROUGH the letterforms: an SVG <text> mask over the image,
// with the image's scale driven by scroll. One SVG, no canvas, no per-letter
// DOM. Falls back to plain text under prefers-reduced-motion.

import { useId, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function MaskedHeadline({
  lines,
  image,
  className,
}: {
  lines: [string, string];
  image: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const maskId = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  if (reduceMotion) {
    return (
      <h2
        className={`font-heading text-5xl leading-[0.95] font-medium tracking-tight ${className ?? ""}`}
      >
        {lines[0]}
        <br />
        {lines[1]}
      </h2>
    );
  }

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox="0 0 100 34"
        role="img"
        aria-label={`${lines[0]} ${lines[1]}`}
        className="w-full"
      >
        <defs>
          <mask id={maskId}>
            <rect width="100" height="34" fill="black" />
            <text
              x="0"
              y="14"
              fill="white"
              fontSize="15"
              fontWeight="500"
              letterSpacing="-0.5"
              fontFamily="var(--font-fraunces), serif"
            >
              {lines[0]}
            </text>
            <text
              x="0"
              y="30"
              fill="white"
              fontSize="15"
              fontWeight="500"
              letterSpacing="-0.5"
              fontFamily="var(--font-fraunces), serif"
            >
              {lines[1]}
            </text>
          </mask>
        </defs>
        <motion.image
          href={image}
          x="-15"
          y="-15"
          width="130"
          height="64"
          preserveAspectRatio="xMidYMid slice"
          mask={`url(#${maskId})`}
          style={{ scale, y, originX: 0.5, originY: 0.5 }}
        />
      </svg>
    </div>
  );
}

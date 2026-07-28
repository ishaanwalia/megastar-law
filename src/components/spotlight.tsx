"use client";

// Cursor-follow glow, adapted from Skiper UI's spring mouse-follow primitive
// (@skiper-ui/skiper61 — https://skiper-ui.com/v1/skiper61) for card hover
// states instead of a floating dot. Attribution required per its free-tier
// license.

import { useMotionValue, useSpring, motion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.1, damping: 20, stiffness: 200 };

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useMotionValue(0);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={() => opacity.set(0)}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
        style={{ left: x, top: y, opacity }}
      />
      {children}
    </div>
  );
}

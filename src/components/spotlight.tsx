"use client";

// Cursor-follow glow + 3D tilt, adapted from Skiper UI's spring
// mouse-follow primitive (@skiper-ui/skiper61 —
// https://skiper-ui.com/v1/skiper61) for card hover states instead of a
// floating dot. Attribution required per its free-tier license.

import { useMotionValue, useSpring, motion } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const GLOW_SPRING = { mass: 0.1, damping: 20, stiffness: 200 };
const TILT_SPRING = { mass: 0.3, damping: 18, stiffness: 150 };

export function Spotlight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useSpring(0, GLOW_SPRING);
  const y = useSpring(0, GLOW_SPRING);
  const opacity = useMotionValue(0);
  const rotateX = useSpring(0, TILT_SPRING);
  const rotateY = useSpring(0, TILT_SPRING);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - bounds.left;
    const py = e.clientY - bounds.top;
    x.set(px);
    y.set(py);
    rotateY.set(((px / bounds.width) - 0.5) * 10);
    rotateX.set(((py / bounds.height) - 0.5) * -10);
  }

  function handlePointerLeave() {
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl"
        style={{ left: x, top: y, opacity }}
      />
      {children}
    </motion.div>
  );
}

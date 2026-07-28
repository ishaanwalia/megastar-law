"use client";

// Cursor-follow glow (Skiper UI, @skiper-ui/skiper61 —
// https://skiper-ui.com/v1/skiper61) combined with the tilt+zoom mechanic
// from Originkit's Flip Gallery — direct style writes on move instead of a
// spring, for a snappier response distinct from the glow's soft easing.
// Zoom ratio brought down from that component's 1.23 (built for one large
// hero image) to 1.03, sane for cards sitting in a tight grid.

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

const GLOW_SPRING = { mass: 0.1, damping: 20, stiffness: 200 };
const TILT_LIMIT = 8; // degrees
const ZOOM = 1.03;

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
  const tiltRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - bounds.left;
    const py = e.clientY - bounds.top;
    x.set(px);
    y.set(py);

    const el = tiltRef.current;
    if (!el) return;
    const tiltX = (py / bounds.height - 0.5) * -(TILT_LIMIT * 2);
    const tiltY = (px / bounds.width - 0.5) * (TILT_LIMIT * 2);
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${ZOOM}, ${ZOOM}, ${ZOOM})`;
  }

  function handlePointerLeave() {
    opacity.set(0);
    if (tiltRef.current) tiltRef.current.style.transform = "";
  }

  return (
    <div
      ref={tiltRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => opacity.set(1)}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative overflow-hidden transition-transform duration-200 ease-out",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-10 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-3xl"
        style={{ left: x, top: y, opacity }}
      />
      {children}
    </div>
  );
}

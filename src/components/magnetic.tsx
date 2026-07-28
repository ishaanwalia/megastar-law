"use client";

// Magnetic hover: the child drifts toward the pointer while it is within
// `range` px of the element's centre, then springs back. Pointer-driven only
// — no scroll work, no layout reads outside the move handler.

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function Magnetic({
  children,
  range = 90,
  pull = 0.32,
  className,
}: {
  children: ReactNode;
  range?: number;
  pull?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  if (reduceMotion) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) > range + Math.max(r.width, r.height) / 2) return;
        x.set(dx * pull);
        y.set(dy * pull);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

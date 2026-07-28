"use client";

// Count-up-on-scroll number, adapted from Skiper UI's animated-number
// primitive (@skiper-ui/skiper37 — https://skiper-ui.com/v1/skiper37) using
// its NumberFlow + useInView approach. Attribution required per its
// free-tier license.

import { useEffect, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { useInView } from "react-intersection-observer";

export function StatNumber({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  return (
    <span ref={ref}>
      <NumberFlow value={display} prefix={prefix} suffix={suffix} />
    </span>
  );
}

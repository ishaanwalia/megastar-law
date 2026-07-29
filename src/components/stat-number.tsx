"use client";

// Count-up-on-scroll number, adapted from Skiper UI's animated-number
// primitive (@skiper-ui/skiper37 — https://skiper-ui.com/v1/skiper37) using
// its NumberFlow + useInView approach. Attribution required per its
// free-tier license.

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue } from "framer-motion";
import NumberFlow, { type Format } from "@number-flow/react";
import { useInView } from "react-intersection-observer";

// NumberFlow accepts a narrower set than Intl.NumberFormatOptions; re-export
// it so callers declare their stat formats against the type that is enforced.
export type StatFormat = Format;

export function StatNumber({
  value,
  prefix,
  suffix,
  format,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  format?: Format;
}) {
  // Rest state is the REAL value, not 0. Starting at 0 meant the server sent
  // "0+" and anything that never satisfied the in-view threshold — a
  // backgrounded tab, a crawler, an accessibility snapshot — kept it. The
  // count-up now drops to 0 only at the moment it is actually going to run.
  const [display, setDisplay] = useState(value);
  const motionValue = useMotionValue(0);
  const started = useRef(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    // Fires exactly once, on the scroll that brings the card into view — it
    // is the animation's own start frame, not a render cascade.
    setDisplay(0);
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, motionValue]);

  // NumberFlow renders into a shadow root, and every digit 0-9 is present in
  // it at once — only CSS transforms decide which one you see. Its host
  // element carries no aria-label, so the accessible name and anything reading
  // the page as text got either nothing or "0123456789". The real figure lives
  // in a visually-hidden span; the odometer is decoration on top of it.
  const label = `${prefix ?? ""}${new Intl.NumberFormat("en-IN", format).format(
    value
  )}${suffix ?? ""}`;

  return (
    <span ref={ref}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        <NumberFlow
          value={display}
          prefix={prefix}
          suffix={suffix}
          format={format}
        />
      </span>
    </span>
  );
}

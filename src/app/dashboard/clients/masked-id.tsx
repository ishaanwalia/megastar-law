"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Aadhaar/PAN numbers are stored readable in the database (so they stay
 * searchable and exportable) but are masked on screen by default — the
 * realistic exposure here is someone glancing at the CRM in a shared chamber,
 * not a database breach.
 */
export function MaskedId({ value }: { value: string }) {
  const [revealed, setRevealed] = useState(false);
  const tail = value.slice(-4);
  const masked = `${"•".repeat(Math.max(value.length - 4, 0))}${tail}`;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={revealed ? undefined : "tracking-[0.15em]"}>
        {revealed ? value : masked}
      </span>
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        className="text-muted-foreground transition-colors hover:text-foreground"
        aria-label={revealed ? "Hide ID number" : "Reveal ID number"}
      >
        {revealed ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
      </button>
    </span>
  );
}

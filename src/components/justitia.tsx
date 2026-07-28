import Image from "next/image";
import { cn } from "@/lib/utils";

// The sculpture as its own layer, above the shader and never sampled into it.
//
// The plates ship with a real alpha channel, cut at build once the backdrop
// was flat-fielded to pure white. Blend modes were fragile - multiply only
// erases the backdrop when the element shares a stacking context with
// something painted, which is why one instance worked and three did not.
export function Justitia({
  src,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 640px) 70vw, 45vw",
  // Plates ship pre-flattened (levels stretch at build), so no per-plate CSS
  // clip is needed — this is only a nudge for edge cases.
  brightness = 1,
  // Soft ivory pool behind the sculpture. Glass or not, rib highlights
  // reading THROUGH her legs looked like a light source under the plinth.
  scrim = false,
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  brightness?: number;
  scrim?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
    >
      {scrim && (
        <div
          className="absolute inset-0 [background:radial-gradient(closest-side_at_58%_62%,var(--background)_0%,color-mix(in_oklch,var(--background),transparent_35%)_55%,transparent_78%)]"
        />
      )}
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        style={{ filter: `brightness(${brightness}) contrast(1.04) saturate(0.12)` }}
        className={cn(
          "object-contain object-bottom",
          imageClassName
        )}
      />
    </div>
  );
}

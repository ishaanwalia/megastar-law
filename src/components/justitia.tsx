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
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  brightness?: number;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute select-none", className)}
    >
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

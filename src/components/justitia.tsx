import Image from "next/image";
import { cn } from "@/lib/utils";

// The sculpture as its own layer, above the shader and never sampled into it.
//
// The plates are tight crops on a studio backdrop that carries a soft warm
// vignette. `multiply` alone left that vignette as a visible shade, so the
// white point is clipped first: brightness pushes the backdrop past 255 where
// multiply drops it to nothing, while the sculpture's mid-tones survive.
// This beats alpha matting — a transparent glass object has specular
// highlights brighter than its own backdrop, so no threshold cuts it cleanly.
export function Justitia({
  src,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 640px) 70vw, 45vw",
  // Per-plate: the marble is far lighter than the crystal, so the clip that
  // erases the crystal's backdrop erases the marble sculpture along with it.
  brightness = 1.09,
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
        style={{ filter: `brightness(${brightness}) contrast(1.06) saturate(0.15)` }}
        className={cn(
          "object-contain object-bottom mix-blend-multiply",
          imageClassName
        )}
      />
    </div>
  );
}

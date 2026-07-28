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
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
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
        className={cn(
          "object-contain object-bottom mix-blend-multiply",
          "[filter:brightness(1.09)_contrast(1.06)_saturate(0.15)]",
          imageClassName
        )}
      />
    </div>
  );
}

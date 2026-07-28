import Image from "next/image";
import { cn } from "@/lib/utils";

// The sculpture as its own layer, above the shader and never sampled into it.
// No matting needed: the plates are shot on flat white and every surface she
// sits on is ivory, so `mix-blend-mode: multiply` drops the backdrop to
// nothing while keeping her edges and the chain links intact — far cleaner
// than any threshold-based cutout of a transparent glass object.
export function Justitia({
  src,
  className,
  priority,
}: {
  src: string;
  className?: string;
  priority?: boolean;
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
        sizes="(max-width: 640px) 65vw, 45vw"
        className="object-contain object-right-bottom mix-blend-multiply contrast-[1.12] saturate-0"
      />
    </div>
  );
}

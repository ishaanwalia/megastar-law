import { cn } from "@/lib/utils";

/** Looping credential ticker. Pure CSS (translateX keyframe), pauses under
 * prefers-reduced-motion via the motion-safe: variant instead of just
 * slowing down. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="flex w-max motion-safe:animate-[marquee-scroll_28s_linear_infinite] hover:[animation-play-state:paused]">
        {/* Second pass is the seamless-loop clone, not content — hidden from
            the accessibility tree so the list is not announced twice. */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="flex items-center gap-3 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap"
          >
            {item}
            <span aria-hidden className="text-brand">
              &middot;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

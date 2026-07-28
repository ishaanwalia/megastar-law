import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Marks a spot on the page where real photography belongs.
 * The gradient previews the ink+gold duotone treatment real photos should
 * get once supplied (design-direction audit, Exhibit B) — swap this for a
 * next/image once the client sends the shot.
 */
export function PhotoPlaceholder({
  label,
  hint,
  aspect = "aspect-[4/5]",
  className,
}: {
  label: string;
  hint?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gold/40 bg-gradient-to-br from-primary/90 via-primary/70 to-gold/40 p-6 text-center",
        aspect,
        className
      )}
    >
      <Camera className="size-6 text-primary-foreground/70" />
      <p className="text-sm font-medium text-primary-foreground">{label}</p>
      {hint && (
        <p className="max-w-[22ch] text-xs text-primary-foreground/70">
          {hint}
        </p>
      )}
    </div>
  );
}

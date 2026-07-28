import type { Metadata } from "next";
import { GlassHeroBg } from "@/components/glass-hero-bg";

// Side-by-side of the two hero plates through the same glass shader, so the
// choice can be made against the real headline instead of a static mockup.
// Unlisted and noindex — delete this route once a plate is picked.
export const metadata: Metadata = {
  title: "Hero plate preview",
  robots: { index: false, follow: false },
};

const plates = [
  { src: "/hero-glass.webp", label: "A — Glass / crystal" },
  { src: "/hero-marble.webp", label: "B — Marble" },
];

export default function HeroPreview() {
  return (
    <>
      {plates.map((plate) => (
        <section
          key={plate.src}
          className="relative flex min-h-[92svh] flex-col overflow-hidden border-b border-border bg-background"
        >
          <GlassHeroBg imageSrc={plate.src} />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-14 sm:px-8 lg:px-14">
            <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">
              {plate.label}
            </p>
            <h2 className="mt-5 max-w-4xl font-heading text-4xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl md:text-7xl">
              Clear counsel.{" "}
              <em className="gradient-text-ink font-normal italic">
                Committed representation.
              </em>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Megastar Law Associates prioritizes quality over quantity —
              personalized attention and dedicated care for every client.
            </p>
          </div>
        </section>
      ))}
    </>
  );
}

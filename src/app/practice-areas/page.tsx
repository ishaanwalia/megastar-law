import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { HoverRevealList } from "@/components/hover-reveal-list";
import { practiceAreas } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Criminal, civil, family, corporate & banking, arbitration, labour and documentation practice at Megastar Law Associates, Chandigarh.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-24">
        <p className="text-sm font-medium tracking-wide text-brand uppercase">
          What we do
        </p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          Practice Areas
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          From first advice to final appeal — representation across the
          matters that most affect individuals, families and businesses.
        </p>

        <HoverRevealList areas={practiceAreas} />
      </section>

      <CtaBanner
        title="Not sure which practice area fits your matter?"
        body="Describe what's going on and the firm will point you in the right direction."
      />
    </>
  );
}

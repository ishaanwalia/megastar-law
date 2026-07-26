import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { practiceAreas } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Practice Areas",
  description:
    "Criminal, civil, family, corporate & banking, arbitration, labour and documentation practice at Megastar Law Associates, Chandigarh.",
};

export default function PracticeAreasPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <p className="text-sm font-medium tracking-wide text-gold uppercase">
        What we do
      </p>
      <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
        Practice Areas
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        From first advice to final appeal — representation across the
        matters that most affect individuals, families and businesses.
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {practiceAreas.map((area, i) => (
          <Reveal key={area.slug} delay={(i % 2) * 0.1}>
            <Link href={`/practice-areas/${area.slug}`} className="block h-full">
              <Card className="h-full p-6 transition-colors hover:border-gold/50">
                <h2 className="font-heading text-xl font-medium">
                  {area.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {area.summary}
                </p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-gold">
                  Learn more <ArrowRight className="size-3.5" />
                </span>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

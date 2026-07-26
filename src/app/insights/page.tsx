import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "General legal information from Megastar Law Associates, Chandigarh — on criminal law, family law, NRI matters, and more.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-medium tracking-wide text-gold uppercase">
          Insights
        </p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          General legal information, plainly explained
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Notes on procedure and practice from the firm — for general
          information only, not a substitute for advice on your specific
          matter. See our{" "}
          <Link href="/disclaimer" className="underline hover:text-gold">
            disclaimer
          </Link>
          .
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {insights.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 0.1}>
              <Link href={`/insights/${post.slug}`} className="block h-full">
                <Card className="h-full p-6 transition-colors hover:border-gold/50">
                  <Badge variant="secondary">{post.category}</Badge>
                  <h2 className="mt-3 font-heading text-xl font-medium">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-medium text-gold">
                    Read more <ArrowRight className="size-3.5" />
                  </span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}

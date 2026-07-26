import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { practiceAreas } from "@/lib/firm-data";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) return {};
  return {
    title: area.title,
    description: area.summary,
  };
}

export default async function PracticeAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = practiceAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  const related = practiceAreas.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24">
        <Link
          href="/practice-areas"
          className="text-sm font-medium text-muted-foreground hover:text-gold"
        >
          &larr; All Practice Areas
        </Link>
        <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {area.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{area.summary}</p>

        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {area.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-6">
            <h2 className="font-heading text-lg font-medium">
              Discuss your matter
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every matter is different — the fastest way to understand your
              options is a direct conversation.
            </p>
            <Button
              className="mt-4"
              render={<Link href="/contact" />}
              nativeButton={false}
            >
              Book a Consultation <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-xl font-medium">
              Related Practice Areas
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/practice-areas/${r.slug}`}>
                  <Card className="h-full p-5 transition-colors hover:border-gold/50">
                    <div className="text-sm font-medium">{r.title}</div>
                  </Card>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

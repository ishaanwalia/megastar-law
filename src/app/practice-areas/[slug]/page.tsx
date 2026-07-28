import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { firm, practiceAreas } from "@/lib/firm-data";

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
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-24">
        <Link
          href="/practice-areas"
          className="text-sm font-medium text-muted-foreground hover:text-brand"
        >
          &larr; All Practice Areas
        </Link>
        <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {area.title}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">{area.summary}</p>

        {/* Landscape plate between the heading and the body copy. Run through
            the site duotone so every area reads as one charcoal+teal system
            rather than seven unrelated stock photos. */}
        <div className="relative mt-8 aspect-[3/2] overflow-hidden rounded-2xl border border-border sm:mt-10 sm:aspect-[21/9]">
          <Image
            src={`/practice/${area.slug}.webp`}
            alt=""
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="photo-duotone object-cover"
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent"
          />
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {area.approach}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10">
          {area.serviceGroups.map((group, gi) => (
            <Reveal key={group.heading} delay={0.15 + gi * 0.08}>
              <h2 className="font-heading text-xl font-medium">
                {group.heading}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-6">
            <h2 className="font-heading text-lg font-medium">
              Discuss your matter
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Every matter is different — the fastest way to understand your
              options is a direct conversation.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                render={<Link href="/contact" />}
                nativeButton={false}
              >
                Book a Consultation <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                render={
                  <a
                    href={`https://wa.me/${firm.whatsapp}?text=${encodeURIComponent(
                      `Hi, I'd like to discuss a ${area.title} matter.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                nativeButton={false}
              >
                Message on WhatsApp
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:px-14 xl:px-24">
          <Reveal>
            <h2 className="font-heading text-xl font-medium">
              Related Practice Areas
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/practice-areas/${r.slug}`}>
                  <Card className="h-full p-5 transition-colors hover:border-brand/50">
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

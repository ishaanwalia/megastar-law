import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { insights } from "@/lib/insights";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = insights.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <Link
          href="/insights"
          className="text-sm font-medium text-muted-foreground hover:text-gold"
        >
          &larr; All Insights
        </Link>
        <Badge variant="secondary" className="mt-4">
          {post.category}
        </Badge>
        <h1 className="mt-4 font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <time
          dateTime={post.publishedAt}
          className="mt-3 block text-sm text-muted-foreground"
        >
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <Reveal delay={0.1}>
          <p className="mt-8 text-lg text-muted-foreground">{post.intro}</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {post.sections.map((section, i) => (
            <Reveal key={section.heading} delay={0.15 + i * 0.08}>
              <h2 className="font-heading text-xl font-medium">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, pi) => (
                <p
                  key={pi}
                  className="mt-3 text-base leading-relaxed text-muted-foreground"
                >
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="mt-10 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            This article is for general information only and does not
            constitute legal advice. Every matter turns on its own facts —
            see our{" "}
            <Link href="/disclaimer" className="underline hover:text-gold">
              disclaimer
            </Link>
            , and speak to the firm directly about your specific situation.
          </p>

          <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-6">
            <h2 className="font-heading text-lg font-medium">
              Discuss your matter
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The fastest way to understand your options is a direct
              conversation.
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
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-xl font-medium">
              More Insights
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/insights/${r.slug}`}>
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

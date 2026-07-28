import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Scale, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FaqSection } from "@/components/faq-section";
import { firm, advocates, practiceAreas } from "@/lib/firm-data";

const pradeep = advocates[0];

const stats = [
  { value: "15+", label: "Years practicing, civil & criminal" },
  { value: "2011", label: "Enrolled, Punjab & Haryana Bar" },
  { value: "7", label: "Practice areas covered" },
  { value: "24/7", label: "Legal helpline" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Personalized Attention",
    body: "Every case is handled with focus on your specific concerns, not run through an assembly line of associates.",
  },
  {
    icon: Scale,
    title: "Settlement & Courtroom Experience",
    body: "Solutions weighed on their merits — negotiated settlements where they serve you, full courtroom representation where they don't.",
  },
  {
    icon: Clock,
    title: "24/7 Legal Helpline",
    body: "Legal issues don't wait for office hours. Reach the firm directly, any time, at " + firm.helpline + ".",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — intentionally has no scroll animation; it's the LCP element. */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-medium tracking-wide text-gold uppercase">
              Advocates &middot; Chandigarh
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl">
              Clear counsel. Committed representation.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Megastar Law Associates prioritizes quality over quantity —
              personalized attention and dedicated care for every client,
              across criminal, civil, family, corporate and arbitration
              matters.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" render={<Link href="/contact" />} nativeButton={false}>
                Speak With an Advocate Today
                <ArrowRight className="size-4" />
              </Button>
              <a
                href={`tel:${firm.helpline.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium hover:text-gold"
              >
                <Phone className="size-4" />
                {firm.helplineLabel}: {firm.helpline}
              </a>
            </div>
          </div>

          <PhotoPlaceholder
            label={`Photo needed: ${pradeep.name}`}
            hint="Professional headshot or a Punjab & Haryana High Court exterior shot — the first thing a visitor sees."
            className="w-full"
          />
        </div>
      </section>

      {/* Credential strip — floats over the hero's bottom edge as a row of
          centered glass cards, rather than sitting left-aligned in its own
          flat-background section. */}
      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:-mt-14 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-gold/25 bg-card/60 px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_16px_40px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md dark:bg-card/30"
            >
              <dt className="font-mono text-2xl font-medium tabular-nums">
                {s.value}
              </dt>
              <dd className="text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-14 pb-20 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              Practice Areas
            </h2>
            <Link
              href="/practice-areas"
              className="flex items-center gap-1 text-sm font-medium text-gold hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.slug} delay={(i % 3) * 0.08}>
              <Link href={`/practice-areas/${area.slug}`} className="block h-full">
                <Card className="h-full p-6 transition-colors hover:border-gold/50">
                  <h3 className="font-heading text-lg font-medium">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {area.summary}
                  </p>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Megastar — a voice and a list, not a third round of icon cards. */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <blockquote className="relative border-l-2 border-oxblood pl-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 left-2 font-heading text-8xl text-oxblood/15 select-none"
                >
                  &rdquo;
                </span>
                <p className="relative font-heading text-2xl leading-snug font-medium tracking-tight">
                  &ldquo;Clients deserve personalized attention and dedicated
                  care — not to be processed through a large firm&apos;s
                  assembly line.&rdquo;
                </p>
                <footer className="relative mt-4 text-sm text-muted-foreground">
                  {pradeep.name}, Founder
                </footer>
              </blockquote>

              <ul className="flex flex-col gap-6">
                {values.map((v) => (
                  <li key={v.title} className="flex gap-4">
                    <v.icon className="mt-0.5 size-5 shrink-0 text-gold" />
                    <div>
                      <h3 className="font-heading text-base font-medium">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {v.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-center">
              <PhotoPlaceholder
                label={`Photo needed: ${pradeep.name}`}
                hint="Headshot, plain background."
                aspect="aspect-square"
                className="w-32 shrink-0"
              />
              <div>
                <p className="text-sm font-medium tracking-wide text-gold uppercase">
                  Founder
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-3xl font-medium tracking-tight">
                    {pradeep.name}
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-ledger/40 text-ledger"
                  >
                    Bar Enrollment {pradeep.enrollment}
                  </Badge>
                </div>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Enrolled as an Advocate ({pradeep.enrollment}), member of the{" "}
                  {pradeep.barMembership}. {pradeep.experience}, with
                  particular depth in{" "}
                  {pradeep.specialties.slice(0, 3).join(", ")}, and more.
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/about" />}
                nativeButton={false}
              >
                Full credentials <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Results — pending real client testimonials; never fabricate these. */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              What clients say
            </h2>
            <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Client testimonials to be added here — three short quotes,
                pulled from real client feedback with their written
                permission to publish. Placeholder only; nothing here is
                invented.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      <CtaBanner
        title="Talk to Pradeep Directly"
        body="Reach the 24/7 helpline directly, or send details through the contact form and hear back promptly."
      />
    </>
  );
}

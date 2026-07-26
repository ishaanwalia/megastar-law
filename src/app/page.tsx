import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Scale, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { firm, advocates, practiceAreas } from "@/lib/firm-data";

const pradeep = advocates[0];

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
                Book a Consultation
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

          <div className="relative flex h-full items-center justify-center rounded-2xl border border-border bg-card p-10">
            <dl className="grid w-full grid-cols-2 gap-8 text-center">
              <div>
                <dt className="font-heading text-3xl font-medium">15+</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Years practicing, civil & criminal
                </dd>
              </div>
              <div>
                <dt className="font-heading text-3xl font-medium">2011</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Enrolled, Punjab &amp; Haryana Bar
                </dd>
              </div>
              <div>
                <dt className="font-heading text-3xl font-medium">7</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Practice areas covered
                </dd>
              </div>
              <div>
                <dt className="font-heading text-3xl font-medium">24/7</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Legal helpline
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              Why clients choose Megastar
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <Card className="h-full p-6">
                  <v.icon className="size-6 text-gold" />
                  <h3 className="mt-4 font-heading text-lg font-medium">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {v.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-sm font-medium tracking-wide text-gold uppercase">
                  Founder
                </p>
                <h2 className="mt-3 font-heading text-3xl font-medium tracking-tight">
                  {pradeep.name}
                </h2>
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

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              Talk to the firm today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/70">
              Reach the 24/7 helpline directly, or send details through the
              contact form and hear back promptly.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                render={<Link href="/contact" />}
                nativeButton={false}
              >
                Contact the Firm
              </Button>
              <a
                href={`tel:${firm.helpline.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="size-4" />
                {firm.helpline}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

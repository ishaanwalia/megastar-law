import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Scale, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FaqSection } from "@/components/faq-section";
import { StatNumber } from "@/components/stat-number";
import { GlassHeroBg } from "@/components/glass-hero-bg";
import { StickyPracticeCards } from "@/components/sticky-practice-cards";
import { Marquee } from "@/components/marquee";
import { firm, advocates, practiceAreas } from "@/lib/firm-data";

// Third-party CDN clip, standing in until the firm supplies its own footage.
// It is never shown directly — the shader reads its luminance only — so the
// hero survives the URL going away (it just loses the motion layer).
const heroClip =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4";

const heroPanelLinks = [
  { label: "Personalized", href: "/why-us" },
  { label: "Experienced", href: "/about" },
  { label: "Available 24/7", href: "/contact" },
];

const credentialTicker = [
  "Punjab & Haryana High Court",
  "District Courts, Chandigarh",
  "NRI Section 498A Specialists",
  "15+ Years, Civil & Criminal",
  "24/7 Legal Helpline",
  "Enrolled 2011, P-2435/2011",
];

const pradeep = advocates[0];

const accentClasses = {
  brand: "border-t-brand",
  ink: "border-t-ink",
  slate: "border-t-slate",
} as const;

type Stat =
  | {
      value: number;
      suffix?: string;
      label: string;
      accent: keyof typeof accentClasses;
    }
  | { display: string; label: string; accent: keyof typeof accentClasses };

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years practicing, civil & criminal", accent: "brand" },
  { value: 2011, label: "Enrolled, Punjab & Haryana Bar", accent: "ink" },
  { value: 7, label: "Practice areas covered", accent: "slate" },
  { display: "24/7", label: "Legal helpline", accent: "brand" },
];

const values = [
  {
    icon: ShieldCheck,
    color: "text-brand",
    title: "Personalized Attention",
    body: "Every case is handled with focus on your specific concerns, not run through an assembly line of associates.",
  },
  {
    icon: Scale,
    color: "text-slate",
    title: "Settlement & Courtroom Experience",
    body: "Solutions weighed on their merits — negotiated settlements where they serve you, full courtroom representation where they don't.",
  },
  {
    icon: Clock,
    color: "text-ink",
    title: "24/7 Legal Helpline",
    body: "Legal issues don't wait for office hours. Reach the firm directly, any time, at " + firm.helpline + ".",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — one full-viewport composition. The background is a single
          WebGL pass: source clip boomeranged, refracted through fluted glass,
          with a teal bloom trailing the cursor. Foreground is ink on ivory
          and carries ZERO entrance animation, so LCP paint is untouched. */}
      {/* -mt-18 pulls the section up under the sticky header (h-18) so the
          shader runs full-bleed behind the nav; pt-18 puts the content back. */}
      <section className="relative -mt-18 flex min-h-[100svh] flex-col overflow-hidden bg-background pt-18">
        <GlassHeroBg videoSrc={heroClip} />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 md:pt-20">
          <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">
            Advocates &middot; Chandigarh
          </p>
          <h1 className="mt-5 max-w-4xl font-heading text-4xl leading-[1.02] font-medium tracking-tight text-balance sm:text-6xl md:text-7xl">
            Clear counsel.{" "}
            <em className="font-normal text-brand italic">
              Committed representation.
            </em>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Megastar Law Associates prioritizes quality over quantity —
            personalized attention and dedicated care for every client, across
            criminal, civil, family, corporate and arbitration matters.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              render={<Link href="/contact" />}
              nativeButton={false}
              className="btn-sheen bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Speak With an Advocate Today
              <ArrowRight className="size-4" />
            </Button>
            <a
              href={`tel:${firm.helpline.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand"
            >
              <Phone className="size-4" />
              {firm.helplineLabel}: {firm.helpline}
            </a>
          </div>
        </div>

        {/* Glass panel anchored to the bottom edge of the first viewport —
            flush, no bottom border, so it reads as the floor of the hero. */}
        <div className="relative z-10 mx-auto mt-auto w-full max-w-5xl px-4 pt-16 sm:px-6">
          <div className="border border-b-0 border-border/70 bg-card/80 px-5 pt-8 pb-0 shadow-sm backdrop-blur-md sm:px-8 sm:pt-10 md:px-10 md:pt-12">
            <div className="grid gap-6 md:grid-cols-2 md:gap-14">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  What do we do?
                </p>
                <h2 className="mt-3 font-heading text-2xl leading-tight font-medium tracking-tight sm:text-3xl md:text-4xl">
                  Counsel that
                  <br className="hidden sm:block" /> holds up in court
                </h2>
              </div>
              <p className="self-end text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                Litigation and advisory work for individuals, NRIs, corporates
                and banks — argued before the Punjab &amp; Haryana High Court,
                the District Courts at Chandigarh, NCLT, DRT and consumer fora.
              </p>
            </div>

            <div className="mt-6 h-px w-full bg-border sm:mt-8 md:mt-10" />

            <div className="grid gap-2 py-5 sm:grid-cols-3 sm:gap-3">
              {heroPanelLinks.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between bg-secondary/70 px-4 py-3.5 transition-colors duration-200 hover:bg-secondary sm:px-6 sm:py-4"
                >
                  <span className="text-sm">
                    <span className="text-muted-foreground/70 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="mx-2 text-muted-foreground/50">/</span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee sits flush against the hero — no border between them — so
          the ticker reads as the hero's own bottom edge, not a new section. */}
      <Marquee items={credentialTicker} className="border-b border-border/60 py-4" />

      {/* Credential strip — centered glass cards, sitting in normal flow
          right after the marquee. */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl border border-t-2 border-brand/25 ${accentClasses[s.accent]} bg-card/70 px-4 py-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_16px_40px_-20px_rgba(0,0,0,0.2)] backdrop-blur-md`}
            >
              <dt className="font-mono text-2xl font-medium tabular-nums">
                {"value" in s ? (
                  <StatNumber value={s.value} suffix={s.suffix} />
                ) : (
                  s.display
                )}
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
              className="flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10">
          <StickyPracticeCards areas={practiceAreas} />
        </div>
      </section>

      {/* Why Megastar — a voice and a list, not a third round of icon cards. */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <div className="grid gap-12 md:grid-cols-2 md:items-start">
              <blockquote className="relative border-l-2 border-slate pl-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-8 left-2 font-heading text-8xl text-slate/15 select-none"
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
                    <v.icon className={`mt-0.5 size-5 shrink-0 ${v.color}`} />
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
                <p className="text-sm font-medium tracking-wide text-brand uppercase">
                  Founder
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-3xl font-medium tracking-tight">
                    {pradeep.name}
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-ink/40 text-ink"
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

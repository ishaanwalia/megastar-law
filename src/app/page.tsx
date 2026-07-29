import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Scale, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { FaqSection } from "@/components/faq-section";
import { StatNumber, type StatFormat } from "@/components/stat-number";
import { GlassHeroBg } from "@/components/glass-hero-bg";
import { Marquee } from "@/components/marquee";
import { OfficeMap } from "@/components/office-map";
import { Magnetic } from "@/components/magnetic";
import { Justitia } from "@/components/justitia";
import { PracticeSequence } from "@/components/practice-sequence";
import { firm, advocates, practiceAreas } from "@/lib/firm-data";


const heroPanelLinks = [
  { label: "Personalized", href: "/why-us" },
  { label: "Experienced", href: "/about" },
  { label: "Available 24/7", href: "/contact" },
];

// Forums Pradeep's enrolment and practice actually cover (PLAN.md section 0
// — verified from the bar letter, not the network boilerplate).
const credentials = [
  {
    label: "Punjab & Haryana High Court",
    detail: "Member of the High Court Bar Association since 2011. Chamber 95.",
  },
  {
    label: "District Courts, Chandigarh",
    detail: "Member, DBA Chandigarh. Chamber 353-A, Sector 43.",
  },
  {
    label: "NCLT Chandigarh",
    detail: "Corporate insolvency and company-law matters.",
  },
  {
    label: "Consumer Fora",
    detail: "District and State Commission, Punjab.",
  },
  {
    label: "RERA Punjab & Haryana",
    detail: "Homebuyer and developer disputes under the RERA Act.",
  },
  {
    label: "Permanent Lok Adalat",
    detail: "Public-utility disputes and conciliated settlements.",
  },
];

// Carries ONLY facts stated nowhere else on this page. The stat cards own the
// numbers (15+, 2011, 7, 24/7) and the credential rail owns the forums, so
// repeating either here is the redundancy the design review flagged.
const credentialTicker = [
  "NRI Section 498A proceedings",
  "NDPS Act matters",
  "Cheque dishonour — NI Act §138",
  "Banking & Co-operative Societies Act",
  "Land & property disputes",
  "Civil recovery suits",
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
      // Intl options for the odometer — a year must not be digit-grouped.
      format?: StatFormat;
      label: string;
      accent: keyof typeof accentClasses;
    }
  | { display: string; label: string; accent: keyof typeof accentClasses };

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years practicing, civil & criminal", accent: "brand" },
  {
    value: 2011,
    format: { useGrouping: false },
    label: "Enrolled, Punjab & Haryana Bar",
    accent: "ink",
  },
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
          WebGL pass: the supplied glass still, refracted through fluted glass
          ribs, with a teal bloom trailing the cursor. Foreground is ink on
          ivory and carries ZERO entrance animation, so LCP is untouched. */}
      {/* -mt-18 pulls the section up under the sticky header (h-18) so the
          shader runs full-bleed behind the nav; pt-18 puts the content back. */}
      <section className="relative -mt-18 flex min-h-[100svh] flex-col overflow-hidden bg-background pt-18">
        <GlassHeroBg />
        {/* Above the shader, never sampled into it. Runs from under the header
            down to where the panel starts, hugging the right edge. */}
        <Justitia
          src="/hero-glass-alpha.webp"
          priority
          scrim
          sizes="(max-width: 640px) 105vw, 42vw"
          className="top-0 -right-[10vw] h-[64%] w-[78vw] opacity-45 sm:inset-y-0 sm:right-0 sm:h-auto sm:w-[46vw] sm:opacity-100 lg:right-[3%] lg:w-[40vw]"
          imageClassName="object-top sm:object-bottom"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-[clamp(1.75rem,6svh,5rem)] sm:px-8 lg:px-14 xl:px-24">
          <p className="text-xs font-medium tracking-[0.25em] text-brand uppercase">
            Advocates &middot; Chandigarh
          </p>
          <h1 className="mt-[clamp(0.75rem,2.2svh,1.25rem)] max-w-4xl font-heading text-[clamp(2.25rem,5.2svh+1.5vw,4.5rem)] leading-[1.02] font-medium tracking-tight text-balance">
            Clear counsel.{" "}
            <em className="gradient-text-ink font-normal italic motion-safe:animate-[gradient-shift_7s_ease-in-out_infinite]">
              Committed representation.
            </em>
          </h1>
          <p className="mt-[clamp(0.85rem,2.4svh,1.5rem)] max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Megastar Law Associates prioritizes quality over quantity —
            personalized attention and dedicated care for every client, across
            criminal, civil, family, corporate and arbitration matters.
          </p>
          <div className="mt-[clamp(1.1rem,3svh,1.75rem)] flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button
                size="lg"
                render={<Link href="/contact" />}
                nativeButton={false}
                className="btn-sheen bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Speak With an Advocate Today
                <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
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
        <div className="relative z-10 mx-auto mt-auto w-full max-w-5xl px-5 pt-[clamp(1.25rem,4svh,4rem)] sm:px-8 lg:px-14 xl:px-24">
          <div className="liquid-glass border-b-0 px-4 pt-[clamp(1.25rem,3.4svh,3rem)] pb-0 sm:px-8 md:px-10">
            <div className="grid gap-[clamp(1rem,2.4svh,1.5rem)] md:grid-cols-2 md:gap-14">
              <div>
                <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  What do we do?
                </p>
                <h2 className="gradient-text-ink mt-3 font-heading text-2xl leading-tight font-medium tracking-tight motion-safe:animate-[gradient-shift_9s_ease-in-out_infinite] sm:text-3xl md:text-4xl">
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

            <div className="mt-[clamp(1rem,3svh,2.5rem)] h-px w-full bg-border" />

            {/* Three across at every width — stacking these on mobile pushed
                the panel a full 250px past the fold. */}
            <div className="grid grid-cols-3 gap-1.5 py-4 sm:gap-3 sm:py-5">
              {heroPanelLinks.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-1 bg-secondary/70 px-2.5 py-3 transition-colors duration-200 hover:bg-secondary sm:px-6 sm:py-4"
                >
                  <span className="text-[11px] sm:text-sm">
                    <span className="text-muted-foreground/70 tabular-nums">
                      0{i + 1}
                    </span>
                    <span className="mx-1 text-muted-foreground/50 sm:mx-2">
                      /
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </span>
                  <ArrowRight className="hidden size-4 shrink-0 text-muted-foreground/60 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground sm:block" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee sits flush against the hero — no border between them — so
          the ticker reads as the hero's own bottom edge, not a new section. */}
      <Marquee items={credentialTicker} className="border-b border-border/60 py-5" />

      {/* Credential strip — centered glass cards, sitting in normal flow
          right after the marquee. */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 sm:px-8 lg:px-14 xl:px-24">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl border border-t-2 border-brand/25 ${accentClasses[s.accent]} liquid-glass-frost px-4 py-6 text-center`}
            >
              <dt className="font-mono text-2xl font-medium tabular-nums">
                {"value" in s ? (
                  <StatNumber
                    value={s.value}
                    suffix={s.suffix}
                    format={s.format}
                  />
                ) : (
                  s.display
                )}
              </dt>
              <dd className="text-xs text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <PracticeSequence areas={practiceAreas} credentials={credentials} />

      {/* Why Megastar — a voice and a list, not a third round of icon cards. */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-14 xl:px-24 md:py-28">
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
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-14 xl:px-24 md:py-28">
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
                {/* No specialty list here: the ticker above already carries
                    them, and /about carries the full set. */}
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Enrolled as an Advocate ({pradeep.enrollment}), member of the{" "}
                  {pradeep.barMembership}. {pradeep.experience}.
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
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-14 xl:px-24 md:py-28">
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

      <OfficeMap />

      <FaqSection />

      <CtaBanner
        title="Talk to Pradeep Directly"
        body="Reach the 24/7 helpline directly, or send details through the contact form and hear back promptly."
      />
    </>
  );
}

import type { Metadata } from "next";
import {
  Clock,
  Globe2,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { ChandigarhClock } from "@/components/chandigarh-clock";
import { Spotlight } from "@/components/spotlight";
import { firm } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Why Us",
  description:
    "Why clients choose Megastar Law Associates — personalized attention, settlement and courtroom experience, and NRI-specific experience on Section 498A matters.",
};

const pillars = [
  {
    key: "quality",
    icon: UserCheck,
    color: "text-gold",
    title: "Quality over quantity",
    body: "Every matter gets direct attention from the advocate handling it — not routed through layers of associates. We'd rather take on fewer matters and give each one the focus it needs.",
  },
  {
    key: "settlement",
    icon: Scale,
    color: "text-oxblood",
    title: "Settlement and courtroom experience, both",
    body: "Not every dispute belongs in court, and not every dispute can be settled. We weigh both paths on their merits and push for whichever actually serves your outcome — with the courtroom experience to follow through when settlement isn't realistic.",
  },
  {
    key: "nri",
    icon: Globe2,
    color: "text-ledger",
    title: "NRI-specific experience",
    body: "We regularly act for NRI clients on Section 498A matters, where being abroad makes unfamiliar Indian procedure, distance and timezones a real obstacle. We work around that directly, so distance isn't a barrier to a proper defense.",
  },
  {
    key: "helpline",
    icon: Clock,
    color: "text-gold",
    title: "24/7 legal helpline",
    body: `Legal problems don't confine themselves to office hours. Reach the firm directly, any time, at ${firm.helpline}.`,
  },
  {
    key: "access",
    icon: ShieldCheck,
    color: "text-oxblood",
    title: "Direct access to your advocate",
    body: "You deal with the advocate handling your matter, not a rotating cast of juniors — from the first consultation through to resolution.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-medium tracking-wide text-gold uppercase">
          Why Megastar
        </p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          Why clients choose Megastar Law Associates
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          We believe in prioritizing quality over quantity. Unlike larger
          firms, we offer personalized attention and dedicated care to every
          client — because we understand the real impact a legal matter can
          have on your life.
        </p>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.key} delay={(i % 2) * 0.1}>
                <Spotlight className="h-full rounded-xl">
                  <Card className="h-full p-6 transition-colors hover:border-gold/50">
                    <p.icon className={`size-6 ${p.color}`} />
                    <h2 className="mt-4 font-heading text-lg font-medium">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {p.body}
                    </p>
                    {p.key === "nri" && <ChandigarhClock />}
                  </Card>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Talk to the firm directly"
        body="The fastest way to understand your options is a direct conversation with the advocate handling your matter."
      />
    </>
  );
}

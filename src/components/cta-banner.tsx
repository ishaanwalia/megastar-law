import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { firm } from "@/lib/firm-data";

export function CtaBanner({
  title = "Talk to the firm today",
  body = "Reach the 24/7 helpline directly, or send details through the contact form and hear back promptly.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1680px] px-5 py-16 text-center sm:px-8 lg:px-14 xl:px-24">
        <Reveal>
          <h2 className="gradient-text font-heading text-3xl font-medium tracking-tight motion-safe:animate-[gradient-shift_7s_ease-in-out_infinite]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/70">
            {body}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {["100% Confidential", "No Obligation", "Quick Response"].map(
              (tag) => (
                <li
                  key={tag}
                  className="flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-3.5 py-1.5 text-xs font-medium text-primary-foreground/80"
                >
                  <Check className="size-3.5 text-brand" />
                  {tag}
                </li>
              )
            )}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="/contact" />}
              nativeButton={false}
              className="btn-sheen"
            >
              Contact the Firm <ArrowRight className="size-4" />
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
  );
}

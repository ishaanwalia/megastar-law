import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
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
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/70">
            {body}
          </p>
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

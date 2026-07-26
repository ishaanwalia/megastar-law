import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { firm, offices } from "@/lib/firm-data";
import { FaqSection } from "@/components/faq-section";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Megastar Law Associates, Chandigarh — 24/7 legal helpline, phone, email and chamber addresses.",
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-medium tracking-wide text-gold uppercase">
          Get in touch
        </p>
        <h1 className="mt-3 max-w-2xl font-heading text-4xl font-medium tracking-tight sm:text-5xl">
          Contact the Firm
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Call the 24/7 helpline for anything urgent, or send details below
          and the firm will get back to you.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-gold/30 bg-gold/10 p-5">
                <div className="text-sm font-medium">{firm.helplineLabel}</div>
                <a
                  href={`tel:${firm.helpline.replace(/\s/g, "")}`}
                  className="mt-1 flex items-center gap-2 font-heading text-2xl font-medium hover:text-gold"
                >
                  <Phone className="size-5" /> {firm.helpline}
                </a>
              </div>

              <a
                href={`mailto:${firm.email}`}
                className="flex items-center gap-2 text-sm hover:text-gold"
              >
                <Mail className="size-4" /> {firm.email}
              </a>

              <div className="flex flex-col gap-4">
                {offices.map((office) => (
                  <div key={office.label} className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                    <div>
                      <div className="text-sm font-medium">{office.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {office.address}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
                Additional office locations to be confirmed with the firm
                before publishing — see PLAN.md §0.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
      <FaqSection />
    </>
  );
}

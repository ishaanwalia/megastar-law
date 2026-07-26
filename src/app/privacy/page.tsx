import type { Metadata } from "next";
import { firm } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Megastar Law Associates handles information you share.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-heading text-3xl font-medium tracking-tight">
        Privacy Policy
      </h1>
      <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          {firm.name} respects the privacy of visitors to this website and
          of prospective and existing clients. This policy explains what we
          collect and how it is used.
        </p>
        <h2 className="mt-4 font-heading text-lg font-medium text-foreground">
          Information we collect
        </h2>
        <p>
          When you submit the contact form on this site, we collect your
          name, phone number, and optionally your email address and a
          description of your matter. This information is used solely to
          respond to your enquiry and is not sold or shared with third
          parties.
        </p>
        <h2 className="mt-4 font-heading text-lg font-medium text-foreground">
          Confidentiality
        </h2>
        <p>
          Details shared through the contact form or in the course of a
          consultation are treated as confidential in line with standard
          attorney-client expectations, subject to applicable law.
        </p>
        <h2 className="mt-4 font-heading text-lg font-medium text-foreground">
          Contact
        </h2>
        <p>
          Questions about this policy can be directed to {firm.email}.
        </p>
      </div>
    </section>
  );
}

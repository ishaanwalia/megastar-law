import type { Metadata } from "next";
import { firm } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Bar Council of India advertising disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
      <h1 className="font-heading text-3xl font-medium tracking-tight">
        Disclaimer
      </h1>
      <div className="mt-8 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          The Bar Council of India does not permit solicitation of work or
          advertising by legal practitioners or law firms. By accessing this
          website, www.megastarlawassociates.com, you acknowledge that:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You are seeking information about {firm.name} of your own
            accord, and there has been no advertisement, personal
            communication, solicitation, invitation or inducement of any
            sort whatsoever from {firm.name} or any of its members to solicit
            any work through this website.
          </li>
          <li>
            This website is intended only for providing information about
            the firm, its practice areas and its advocates, and should not
            be construed as legal advice.
          </li>
          <li>
            {firm.name} is not liable for any consequence of any action
            taken by a visitor relying on material or information provided
            on this website. Anyone seeking advice on a specific matter
            should consult the firm directly.
          </li>
          <li>
            All content on this website is the property of {firm.name} and
            is not intended to be a source of advertising or solicitation.
          </li>
        </ul>
      </div>
    </section>
  );
}

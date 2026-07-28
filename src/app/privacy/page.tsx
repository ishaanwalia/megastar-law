import type { Metadata } from "next";
import { firm } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Megastar Law Associates collects, uses and protects personal data, in line with India's Digital Personal Data Protection Act, 2023.",
};

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Overview",
    body: (
      <>
        {firm.name} ("we", "us", "the firm") respects the privacy of
        visitors to this website and of prospective and existing clients.
        This policy explains what personal data we collect, why, how it is
        used and protected, and the rights available to you under India&apos;s
        Digital Personal Data Protection Act, 2023 ("DPDP Act"). By using
        this website or engaging the firm, you consent to the practices
        described here.
      </>
    ),
  },
  {
    heading: "Personal data we collect",
    body: (
      <>
        <span className="text-foreground">Through the website:</span> when
        you submit the contact form, we collect your name, phone number,
        and optionally your email address, a chosen practice area and a
        description of your matter.
        <br />
        <br />
        <span className="text-foreground">
          Through the client relationship:
        </span>{" "}
        if you engage the firm, we may additionally collect case-related
        details, court and matter information, appointment scheduling
        details, and documents you share with us, held in the firm&apos;s
        internal case-management system.
      </>
    ),
  },
  {
    heading: "Why we process your data",
    body: (
      <>
        We process personal data only for specific, lawful purposes: to
        respond to enquiries, to provide legal services you have engaged us
        for, to schedule and manage appointments and hearings, to maintain
        case records, and to communicate with you about your matter. We do
        not use your data for unrelated marketing without your consent.
      </>
    ),
  },
  {
    heading: "Your rights as a Data Principal",
    body: (
      <>
        Under the DPDP Act, you have the right to: access a summary of the
        personal data we hold about you and how it is processed; request
        correction or completion of inaccurate or incomplete data; request
        erasure of your data once it is no longer needed for the purpose it
        was collected, subject to our professional and legal
        record-keeping obligations; withdraw consent at any time, without
        affecting the lawfulness of processing carried out before
        withdrawal; and nominate another individual to exercise these
        rights on your behalf in the event of death or incapacity. To
        exercise any of these rights, write to {firm.email}.
      </>
    ),
  },
  {
    heading: "Retention",
    body: (
      <>
        We retain personal data only for as long as necessary to fulfil the
        purpose it was collected for, or as required by professional
        conduct rules, limitation periods and applicable law — after which
        it is deleted or anonymized, save for records we are legally
        obliged to retain.
      </>
    ),
  },
  {
    heading: "Confidentiality & attorney-client privilege",
    body: (
      <>
        Details shared through the contact form or in the course of a
        consultation are treated as confidential in line with standard
        attorney-client expectations, subject to applicable law. We do not
        sell personal data, and we do not share it with third parties
        except where necessary to provide legal services (for example,
        filing with a court), where you have consented, or where required
        by law.
      </>
    ),
  },
  {
    heading: "Security safeguards",
    body: (
      <>
        We use reasonable technical and organizational safeguards to
        protect personal data against unauthorized access, alteration or
        loss — including access-controlled systems for client records and
        encrypted storage for data held in our case-management system. No
        online system is completely immune to risk, and we take
        reasonable, industry-standard steps to minimize it.
      </>
    ),
  },
  {
    heading: "Grievance redressal",
    body: (
      <>
        If you have a concern about how your personal data has been
        handled, write to us at {firm.email} and we will address it
        promptly. If you remain unsatisfied, you may approach the Data
        Protection Board of India as provided under the DPDP Act.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this policy from time to time to reflect changes in
        our practices or applicable law. The current version always
        applies as published on this page.
      </>
    ),
  },
  {
    heading: "Contact",
    body: <>Questions about this policy can be directed to {firm.email}.</>,
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-24">
      <h1 className="font-heading text-3xl font-medium tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Last updated: 27 July 2026
      </p>
      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-heading text-lg font-medium text-foreground">
              {s.heading}
            </h2>
            <p className="mt-2">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

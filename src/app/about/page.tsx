import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { advocates, offices } from "@/lib/firm-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the advocates of Megastar Law Associates in Chandigarh — credentials, bar enrollment and areas of specialization.",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-24">
        <p className="text-sm font-medium tracking-wide text-brand uppercase">
          About the firm
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
          Quality over quantity, in every matter we take on.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Megastar Law Associates was built on a simple premise: clients
          deserve personalized attention and dedicated care, not to be
          processed through a large firm&apos;s assembly line. We draw on
          experience in both negotiated settlements and courtroom
          representation to find the outcome that actually serves you.
        </p>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-20">
          <div className="flex flex-col gap-16">
            {advocates.map((advocate, i) => (
              <Reveal key={advocate.name} delay={i * 0.1}>
                <div className="grid gap-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 md:items-start">
                  <PhotoPlaceholder
                    label={`Photo needed: ${advocate.name}`}
                    hint="Headshot, plain background."
                    aspect="aspect-square"
                  />

                  <div>
                    <h2 className="font-heading text-2xl font-medium">
                      {advocate.name}
                    </h2>
                    <p className="mt-1 text-muted-foreground">
                      {advocate.role}
                    </p>

                    {advocate.bioPending ? (
                      <div className="mt-4 rounded-lg border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
                        Full bio, credentials and bar enrollment for{" "}
                        {advocate.name} to be added — pending details from
                        the client.
                      </div>
                    ) : (
                      <>
                        {advocate.bio && (
                          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                            {advocate.bio}
                          </p>
                        )}
                        <dl className="mt-7 grid gap-x-10 gap-y-5 rounded-2xl border border-border bg-card/60 p-6 sm:grid-cols-2">
                          <div>
                            <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                              Enrollment
                            </dt>
                            <dd className="mt-1.5 text-sm leading-relaxed">
                              {advocate.enrollment}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                              Experience
                            </dt>
                            <dd className="mt-1.5 text-sm leading-relaxed">
                              {advocate.experience}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                              Bar Membership
                            </dt>
                            <dd className="mt-1.5 text-sm leading-relaxed">
                              {advocate.barMembership}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-6 flex flex-wrap gap-2" data-specialties>
                          {advocate.specialties.map((s) => (
                            <Badge key={s} variant="secondary">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24 md:py-20">
        <Reveal>
          <h2 className="font-heading text-2xl font-medium tracking-tight">
            Why clients work with us
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Every case handled with focus on your specific concerns",
              "Experience in both settlements and courtroom representation",
              "Direct access — no layers between you and your advocate",
              "24/7 legal helpline for genuine emergencies",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14 xl:px-24">
          <Reveal>
            <h2 className="font-heading text-2xl font-medium tracking-tight">
              Chandigarh Chambers
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {offices.map((office) => (
                <div
                  key={office.label}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="text-sm font-medium">{office.label}</div>
                  <div className="mt-1.5 text-sm text-muted-foreground">
                    {office.address}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Ready to discuss your matter?"
        body="Speak directly with the advocate handling your case — no layers, no runaround."
      />
    </>
  );
}

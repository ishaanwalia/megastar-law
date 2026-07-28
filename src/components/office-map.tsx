// Chambers, typeset — no map. The client has not marked these on Google, so
// an embed drops a pin on the wrong side of a sector and reads as an error.
// A precise written address is more useful than an imprecise pin.

import { MapPin } from "lucide-react";
import { firm, offices } from "@/lib/firm-data";

export function OfficeMap() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-heading text-3xl font-medium tracking-tight">
              Where to find us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Three chambers across Chandigarh — the District Courts complex in
              Sector 43, the High Court in Sector 1, and the firm&apos;s office
              in Sector 45-C.
            </p>
            <a
              href={`tel:${firm.helpline.replace(/\s/g, "")}`}
              className="mt-5 inline-block text-sm font-medium text-brand hover:underline"
            >
              Call ahead on {firm.helpline}
            </a>
          </div>

          <ol className="flex flex-col divide-y divide-border border-y border-border">
            {offices.map((office, i) => (
              <li
                key={office.label}
                className="group grid gap-2 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-mono text-xs text-brand tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-muted-foreground/70" />
                    <h3 className="font-heading text-xl leading-tight font-medium">
                      {office.label}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {office.address}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

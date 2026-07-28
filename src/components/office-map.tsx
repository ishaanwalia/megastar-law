// Chambers map. Google Maps' keyless `output=embed` endpoint, one embed per
// address so each renders its own marker — the multi-marker Embed API needs a
// billed key, and three small maps read better than one anyway.

import { offices } from "@/lib/firm-data";

function mapSrc(address: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    address + ", Chandigarh, India"
  )}&z=16&output=embed`;
}

export function OfficeMap() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-medium tracking-tight">
            Where to find us
          </h2>
          <p className="text-sm text-muted-foreground">
            Three locations across Chandigarh.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {offices.map((office, i) => (
            <div
              key={office.label}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-brand/50"
            >
              <iframe
                src={mapSrc(office.address)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map — ${office.label}`}
                className="h-52 w-full border-0 grayscale-[0.4] transition-[filter] duration-300 group-hover:grayscale-0"
              />
              <div className="border-t border-border p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-brand tabular-nums">
                    0{i + 1}
                  </span>
                  <span className="font-heading text-base font-medium">
                    {office.label}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {office.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    office.address + ", Chandigarh, India"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
                >
                  Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

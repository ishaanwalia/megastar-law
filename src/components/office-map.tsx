// Chambers map. OpenStreetMap's embed iframe — no API key, no tracker, no
// per-load billing. Lazy-loaded so it never competes with first paint.

import { offices } from "@/lib/firm-data";

// Bounding box around Sector 43/45 and the High Court, Chandigarh.
const BBOX = "76.735,30.700,76.815,30.760";
const SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik`;

export function OfficeMap() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-14">
        <h2 className="font-heading text-3xl font-medium tracking-tight">
          Where to find us
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <ul className="flex flex-col gap-4">
            {offices.map((office) => (
              <li
                key={office.label}
                className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-brand/50"
              >
                <div className="font-heading text-base font-medium">
                  {office.label}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {office.address}
                </p>
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
                    office.address + ", Chandigarh"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-medium text-brand hover:underline"
                >
                  Open in maps
                </a>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              src={SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Megastar Law Associates — Chandigarh chambers"
              className="h-full min-h-[22rem] w-full grayscale-[0.35] contrast-[1.05]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

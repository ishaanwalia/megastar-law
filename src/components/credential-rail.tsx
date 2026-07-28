// Horizontal credential rail. Native scroll-snap — no carousel library, no
// scroll hijack, and it drags on touch for free. The previous scroll-pinned
// version cost ~300vh of page to show six short cards.

import { offices } from "@/lib/firm-data";

export type Credential = { label: string; detail: string };

export function CredentialRail({ items }: { items: Credential[] }) {
  return (
    <div className="mt-8">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {items.map((c, i) => (
          <article
            key={c.label}
            className="flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-border bg-card/80 p-5 backdrop-blur-sm transition-colors hover:border-brand/50 sm:w-80"
          >
            <span className="font-mono text-xs text-brand tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-heading text-lg leading-tight font-medium">
              {c.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {c.detail}
            </p>
          </article>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Scroll the rail &rarr; · {offices.length} chambers across Chandigarh
      </p>
    </div>
  );
}

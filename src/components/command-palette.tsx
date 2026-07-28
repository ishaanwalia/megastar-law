"use client";

// Cmd/Ctrl-K jump-to. Native <dialog> for the modal semantics (focus trap,
// Esc, inert backdrop are all free), a plain substring filter over routes we
// already declare — no search library, no index.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Search } from "lucide-react";
import { mainNav } from "@/lib/nav";
import { firm, practiceAreas } from "@/lib/firm-data";

type Item = { label: string; group: string; href: string; external?: boolean };

const items: Item[] = [
  ...mainNav.map((n) => ({ label: n.title, group: "Pages", href: n.href })),
  ...practiceAreas.map((a) => ({
    label: a.title,
    group: "Practice Areas",
    href: `/practice-areas/${a.slug}`,
  })),
  {
    label: `Call the 24/7 helpline — ${firm.helpline}`,
    group: "Contact",
    href: `tel:${firm.helpline.replace(/\s/g, "")}`,
    external: true,
  },
  {
    label: "WhatsApp the firm",
    group: "Contact",
    href: `https://wa.me/${firm.whatsapp}`,
    external: true,
  },
];

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const results = query
    ? items.filter((i) =>
        (i.label + " " + i.group).toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const d = dialogRef.current;
        if (!d) return;
        if (d.open) d.close();
        else {
          setQuery("");
          setActive(0);
          d.showModal();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(item: Item) {
    dialogRef.current?.close();
    if (item.external) window.location.href = item.href;
    else router.push(item.href);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto w-[min(34rem,92vw)] rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          placeholder="Jump to a page, practice area, or the helpline…"
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active]);
            }
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          esc
        </kbd>
      </div>

      <ul className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-6 text-center text-sm text-muted-foreground">
            Nothing matches “{query}”.
          </li>
        )}
        {results.map((item, i) => (
          <li key={item.href + item.label}>
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(item)}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                i === active ? "bg-secondary" : ""
              }`}
            >
              <span className="flex items-center gap-2.5 truncate">
                {item.group === "Contact" && (
                  <Phone className="size-3.5 shrink-0 text-brand" />
                )}
                {item.label}
              </span>
              <span className="shrink-0 text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                {item.group}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}

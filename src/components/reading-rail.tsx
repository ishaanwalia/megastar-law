"use client";

// Section rail for long pages: one dot per <h2 id> found in the article, the
// current one filled. Uses IntersectionObserver (no scroll handler) and reads
// the headings from the DOM, so pages don't have to declare their own map.

import { useEffect, useState } from "react";

export function ReadingRail({ scope = "main" }: { scope?: string }) {
  const [sections, setSections] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;
    const heads = [...root.querySelectorAll("h2")].filter((h) =>
      (h.textContent || "").trim()
    );
    heads.forEach((h, i) => {
      if (!h.id) h.id = `section-${i}`;
    });
    setSections(heads.map((h) => ({ id: h.id, text: h.textContent!.trim() })));

    // Recompute from ALL heading positions rather than trusting whichever
    // entry fired: with a narrow rootMargin band, scrolling through a gap
    // where no heading intersects leaves the old one stuck lit.
    const sync = () => {
      const line = window.innerHeight * 0.35;
      let current = heads[0];
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= line) current = h;
      }
      setActiveId(current.id);
    };
    sync();

    const io = new IntersectionObserver(sync, {
      threshold: [0, 1],
      rootMargin: "0px 0px -35% 0px",
    });
    heads.forEach((h) => io.observe(h));
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sync);
    };
  }, [scope]);

  if (sections.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed top-1/2 left-5 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {sections.map((s) => {
          const on = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-2.5"
                title={s.text}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    on ? "w-7 bg-brand" : "w-3.5 bg-border group-hover:w-5"
                  }`}
                />
                <span
                  className={`max-w-40 truncate text-[11px] transition-opacity duration-300 ${
                    on
                      ? "text-foreground opacity-100"
                      : "text-muted-foreground opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

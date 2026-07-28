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

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
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

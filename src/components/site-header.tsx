"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav } from "@/lib/nav";
import { firm } from "@/lib/firm-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [practiceOpen, setPracticeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Transparent at the very top so the hero's glass reads edge-to-edge, then
  // frosts once the page moves under it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border/70 bg-background/90 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={44}
            height={41}
            className="h-10 w-auto dark:invert"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-medium tracking-tight sm:text-xl">
              Megastar Law Associates
            </span>
            <span className="text-xs text-muted-foreground">
              Advocates &middot; Chandigarh
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) =>
            item.items ? (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setPracticeOpen(true)}
                onMouseLeave={() => setPracticeOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                    pathname.startsWith(item.href) && "text-brand"
                  )}
                >
                  {item.title}
                </Link>
                {practiceOpen && (
                  <div className="absolute top-full left-1/2 w-[560px] -translate-x-1/2 pt-2">
                    <div className="grid grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-3 shadow-lg">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="rounded-lg p-3 transition-colors hover:bg-muted"
                        >
                          <div className="text-sm font-medium">{sub.title}</div>
                          <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {sub.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                  pathname === item.href && "text-brand"
                )}
              >
                {item.title}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${firm.helpline.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
          >
            <Phone className="size-3.5" />
            {firm.helpline}
          </a>
          <Button size="sm" nativeButton={false} render={<Link href="/contact" />}>
            Book a Consultation
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <SheetContent side="right" className="w-full sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Megastar Law Associates</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {mainNav.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-2.5 text-base font-medium hover:bg-muted"
                  >
                    {item.title}
                  </Link>
                  {item.items && (
                    <div className="ml-3 flex flex-col border-l border-border pl-3">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-border p-4">
              <a
                href={`tel:${firm.helpline.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Phone className="size-4" /> {firm.helpline}
              </a>
              <Button nativeButton={false} render={<Link href="/contact" />}>
                Book a Consultation
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

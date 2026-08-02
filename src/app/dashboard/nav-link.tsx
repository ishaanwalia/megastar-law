"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  danger,
  children,
}: {
  href: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // "/dashboard" would otherwise light up on every child route.
  const active =
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
        danger
          ? "text-destructive/80 hover:bg-destructive/10 hover:text-destructive"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        active &&
          (danger
            ? "bg-destructive/10 text-destructive"
            : "bg-muted text-foreground")
      )}
    >
      {children}
    </Link>
  );
}

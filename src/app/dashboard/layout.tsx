import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gavel,
  CalendarClock,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/login/actions";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads & Clients", href: "/dashboard/clients", icon: Users },
  { title: "Matters", href: "/dashboard/matters", icon: Gavel },
  { title: "Appointments", href: "/dashboard/appointments", icon: CalendarClock },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-secondary/30 p-4 md:flex">
        <div className="mb-6 px-2">
          <div className="font-heading text-sm font-medium">
            Megastar Law
          </div>
          <div className="text-xs text-muted-foreground">Staff Portal</div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border pt-4">
          <div className="px-2.5 text-sm font-medium">
            {profile?.full_name ?? user.email}
          </div>
          <div className="px-2.5 text-xs text-muted-foreground capitalize">
            {profile?.role ?? "staff"}
          </div>
          <form action={logout} className="mt-2">
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <LogOut className="size-4" /> Sign out
            </Button>
          </form>
        </div>
      </aside>
      <main className="flex-1 bg-background p-6 md:p-8">{children}</main>
    </div>
  );
}

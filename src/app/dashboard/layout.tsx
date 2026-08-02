import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gavel,
  CalendarClock,
  Trash2,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { purgeExpiredTrash } from "@/lib/crm/purge-trash";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logout } from "@/app/login/actions";
import { NavLink } from "./nav-link";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads & Clients", href: "/dashboard/clients", icon: Users },
  { title: "Matters", href: "/dashboard/matters", icon: Gavel },
  { title: "Appointments", href: "/dashboard/appointments", icon: CalendarClock },
];

const secondaryNavItems = [
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
  { title: "Trash", href: "/dashboard/trash", icon: Trash2, danger: true },
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

  // Awaited deliberately: as a floating promise this silently never ran, because
  // the serverless function can freeze the moment the response is sent. It's a
  // few indexed deletes, and a failure must not block the dashboard.
  await purgeExpiredTrash(supabase, profile?.role === "advocate").catch(
    () => {}
  );

  const navContent = (
    <>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href}>
            <item.icon className="size-4" />
            {item.title}
          </NavLink>
        ))}
        <div className="my-2 border-t border-border" />
        {secondaryNavItems.map((item) => (
          <NavLink key={item.href} href={item.href} danger={item.danger}>
            <item.icon className="size-4" />
            {item.title}
          </NavLink>
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
    </>
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex items-center justify-between border-b border-border p-4 md:hidden">
        <div>
          <div className="font-heading text-sm font-medium">Megastar Law</div>
          <div className="text-xs text-muted-foreground">Staff Portal</div>
        </div>
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <SheetContent side="right" className="flex w-full flex-col p-4 sm:max-w-xs">
            <SheetHeader className="p-0">
              <SheetTitle>Megastar Law — Staff Portal</SheetTitle>
            </SheetHeader>
            {navContent}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-secondary/30 p-4 md:flex">
        <div className="mb-6 px-2">
          <div className="font-heading text-sm font-medium">
            Megastar Law
          </div>
          <div className="text-xs text-muted-foreground">Staff Portal</div>
        </div>
        {navContent}
      </aside>
      <main className="flex-1 bg-background p-6 md:p-8">{children}</main>
    </div>
  );
}

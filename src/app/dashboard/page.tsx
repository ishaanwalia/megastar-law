import Link from "next/link";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import type { Client, Appointment } from "@/lib/crm/types";

export default async function DashboardOverviewPage() {
  const supabase = await createClient();

  const [{ data: newLeads }, { data: upcoming }, { count: activeClients }] =
    await Promise.all([
      supabase
        .from("clients")
        .select("*")
        .eq("stage", "new")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("appointments")
        .select("*")
        .gte("scheduled_at", new Date().toISOString())
        .is("deleted_at", null)
        .order("scheduled_at", { ascending: true })
        .limit(5),
      supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .not("stage", "in", "(closed_won,closed_lost)")
        .is("deleted_at", null),
    ]);

  const leads = (newLeads ?? []) as Client[];
  const appointments = (upcoming ?? []) as Appointment[];

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Dashboard
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">Active Clients</div>
          <div className="mt-1 font-heading text-3xl font-medium">
            {activeClients ?? 0}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">New Leads</div>
          <div className="mt-1 font-heading text-3xl font-medium">
            {leads.length}
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-muted-foreground">
            Upcoming Appointments
          </div>
          <div className="mt-1 font-heading text-3xl font-medium">
            {appointments.length}
          </div>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-medium">
              New leads awaiting contact
            </h2>
            <Link
              href="/dashboard/clients"
              className="text-sm text-brand hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {leads.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No new leads right now.
              </p>
            )}
            {leads.map((lead) => (
              <Link
                key={lead.id}
                href={`/dashboard/clients/${lead.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm hover:bg-muted"
              >
                <span>{lead.full_name}</span>
                <span className="text-muted-foreground">{lead.phone}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-medium">
              Upcoming appointments
            </h2>
            <Link
              href="/dashboard/appointments"
              className="text-sm text-brand hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {appointments.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nothing scheduled.
              </p>
            )}
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
              >
                <span>{apt.title}</span>
                <span className="text-muted-foreground">
                  {format(new Date(apt.scheduled_at), "d MMM, h:mm a")}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

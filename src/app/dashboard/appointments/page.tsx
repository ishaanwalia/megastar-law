import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatISTDateTime } from "@/lib/crm/dates";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/lib/crm/types";
import { trashAppointment } from "./actions";
import { DeleteButton } from "../delete-button";

type AppointmentWithClient = Appointment & {
  clients: { full_name: string } | null;
};

export default async function AppointmentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("appointments")
    .select("*, clients(full_name)")
    .is("deleted_at", null)
    .order("scheduled_at", { ascending: true });

  const appointments = (data ?? []) as AppointmentWithClient[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          Appointments
        </h1>
        <Button
          size="sm"
          nativeButton={false}
          render={<Link href="/dashboard/appointments/new" />}
        >
          <Plus className="size-4" /> New Appointment
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {appointments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nothing scheduled yet.
          </p>
        )}
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border p-4"
          >
            <div>
              <div className="text-sm font-medium">{apt.title}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">
                {apt.clients?.full_name ?? "No client linked"}
                {apt.location ? ` · ${apt.location}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">
                {formatISTDateTime(apt.scheduled_at)}
              </div>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={`/dashboard/appointments/${apt.id}/edit`} />}
              >
                <Pencil className="size-3.5" /> Edit
              </Button>
              <DeleteButton
                label=""
                confirmMessage={`Move "${apt.title}" to Trash?`}
                onDelete={trashAppointment.bind(null, apt.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

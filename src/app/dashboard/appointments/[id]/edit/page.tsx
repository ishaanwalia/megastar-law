import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/submit-button";
import type { Appointment } from "@/lib/crm/types";
import { AppointmentFormFields } from "../../appointment-form-fields";
import { updateAppointment } from "../../actions";

export default async function EditAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: appointment }, { data: clients }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase
      .from("clients")
      .select("id, full_name")
      .is("deleted_at", null)
      .order("full_name"),
  ]);

  if (!appointment) notFound();

  const updateWithId = updateAppointment.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Edit {(appointment as Appointment).title}
      </h1>

      <form action={updateWithId} className="mt-6">
        <AppointmentFormFields
          clients={clients ?? []}
          defaultValues={appointment as Appointment}
        />
        <SubmitButton size="lg" pendingText="Saving…" className="mt-6">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}

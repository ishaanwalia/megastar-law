import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/submit-button";
import { AppointmentFormFields } from "../appointment-form-fields";
import { createAppointment } from "../actions";

export default async function NewAppointmentPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name")
    .is("deleted_at", null)
    .order("full_name");

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        New Appointment
      </h1>

      <form action={createAppointment} className="mt-6">
        <AppointmentFormFields clients={clients ?? []} />
        <SubmitButton size="lg" pendingText="Saving…" className="mt-6">
          Save Appointment
        </SubmitButton>
      </form>
    </div>
  );
}

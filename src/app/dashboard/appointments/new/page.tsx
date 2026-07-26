import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createAppointment } from "../actions";

export default async function NewAppointmentPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, full_name")
    .order("full_name");

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        New Appointment
      </h1>

      <form action={createAppointment} className="mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" name="title" required className="h-11" />
          </Field>

          <Field>
            <FieldLabel htmlFor="scheduled_at">Date &amp; time</FieldLabel>
            <Input
              id="scheduled_at"
              name="scheduled_at"
              type="datetime-local"
              required
              className="h-11"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="client_id">Client (optional)</FieldLabel>
            <select
              id="client_id"
              name="client_id"
              defaultValue=""
              className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            >
              <option value="">None</option>
              {(clients ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                </option>
              ))}
            </select>
          </Field>

          <Field>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input id="location" name="location" className="h-11" />
          </Field>

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea id="notes" name="notes" rows={3} />
          </Field>

          <Button type="submit" size="lg">
            Save Appointment
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

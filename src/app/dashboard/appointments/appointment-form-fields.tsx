import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { isoToISTInput } from "@/lib/crm/dates";
import type { Appointment } from "@/lib/crm/types";

const selectClassName =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

export function AppointmentFormFields({
  clients,
  defaultValues,
}: {
  clients: { id: string; full_name: string }[];
  defaultValues?: Partial<Appointment>;
}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="title">Title</FieldLabel>
        <Input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="h-11"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="scheduled_at">Date &amp; time (IST)</FieldLabel>
        <Input
          id="scheduled_at"
          name="scheduled_at"
          type="datetime-local"
          required
          // Stored as UTC, shown and edited as Chandigarh wall-clock time.
          defaultValue={
            defaultValues?.scheduled_at
              ? isoToISTInput(defaultValues.scheduled_at)
              : undefined
          }
          className="h-11"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="client_id">Client (optional)</FieldLabel>
        <select
          id="client_id"
          name="client_id"
          defaultValue={defaultValues?.client_id ?? ""}
          className={selectClassName}
        >
          <option value="">None</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name}
            </option>
          ))}
        </select>
      </Field>

      <Field>
        <FieldLabel htmlFor="location">Location</FieldLabel>
        <Input
          id="location"
          name="location"
          defaultValue={defaultValues?.location ?? ""}
          className="h-11"
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes ?? ""}
        />
      </Field>
    </FieldGroup>
  );
}

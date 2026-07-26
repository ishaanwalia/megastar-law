import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { practiceAreas } from "@/lib/firm-data";
import { createClientRecord } from "../actions";

export default function NewClientPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        New Lead
      </h1>

      <form action={createClientRecord} className="mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="full_name">Full name</FieldLabel>
            <Input id="full_name" name="full_name" required className="h-11" />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input id="phone" name="phone" required className="h-11" />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" className="h-11" />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="source">Source</FieldLabel>
              <select
                id="source"
                name="source"
                defaultValue=""
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="">Select&hellip;</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Call">Call</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="practice_area">Practice area</FieldLabel>
              <select
                id="practice_area"
                name="practice_area"
                defaultValue=""
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="">Select&hellip;</option>
                {practiceAreas.map((area) => (
                  <option key={area.slug} value={area.title}>
                    {area.title}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field orientation="horizontal">
            <input type="checkbox" id="is_nri" name="is_nri" className="size-4" />
            <FieldLabel htmlFor="is_nri" className="font-normal">
              NRI client
            </FieldLabel>
          </Field>

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea id="notes" name="notes" rows={4} />
          </Field>

          <Button type="submit" size="lg">
            Save Lead
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

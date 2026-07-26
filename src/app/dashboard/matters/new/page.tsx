import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { practiceAreas } from "@/lib/firm-data";
import { createMatter } from "../actions";

export default async function NewMatterPage({
  searchParams,
}: {
  searchParams: Promise<{ client_id?: string }>;
}) {
  const { client_id } = await searchParams;
  if (!client_id) notFound();

  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("id, full_name")
    .eq("id", client_id)
    .maybeSingle();

  if (!client) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        New Matter for {client.full_name}
      </h1>

      <form action={createMatter} className="mt-6">
        <input type="hidden" name="client_id" value={client.id} />
        <FieldGroup>
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

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="court">Court</FieldLabel>
              <select
                id="court"
                name="court"
                defaultValue=""
                className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              >
                <option value="">Select&hellip;</option>
                <option value="District Court">District Court</option>
                <option value="High Court">High Court</option>
                <option value="NCLT">NCLT</option>
                <option value="Consumer Forum">Consumer Forum</option>
                <option value="Other">Other</option>
              </select>
            </Field>
            <Field>
              <FieldLabel htmlFor="case_number">Case / FIR number</FieldLabel>
              <Input id="case_number" name="case_number" className="h-11" />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="opposing_party">Opposing party</FieldLabel>
            <Input id="opposing_party" name="opposing_party" className="h-11" />
          </Field>

          <Field>
            <FieldLabel htmlFor="next_hearing_date">
              Next hearing date
            </FieldLabel>
            <Input
              id="next_hearing_date"
              name="next_hearing_date"
              type="date"
              className="h-11"
            />
          </Field>

          <Button type="submit" size="lg">
            Save Matter
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { practiceAreas } from "@/lib/firm-data";
import { LITIGATION_STAGES, type Matter } from "@/lib/crm/types";

const selectClassName =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

export function MatterFormFields({
  defaultValues,
}: {
  defaultValues?: Partial<Matter>;
}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="practice_area">Practice area</FieldLabel>
        <select
          id="practice_area"
          name="practice_area"
          defaultValue={defaultValues?.practice_area ?? ""}
          className={selectClassName}
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
            defaultValue={defaultValues?.court ?? ""}
            className={selectClassName}
          >
            <option value="">Select&hellip;</option>
            <option value="District Court">District Court</option>
            <option value="High Court">High Court</option>
            <option value="Supreme Court">Supreme Court</option>
            <option value="NCLT">NCLT</option>
            <option value="DRT">DRT (Debt Recovery Tribunal)</option>
            <option value="Consumer Forum">Consumer Forum</option>
            <option value="RERA">RERA</option>
            <option value="Permanent Lok Adalat">Permanent Lok Adalat</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="case_number">Case / FIR number</FieldLabel>
          <Input
            id="case_number"
            name="case_number"
            defaultValue={defaultValues?.case_number ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="under_section">
            Under section / act
          </FieldLabel>
          <Input
            id="under_section"
            name="under_section"
            placeholder="e.g. 498A IPC, NI Act §138"
            defaultValue={defaultValues?.under_section ?? ""}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="litigation_stage">Litigation stage</FieldLabel>
          <select
            id="litigation_stage"
            name="litigation_stage"
            defaultValue={defaultValues?.litigation_stage ?? ""}
            className={selectClassName}
          >
            <option value="">Select&hellip;</option>
            {LITIGATION_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="opposing_party">Opposing party</FieldLabel>
          <Input
            id="opposing_party"
            name="opposing_party"
            defaultValue={defaultValues?.opposing_party ?? ""}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="opposing_advocate">
            Opposing advocate (optional)
          </FieldLabel>
          <Input
            id="opposing_advocate"
            name="opposing_advocate"
            defaultValue={defaultValues?.opposing_advocate ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="filing_date">Filing date</FieldLabel>
          <Input
            id="filing_date"
            name="filing_date"
            type="date"
            defaultValue={defaultValues?.filing_date ?? ""}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="next_hearing_date">
            Next hearing date
          </FieldLabel>
          <Input
            id="next_hearing_date"
            name="next_hearing_date"
            type="date"
            defaultValue={defaultValues?.next_hearing_date ?? ""}
            className="h-11"
          />
        </Field>
      </div>
    </FieldGroup>
  );
}

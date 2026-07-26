import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { practiceAreas } from "@/lib/firm-data";
import type { Client } from "@/lib/crm/types";

const selectClassName =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm";

export function ClientFormFields({
  defaultValues,
}: {
  defaultValues?: Partial<Client>;
}) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="full_name">Full name</FieldLabel>
        <Input
          id="full_name"
          name="full_name"
          required
          defaultValue={defaultValues?.full_name}
          className="h-11"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input
            id="phone"
            name="phone"
            required
            defaultValue={defaultValues?.phone}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="alternate_phone">
            Alternate phone (optional)
          </FieldLabel>
          <Input
            id="alternate_phone"
            name="alternate_phone"
            defaultValue={defaultValues?.alternate_phone ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={defaultValues?.email ?? ""}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="date_of_birth">Date of birth</FieldLabel>
          <Input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            defaultValue={defaultValues?.date_of_birth ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="address">Address</FieldLabel>
        <Textarea
          id="address"
          name="address"
          rows={2}
          defaultValue={defaultValues?.address ?? ""}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="id_proof_type">ID proof type</FieldLabel>
          <select
            id="id_proof_type"
            name="id_proof_type"
            defaultValue={defaultValues?.id_proof_type ?? ""}
            className={selectClassName}
          >
            <option value="">Select&hellip;</option>
            <option value="Aadhaar">Aadhaar</option>
            <option value="PAN">PAN</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
            <option value="Driving Licence">Driving Licence</option>
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field>
          <FieldLabel htmlFor="id_proof_number">ID proof number</FieldLabel>
          <Input
            id="id_proof_number"
            name="id_proof_number"
            defaultValue={defaultValues?.id_proof_number ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
          <Input
            id="occupation"
            name="occupation"
            defaultValue={defaultValues?.occupation ?? ""}
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="source">Source</FieldLabel>
          <select
            id="source"
            name="source"
            defaultValue={defaultValues?.source ?? ""}
            className={selectClassName}
          >
            <option value="">Select&hellip;</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Walk-in">Walk-in</option>
            <option value="Call">Call</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="referred_by">Referred by (optional)</FieldLabel>
          <Input
            id="referred_by"
            name="referred_by"
            defaultValue={defaultValues?.referred_by ?? ""}
            className="h-11"
          />
        </Field>
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field orientation="horizontal">
          <input
            type="checkbox"
            id="is_nri"
            name="is_nri"
            defaultChecked={defaultValues?.is_nri}
            className="size-4"
          />
          <FieldLabel htmlFor="is_nri" className="font-normal">
            NRI client
          </FieldLabel>
        </Field>
        <Field>
          <FieldLabel htmlFor="nri_country">
            NRI country of residence
          </FieldLabel>
          <Input
            id="nri_country"
            name="nri_country"
            defaultValue={defaultValues?.nri_country ?? ""}
            className="h-11"
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={defaultValues?.notes ?? ""}
        />
      </Field>
    </FieldGroup>
  );
}

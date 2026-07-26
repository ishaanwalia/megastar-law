import { SubmitButton } from "@/components/submit-button";
import { ClientFormFields } from "../client-form-fields";
import { createClientRecord } from "../actions";

export default function NewClientPage() {
  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        New Lead
      </h1>

      <form action={createClientRecord} className="mt-6">
        <ClientFormFields />
        <SubmitButton size="lg" pendingText="Saving…" className="mt-6">
          Save Lead
        </SubmitButton>
      </form>
    </div>
  );
}

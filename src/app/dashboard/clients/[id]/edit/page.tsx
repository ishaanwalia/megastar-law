import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/submit-button";
import type { Client } from "@/lib/crm/types";
import { ClientFormFields } from "../../client-form-fields";
import { updateClientRecord } from "../../actions";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!client) notFound();

  const updateClientWithId = updateClientRecord.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Edit {(client as Client).full_name}
      </h1>

      <form action={updateClientWithId} className="mt-6">
        <ClientFormFields defaultValues={client as Client} />
        <SubmitButton size="lg" pendingText="Saving…" className="mt-6">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SubmitButton } from "@/components/submit-button";
import type { Matter } from "@/lib/crm/types";
import { MatterFormFields } from "../../matter-form-fields";
import { updateMatter } from "../../actions";

export default async function EditMatterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: matter } = await supabase
    .from("matters")
    .select("*, clients(full_name)")
    .eq("id", id)
    .maybeSingle();

  if (!matter) notFound();

  const updateMatterWithId = updateMatter.bind(null, id);

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Edit Matter — {(matter as Matter & { clients: { full_name: string } | null }).clients?.full_name}
      </h1>

      <form action={updateMatterWithId} className="mt-6">
        <MatterFormFields defaultValues={matter as Matter} />
        <SubmitButton size="lg" pendingText="Saving…" className="mt-6">
          Save Changes
        </SubmitButton>
      </form>
    </div>
  );
}

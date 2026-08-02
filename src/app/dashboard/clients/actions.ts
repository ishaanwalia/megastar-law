"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/supabase/server";
import type { ClientStage } from "@/lib/crm/types";

const clientSchema = z.object({
  full_name: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  // Optional, but a typo'd address is worse than a blank one — the public
  // contact form already validates this, the CRM was the gap.
  email: z.union([z.email(), z.literal("")]).optional(),
  address: z.string().trim().optional(),
  alternate_phone: z.string().trim().optional(),
  id_proof_type: z.string().trim().optional(),
  id_proof_number: z.string().trim().optional(),
  date_of_birth: z.string().trim().optional(),
  occupation: z.string().trim().optional(),
  referred_by: z.string().trim().optional(),
  source: z.string().trim().optional(),
  practice_area: z.string().trim().optional(),
  is_nri: z.coerce.boolean().optional(),
  nri_country: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

function readClientForm(formData: FormData) {
  return clientSchema.parse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    alternate_phone: formData.get("alternate_phone"),
    id_proof_type: formData.get("id_proof_type"),
    id_proof_number: formData.get("id_proof_number"),
    date_of_birth: formData.get("date_of_birth"),
    occupation: formData.get("occupation"),
    referred_by: formData.get("referred_by"),
    source: formData.get("source"),
    practice_area: formData.get("practice_area"),
    is_nri: formData.get("is_nri") === "on",
    nri_country: formData.get("nri_country"),
    notes: formData.get("notes"),
  });
}

export async function createClientRecord(formData: FormData) {
  const parsed = readClientForm(formData);

  const { supabase } = await requireUser();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      ...parsed,
      email: parsed.email || null,
      date_of_birth: parsed.date_of_birth || null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${data.id}`);
}

export async function updateClientRecord(clientId: string, formData: FormData) {
  const parsed = readClientForm(formData);

  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("clients")
    .update({
      ...parsed,
      email: parsed.email || null,
      date_of_birth: parsed.date_of_birth || null,
    })
    .eq("id", clientId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function updateClientStage(clientId: string, stage: ClientStage) {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("clients")
    .update({ stage })
    .eq("id", clientId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
}

export async function trashClient(clientId: string) {
  const { supabase } = await requireUser();
  // One timestamp for the client and every matter it drags with it. Sharing the
  // exact value is what lets restore tell a cascaded matter apart from one that
  // was already in the Trash on its own — see restoreClient.
  const deletedAt = new Date().toISOString();

  const { error } = await supabase
    .from("clients")
    .update({ deleted_at: deletedAt })
    .eq("id", clientId);

  if (error) throw new Error(error.message);

  // Without this, a trashed client's matters stayed listed on /dashboard/matters
  // — and permanently deleting the client later FK-cascaded them away silently.
  const { error: mattersError } = await supabase
    .from("matters")
    .update({ deleted_at: deletedAt })
    .eq("client_id", clientId)
    .is("deleted_at", null);

  if (mattersError) throw new Error(mattersError.message);

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard/matters");
  revalidatePath("/dashboard/trash");
  redirect("/dashboard/clients");
}

export async function restoreClient(clientId: string) {
  const { supabase } = await requireUser();

  // Read the cascade stamp before clearing it — it's the only thing that
  // identifies which matters went into the Trash *with* this client.
  const { data: client } = await supabase
    .from("clients")
    .select("deleted_at")
    .eq("id", clientId)
    .single();

  const { error } = await supabase
    .from("clients")
    .update({ deleted_at: null })
    .eq("id", clientId);

  if (error) throw new Error(error.message);

  // Matters trashed in the same sweep come back; ones trashed on their own
  // earlier stay in the Trash, which is what the user actually asked for.
  if (client?.deleted_at) {
    const { error: mattersError } = await supabase
      .from("matters")
      .update({ deleted_at: null })
      .eq("client_id", clientId)
      .eq("deleted_at", client.deleted_at);

    if (mattersError) throw new Error(mattersError.message);
  }

  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard/matters");
  revalidatePath("/dashboard/trash");
}

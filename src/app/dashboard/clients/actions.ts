"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ClientStage } from "@/lib/crm/types";

const clientSchema = z.object({
  full_name: z.string().trim().min(2),
  phone: z.string().trim().min(7),
  email: z.string().trim().optional().or(z.literal("")),
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

  const supabase = await createClient();
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

  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({
      ...parsed,
      email: parsed.email || null,
      date_of_birth: parsed.date_of_birth || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", clientId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
  redirect(`/dashboard/clients/${clientId}`);
}

export async function updateClientStage(clientId: string, stage: ClientStage) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", clientId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/clients");
  revalidatePath(`/dashboard/clients/${clientId}`);
}

export async function trashClient(clientId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", clientId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard/trash");
  redirect("/dashboard/clients");
}

export async function restoreClient(clientId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({ deleted_at: null })
    .eq("id", clientId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/clients");
  revalidatePath("/dashboard/trash");
}

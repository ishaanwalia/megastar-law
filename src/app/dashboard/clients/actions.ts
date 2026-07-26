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
  source: z.string().trim().optional(),
  practice_area: z.string().trim().optional(),
  is_nri: z.coerce.boolean().optional(),
  notes: z.string().trim().optional(),
});

export async function createClientRecord(formData: FormData) {
  const parsed = clientSchema.parse({
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    source: formData.get("source"),
    practice_area: formData.get("practice_area"),
    is_nri: formData.get("is_nri") === "on",
    notes: formData.get("notes"),
  });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({ ...parsed, email: parsed.email || null })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/clients");
  redirect(`/dashboard/clients/${data.id}`);
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

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { MatterStatus } from "@/lib/crm/types";

const matterSchema = z.object({
  client_id: z.string().uuid(),
  practice_area: z.string().trim().optional(),
  opposing_party: z.string().trim().optional(),
  court: z.string().trim().optional(),
  case_number: z.string().trim().optional(),
  next_hearing_date: z.string().trim().optional(),
});

export async function createMatter(formData: FormData) {
  const parsed = matterSchema.parse({
    client_id: formData.get("client_id"),
    practice_area: formData.get("practice_area"),
    opposing_party: formData.get("opposing_party"),
    court: formData.get("court"),
    case_number: formData.get("case_number"),
    next_hearing_date: formData.get("next_hearing_date"),
  });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("matters")
    .insert({
      ...parsed,
      next_hearing_date: parsed.next_hearing_date || null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/matters");
  revalidatePath(`/dashboard/clients/${parsed.client_id}`);
  redirect(`/dashboard/matters/${data.id}`);
}

export async function updateMatterStatus(matterId: string, status: MatterStatus) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("matters")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", matterId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/matters");
  revalidatePath(`/dashboard/matters/${matterId}`);
}

export async function addMatterNote(matterId: string, formData: FormData) {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("matter_notes").insert({
    matter_id: matterId,
    author_id: user?.id,
    body,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/dashboard/matters/${matterId}`);
}

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
  opposing_advocate: z.string().trim().optional(),
  court: z.string().trim().optional(),
  case_number: z.string().trim().optional(),
  under_section: z.string().trim().optional(),
  filing_date: z.string().trim().optional(),
  next_hearing_date: z.string().trim().optional(),
  litigation_stage: z.string().trim().optional(),
});

function readMatterForm(formData: FormData) {
  return matterSchema.parse({
    client_id: formData.get("client_id"),
    practice_area: formData.get("practice_area"),
    opposing_party: formData.get("opposing_party"),
    opposing_advocate: formData.get("opposing_advocate"),
    court: formData.get("court"),
    case_number: formData.get("case_number"),
    under_section: formData.get("under_section"),
    filing_date: formData.get("filing_date"),
    next_hearing_date: formData.get("next_hearing_date"),
    litigation_stage: formData.get("litigation_stage"),
  });
}

export async function createMatter(formData: FormData) {
  const parsed = readMatterForm(formData);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("matters")
    .insert({
      ...parsed,
      filing_date: parsed.filing_date || null,
      next_hearing_date: parsed.next_hearing_date || null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/matters");
  revalidatePath(`/dashboard/clients/${parsed.client_id}`);
  redirect(`/dashboard/matters/${data.id}`);
}

export async function updateMatter(matterId: string, formData: FormData) {
  const parsed = readMatterForm(formData);

  const supabase = await createClient();
  const { error } = await supabase
    .from("matters")
    .update({
      ...parsed,
      filing_date: parsed.filing_date || null,
      next_hearing_date: parsed.next_hearing_date || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", matterId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/matters");
  revalidatePath(`/dashboard/matters/${matterId}`);
  redirect(`/dashboard/matters/${matterId}`);
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

export async function trashMatter(matterId: string, clientId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("matters")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", matterId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/matters");
  revalidatePath(`/dashboard/clients/${clientId}`);
  revalidatePath("/dashboard/trash");
  redirect(`/dashboard/clients/${clientId}`);
}

export async function restoreMatter(matterId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("matters")
    .update({ deleted_at: null })
    .eq("id", matterId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/matters");
  revalidatePath("/dashboard/trash");
}

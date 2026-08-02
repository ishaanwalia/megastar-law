"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireUser } from "@/lib/supabase/server";
import { istInputToISO } from "@/lib/crm/dates";

const appointmentSchema = z.object({
  title: z.string().trim().min(2),
  scheduled_at: z.string().trim().min(1),
  client_id: z.union([z.string().uuid(), z.literal("")]).optional(),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

function readAppointmentForm(formData: FormData) {
  return appointmentSchema.parse({
    title: formData.get("title"),
    scheduled_at: formData.get("scheduled_at"),
    client_id: formData.get("client_id"),
    location: formData.get("location"),
    notes: formData.get("notes"),
  });
}

export async function createAppointment(formData: FormData) {
  const parsed = readAppointmentForm(formData);

  const { supabase } = await requireUser();
  const { error } = await supabase.from("appointments").insert({
    ...parsed,
    client_id: parsed.client_id || null,
    // The form gives a bare local time; treat it as Chandigarh time, not as
    // whatever zone this server happens to run in.
    scheduled_at: istInputToISO(parsed.scheduled_at),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/appointments");
  revalidatePath("/dashboard");
  redirect("/dashboard/appointments");
}

export async function updateAppointment(
  appointmentId: string,
  formData: FormData
) {
  const parsed = readAppointmentForm(formData);

  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("appointments")
    .update({
      ...parsed,
      client_id: parsed.client_id || null,
      scheduled_at: istInputToISO(parsed.scheduled_at),
    })
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/appointments");
  revalidatePath("/dashboard");
  redirect("/dashboard/appointments");
}

export async function trashAppointment(appointmentId: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("appointments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/appointments");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/trash");
}

export async function restoreAppointment(appointmentId: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("appointments")
    .update({ deleted_at: null })
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/appointments");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/trash");
}

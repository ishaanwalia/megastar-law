"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const appointmentSchema = z.object({
  title: z.string().trim().min(2),
  scheduled_at: z.string().trim().min(1),
  client_id: z.string().uuid().optional().or(z.literal("")),
  location: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export async function createAppointment(formData: FormData) {
  const parsed = appointmentSchema.parse({
    title: formData.get("title"),
    scheduled_at: formData.get("scheduled_at"),
    client_id: formData.get("client_id"),
    location: formData.get("location"),
    notes: formData.get("notes"),
  });

  const supabase = await createClient();
  const { error } = await supabase.from("appointments").insert({
    ...parsed,
    client_id: parsed.client_id || null,
    scheduled_at: new Date(parsed.scheduled_at).toISOString(),
  });

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/appointments");
  redirect("/dashboard/appointments");
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAdvocate() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .maybeSingle();

  if (profile?.role !== "advocate") {
    throw new Error("Only an advocate can permanently delete records.");
  }

  return supabase;
}

export async function permanentlyDeleteClient(clientId: string) {
  const supabase = await requireAdvocate();
  const { error } = await supabase.from("clients").delete().eq("id", clientId);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/trash");
  revalidatePath("/dashboard/clients");
}

export async function permanentlyDeleteMatter(matterId: string) {
  const supabase = await requireAdvocate();
  const { error } = await supabase.from("matters").delete().eq("id", matterId);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/trash");
  revalidatePath("/dashboard/matters");
}

export async function permanentlyDeleteAppointment(appointmentId: string) {
  const supabase = await requireAdvocate();
  const { error } = await supabase
    .from("appointments")
    .delete()
    .eq("id", appointmentId);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/trash");
  revalidatePath("/dashboard/appointments");
}

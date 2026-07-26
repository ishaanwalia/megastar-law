"use server";

import { createClient } from "@/lib/supabase/server";

export type ChangePasswordState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) {
    return { status: "error", message: "New password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { status: "error", message: "New password and confirmation don't match." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return { status: "error", message: "Not signed in." };
  }

  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return { status: "error", message: "Current password is incorrect." };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}

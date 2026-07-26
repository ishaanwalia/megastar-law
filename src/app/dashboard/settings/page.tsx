import { createClient } from "@/lib/supabase/server";
import { ChangePasswordForm } from "./change-password-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Settings
      </h1>

      <div className="mt-6">
        <div className="text-sm text-muted-foreground">Signed in as</div>
        <div className="text-sm font-medium">{user?.email}</div>
      </div>

      <div className="mt-8">
        <h2 className="font-heading text-lg font-medium">Change password</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          You&apos;ll need your current password to set a new one.
        </p>
        <div className="mt-4">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}

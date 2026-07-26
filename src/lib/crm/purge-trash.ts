import type { SupabaseClient } from "@supabase/supabase-js";
import { TRASH_RETENTION_DAYS } from "@/lib/crm/types";

// Best-effort purge of trash older than the retention window — the same
// "Recently Deleted" pattern Apple Photos uses. Runs opportunistically on
// dashboard page loads rather than a scheduled job, so it needs no elevated
// service-role credentials: it relies on permissions the logged-in user
// already has (advocates can hard-delete clients/matters; any staff member
// can already delete appointments).
export async function purgeExpiredTrash(
  supabase: SupabaseClient,
  isAdvocate: boolean
) {
  const cutoff = new Date(
    Date.now() - TRASH_RETENTION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  if (isAdvocate) {
    await supabase
      .from("clients")
      .delete()
      .not("deleted_at", "is", null)
      .lt("deleted_at", cutoff);
    await supabase
      .from("matters")
      .delete()
      .not("deleted_at", "is", null)
      .lt("deleted_at", cutoff);
  }

  await supabase
    .from("appointments")
    .delete()
    .not("deleted_at", "is", null)
    .lt("deleted_at", cutoff);
}

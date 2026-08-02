import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { formatISTDate } from "@/lib/crm/dates";
import type { Matter } from "@/lib/crm/types";
import { SearchField } from "../search-field";

type MatterWithClient = Matter & {
  clients: { full_name: string; deleted_at: string | null } | null;
};

export default async function MattersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("matters")
    // `!inner` so the client's own deleted_at can be filtered on below.
    .select("*, clients!inner(full_name, deleted_at)")
    .is("deleted_at", null)
    // A matter whose client is in the Trash must not keep showing up here.
    .is("clients.deleted_at", null)
    .order("next_hearing_date", { ascending: true, nullsFirst: false });

  if (q?.trim()) {
    const term = q.trim().replace(/[,()\\*]/g, " ");
    query = query.or(
      `case_number.ilike.%${term}%,court.ilike.%${term}%,practice_area.ilike.%${term}%,under_section.ilike.%${term}%,opposing_party.ilike.%${term}%`
    );
  }

  const { data } = await query;
  const matters = (data ?? []) as MatterWithClient[];

  const emptyMessage = q
    ? `No matches for “${q}”.`
    : "No matters yet — add one from a client's page.";

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Matters
      </h1>

      <div className="mt-5">
        <SearchField placeholder="Search case no., court, section…" />
      </div>

      {/* Phone: the 8-column table is unreadable in a horizontal scroller, and
          a phone is where an advocate actually checks the next hearing. */}
      <div className="mt-6 flex flex-col gap-3 md:hidden">
        {matters.length === 0 && (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        )}
        {matters.map((matter) => (
          <Link
            key={matter.id}
            href={`/dashboard/matters/${matter.id}`}
            className="rounded-xl border border-border p-4 hover:bg-muted/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm font-medium">
                {matter.clients?.full_name ?? "—"}
              </div>
              <Badge
                variant={matter.status === "active" ? "default" : "secondary"}
                className="shrink-0 capitalize"
              >
                {matter.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              {matter.practice_area ?? "Matter"}
              {matter.case_number ? ` · ${matter.case_number}` : ""}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {matter.court ?? "—"}
              {matter.litigation_stage ? ` · ${matter.litigation_stage}` : ""}
            </div>
            <div className="mt-2 text-xs">
              <span className="text-muted-foreground">Next hearing: </span>
              {matter.next_hearing_date
                ? formatISTDate(matter.next_hearing_date)
                : "—"}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-xl border border-border md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/40 text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-2.5">Client</th>
              <th className="px-4 py-2.5">Practice Area</th>
              <th className="px-4 py-2.5">Under Section</th>
              <th className="px-4 py-2.5">Court</th>
              <th className="px-4 py-2.5">Case No.</th>
              <th className="px-4 py-2.5">Stage</th>
              <th className="px-4 py-2.5">Next Hearing</th>
              <th className="px-4 py-2.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {matters.map((matter) => (
              <tr
                key={matter.id}
                className="border-b border-border last:border-0 hover:bg-muted/50"
              >
                <td className="px-4 py-2.5">
                  <Link
                    href={`/dashboard/matters/${matter.id}`}
                    className="font-medium hover:text-brand"
                  >
                    {matter.clients?.full_name ?? "—"}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.practice_area ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.under_section ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.court ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.case_number ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.litigation_stage ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {matter.next_hearing_date
                    ? formatISTDate(matter.next_hearing_date)
                    : "—"}
                </td>
                <td className="px-4 py-2.5">
                  <Badge
                    variant={matter.status === "active" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {matter.status.replace("_", " ")}
                  </Badge>
                </td>
              </tr>
            ))}
            {matters.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

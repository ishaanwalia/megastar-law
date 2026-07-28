import Link from "next/link";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import type { Matter } from "@/lib/crm/types";

type MatterWithClient = Matter & { clients: { full_name: string } | null };

export default async function MattersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("matters")
    .select("*, clients(full_name)")
    .is("deleted_at", null)
    .order("next_hearing_date", { ascending: true, nullsFirst: false });

  const matters = (data ?? []) as MatterWithClient[];

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium tracking-tight">
        Matters
      </h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
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
                    ? format(new Date(matter.next_hearing_date), "d MMM yyyy")
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
                  No matters yet — add one from a client&apos;s page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

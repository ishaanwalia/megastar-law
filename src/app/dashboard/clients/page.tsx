import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/lib/crm/types";
import { StageSelect } from "./stage-select";
import { SearchField } from "../search-field";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("clients")
    .select("*")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (q?.trim()) {
    // Strip PostgREST's or() delimiters so a comma or paren typed in the search
    // box can't break out of the filter expression.
    const term = q.trim().replace(/[,()\\*]/g, " ");
    query = query.or(
      `full_name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%`
    );
  }

  const { data } = await query;
  const clients = (data ?? []) as Client[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          Leads &amp; Clients
        </h1>
        <Button size="sm" nativeButton={false} render={<Link href="/dashboard/clients/new" />}>
          <Plus className="size-4" /> New Lead
        </Button>
      </div>

      <div className="mt-5">
        <SearchField placeholder="Search name, phone or email…" />
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-secondary/40 text-left text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-2.5">Name</th>
              <th className="px-4 py-2.5">Phone</th>
              <th className="px-4 py-2.5">Practice Area</th>
              <th className="px-4 py-2.5">Source</th>
              <th className="px-4 py-2.5">Stage</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                <td className="px-4 py-2.5">
                  <Link
                    href={`/dashboard/clients/${client.id}`}
                    className="font-medium hover:text-brand"
                  >
                    {client.full_name}
                  </Link>
                  {client.is_nri && (
                    <Badge variant="secondary" className="ml-2">
                      NRI
                    </Badge>
                  )}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {client.phone}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {client.practice_area ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {client.source ?? "—"}
                </td>
                <td className="px-4 py-2.5">
                  <StageSelect clientId={client.id} stage={client.stage} />
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {q ? `No matches for “${q}”.` : "No leads or clients yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

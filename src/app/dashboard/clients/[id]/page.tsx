import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Client, Matter } from "@/lib/crm/types";
import { StageSelect } from "../stage-select";
import { trashClient } from "../actions";
import { DeleteButton } from "../../delete-button";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: client }, { data: matters }] = await Promise.all([
    supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase
      .from("matters")
      .select("*")
      .eq("client_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  const c = client as Client;
  const matterList = (matters ?? []) as Matter[];

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard/clients"
        className="text-sm text-muted-foreground hover:text-brand"
      >
        &larr; All Leads &amp; Clients
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight">
            {c.full_name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {c.phone} {c.email ? `· ${c.email}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StageSelect clientId={c.id} stage={c.stage} />
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/clients/${c.id}/edit`} />}
          >
            <Pencil className="size-3.5" /> Edit
          </Button>
          <DeleteButton
            confirmMessage={`Move "${c.full_name}" to Trash? You can restore it within 7 days.`}
            onDelete={trashClient.bind(null, c.id)}
          />
        </div>
      </div>

      <Card className="mt-6 grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Alternate Phone
          </div>
          <div className="mt-0.5 text-sm">{c.alternate_phone ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Date of Birth
          </div>
          <div className="mt-0.5 text-sm">
            {c.date_of_birth
              ? format(new Date(c.date_of_birth), "d MMM yyyy")
              : "—"}
          </div>
        </div>
        <div className="sm:col-span-2">
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Address
          </div>
          <div className="mt-0.5 text-sm whitespace-pre-wrap">
            {c.address ?? "—"}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            ID Proof
          </div>
          <div className="mt-0.5 text-sm">
            {c.id_proof_type
              ? `${c.id_proof_type}${c.id_proof_number ? ` — ${c.id_proof_number}` : ""}`
              : "—"}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Occupation
          </div>
          <div className="mt-0.5 text-sm">{c.occupation ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Source
          </div>
          <div className="mt-0.5 text-sm">
            {c.source ?? "—"}
            {c.referred_by ? ` (${c.referred_by})` : ""}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Practice Area
          </div>
          <div className="mt-0.5 text-sm">{c.practice_area ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            NRI
          </div>
          <div className="mt-0.5 text-sm">
            {c.is_nri ? `Yes${c.nri_country ? ` — ${c.nri_country}` : ""}` : "No"}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Added
          </div>
          <div className="mt-0.5 text-sm">
            {format(new Date(c.created_at), "d MMM yyyy")}
          </div>
        </div>
        {c.notes && (
          <div className="sm:col-span-2">
            <div className="text-xs tracking-wide text-muted-foreground uppercase">
              Notes
            </div>
            <div className="mt-0.5 text-sm whitespace-pre-wrap">{c.notes}</div>
          </div>
        )}
      </Card>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-medium">Matters</h2>
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/matters/new?client_id=${c.id}`} />}
          >
            <Plus className="size-4" /> New Matter
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {matterList.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No matters yet for this client.
            </p>
          )}
          {matterList.map((matter) => (
            <Link
              key={matter.id}
              href={`/dashboard/matters/${matter.id}`}
              className="flex items-center justify-between rounded-lg border border-border p-3 text-sm hover:bg-muted"
            >
              <span>{matter.practice_area ?? "Matter"}</span>
              <Badge
                variant={matter.status === "active" ? "default" : "secondary"}
                className="capitalize"
              >
                {matter.status.replace("_", " ")}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

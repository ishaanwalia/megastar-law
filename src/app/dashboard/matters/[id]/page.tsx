import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/submit-button";
import type { Matter, MatterNote } from "@/lib/crm/types";
import { MatterStatusSelect } from "../status-select";
import { addMatterNote, trashMatter } from "../actions";
import { DeleteButton } from "../../delete-button";

type MatterWithClient = Matter & {
  clients: { id: string; full_name: string; phone: string } | null;
};

export default async function MatterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: matter }, { data: notes }] = await Promise.all([
    supabase
      .from("matters")
      .select("*, clients(id, full_name, phone)")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle(),
    supabase
      .from("matter_notes")
      .select("*")
      .eq("matter_id", id)
      .order("created_at", { ascending: false }),
  ]);

  if (!matter) notFound();

  const m = matter as MatterWithClient;
  const noteList = (notes ?? []) as MatterNote[];
  const addNote = addMatterNote.bind(null, id);

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard/matters"
        className="text-sm text-muted-foreground hover:text-gold"
      >
        &larr; All Matters
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-medium tracking-tight">
            {m.practice_area ?? "Matter"} —{" "}
            <Link
              href={`/dashboard/clients/${m.clients?.id}`}
              className="hover:text-gold"
            >
              {m.clients?.full_name}
            </Link>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {m.clients?.phone}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MatterStatusSelect matterId={m.id} status={m.status} />
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/matters/${m.id}/edit`} />}
          >
            <Pencil className="size-3.5" /> Edit
          </Button>
          <DeleteButton
            confirmMessage="Move this matter to Trash? You can restore it within 7 days."
            onDelete={trashMatter.bind(null, m.id, m.client_id)}
          />
        </div>
      </div>

      <Card className="mt-6 grid gap-4 p-5 sm:grid-cols-2">
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Court
          </div>
          <div className="mt-0.5 text-sm">{m.court ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Case / FIR Number
          </div>
          <div className="mt-0.5 text-sm">{m.case_number ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Under Section / Act
          </div>
          <div className="mt-0.5 text-sm">{m.under_section ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Litigation Stage
          </div>
          <div className="mt-0.5 text-sm">{m.litigation_stage ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Opposing Party
          </div>
          <div className="mt-0.5 text-sm">{m.opposing_party ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Opposing Advocate
          </div>
          <div className="mt-0.5 text-sm">{m.opposing_advocate ?? "—"}</div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Filing Date
          </div>
          <div className="mt-0.5 text-sm">
            {m.filing_date ? format(new Date(m.filing_date), "d MMM yyyy") : "—"}
          </div>
        </div>
        <div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            Next Hearing
          </div>
          <div className="mt-0.5 text-sm">
            {m.next_hearing_date
              ? format(new Date(m.next_hearing_date), "d MMM yyyy")
              : "—"}
          </div>
        </div>
      </Card>

      <div className="mt-8">
        <h2 className="font-heading text-lg font-medium">Notes &amp; Updates</h2>

        <form action={addNote} className="mt-4 flex flex-col gap-3">
          <Textarea
            name="body"
            placeholder="Add an update on this matter…"
            required
            rows={3}
          />
          <SubmitButton size="sm" pendingText="Adding…" className="self-end">
            Add Note
          </SubmitButton>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          {noteList.length === 0 && (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          )}
          {noteList.map((note) => (
            <div key={note.id} className="border-l-2 border-border pl-4">
              <div className="text-xs text-muted-foreground">
                {format(new Date(note.created_at), "d MMM yyyy, h:mm a")}
              </div>
              <p className="mt-1 text-sm whitespace-pre-wrap">{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

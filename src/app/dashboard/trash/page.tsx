import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Client, Matter, Appointment } from "@/lib/crm/types";
import { TrashRow } from "./trash-row";
import { restoreClient } from "../clients/actions";
import { restoreMatter } from "../matters/actions";
import { restoreAppointment } from "../appointments/actions";
import {
  permanentlyDeleteClient,
  permanentlyDeleteMatter,
  permanentlyDeleteAppointment,
} from "./actions";

export default async function TrashPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .maybeSingle();
  const canPermanentlyDelete = profile?.role === "advocate";

  const [{ data: clients }, { data: matters }, { data: appointments }] =
    await Promise.all([
      supabase
        .from("clients")
        .select("*")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false }),
      supabase
        .from("matters")
        .select("*, clients(full_name)")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false }),
      supabase
        .from("appointments")
        .select("*, clients(full_name)")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false }),
    ]);

  const clientList = (clients ?? []) as Client[];
  const matterList = (matters ?? []) as (Matter & {
    clients: { full_name: string } | null;
  })[];
  const appointmentList = (appointments ?? []) as (Appointment & {
    clients: { full_name: string } | null;
  })[];

  const isEmpty =
    clientList.length === 0 &&
    matterList.length === 0 &&
    appointmentList.length === 0;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2.5">
        <Trash2 className="size-6 text-destructive" />
        <h1 className="font-heading text-2xl font-medium tracking-tight">
          Trash
        </h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Deleted items are kept for 7 days and can be restored. After that
        they&apos;re removed automatically — the same pattern Apple Photos
        uses for &quot;Recently Deleted.&quot;
      </p>

      {isEmpty && (
        <p className="mt-8 text-sm text-muted-foreground">Trash is empty.</p>
      )}

      {clientList.length > 0 && (
        <div className="mt-8">
          <h2 className="font-heading text-lg font-medium">Leads &amp; Clients</h2>
          <div className="mt-3 flex flex-col gap-3">
            {clientList.map((client) => (
              <TrashRow
                key={client.id}
                title={client.full_name}
                subtitle={client.phone}
                deletedAt={client.deleted_at!}
                canPermanentlyDelete={canPermanentlyDelete}
                onRestore={restoreClient.bind(null, client.id)}
                onPermanentlyDelete={permanentlyDeleteClient.bind(null, client.id)}
              />
            ))}
          </div>
        </div>
      )}

      {matterList.length > 0 && (
        <div className="mt-8">
          <h2 className="font-heading text-lg font-medium">Matters</h2>
          <div className="mt-3 flex flex-col gap-3">
            {matterList.map((matter) => (
              <TrashRow
                key={matter.id}
                title={matter.practice_area ?? "Matter"}
                subtitle={matter.clients?.full_name}
                deletedAt={matter.deleted_at!}
                canPermanentlyDelete={canPermanentlyDelete}
                onRestore={restoreMatter.bind(null, matter.id)}
                onPermanentlyDelete={permanentlyDeleteMatter.bind(null, matter.id)}
              />
            ))}
          </div>
        </div>
      )}

      {appointmentList.length > 0 && (
        <div className="mt-8">
          <h2 className="font-heading text-lg font-medium">Appointments</h2>
          <div className="mt-3 flex flex-col gap-3">
            {appointmentList.map((apt) => (
              <TrashRow
                key={apt.id}
                title={apt.title}
                subtitle={apt.clients?.full_name}
                deletedAt={apt.deleted_at!}
                canPermanentlyDelete={canPermanentlyDelete}
                onRestore={restoreAppointment.bind(null, apt.id)}
                onPermanentlyDelete={permanentlyDeleteAppointment.bind(null, apt.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

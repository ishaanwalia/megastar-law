"use client";

import { useTransition } from "react";
import type { MatterStatus } from "@/lib/crm/types";
import { updateMatterStatus } from "./actions";

const STATUSES: { value: MatterStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "on_hold", label: "On Hold" },
  { value: "closed", label: "Closed" },
];

export function MatterStatusSelect({
  matterId,
  status,
}: {
  matterId: string;
  status: MatterStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value as MatterStatus;
        startTransition(() => updateMatterStatus(matterId, next));
      }}
      className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

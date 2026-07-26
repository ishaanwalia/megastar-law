"use client";

import { useTransition } from "react";
import { CLIENT_STAGES, type ClientStage } from "@/lib/crm/types";
import { updateClientStage } from "./actions";

export function StageSelect({
  clientId,
  stage,
}: {
  clientId: string;
  stage: ClientStage;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={stage}
      disabled={pending}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        e.stopPropagation();
        const next = e.target.value as ClientStage;
        startTransition(() => updateClientStage(clientId, next));
      }}
      className="h-8 rounded-lg border border-input bg-transparent px-2 text-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {CLIENT_STAGES.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}

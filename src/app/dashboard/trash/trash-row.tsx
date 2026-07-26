"use client";

import { useTransition } from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRASH_RETENTION_DAYS } from "@/lib/crm/types";

export function TrashRow({
  title,
  subtitle,
  deletedAt,
  canPermanentlyDelete,
  onRestore,
  onPermanentlyDelete,
}: {
  title: string;
  subtitle?: string;
  deletedAt: string;
  canPermanentlyDelete: boolean;
  onRestore: () => Promise<void>;
  onPermanentlyDelete: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  const deletedDate = new Date(deletedAt);
  const daysElapsed = Math.floor(
    (Date.now() - deletedDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysLeft = Math.max(0, TRASH_RETENTION_DAYS - daysElapsed);

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-destructive/20 bg-destructive/[0.03] p-4">
      <div>
        <div className="text-sm font-medium">{title}</div>
        {subtitle && (
          <div className="text-sm text-muted-foreground">{subtitle}</div>
        )}
        <div className="mt-1 text-xs text-destructive">
          {daysLeft > 0
            ? `Permanently deleted in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`
            : "Will be permanently deleted shortly"}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => startTransition(onRestore)}
        >
          <RotateCcw className="size-3.5" /> Restore
        </Button>
        {canPermanentlyDelete && (
          <Button
            variant="destructive"
            size="sm"
            disabled={pending}
            onClick={() => {
              if (confirm(`Permanently delete "${title}"? This cannot be undone.`)) {
                startTransition(onPermanentlyDelete);
              }
            }}
          >
            <Trash2 className="size-3.5" /> Delete Permanently
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteButton({
  label = "Delete",
  confirmMessage,
  onDelete,
}: {
  label?: string;
  confirmMessage: string;
  onDelete: () => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={() => {
        if (confirm(confirmMessage)) {
          startTransition(onDelete);
        }
      }}
    >
      {pending ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Trash2 className="size-3.5" />
      )}
      {label}
    </Button>
  );
}

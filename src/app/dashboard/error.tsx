"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Without this, a Server Action that threw rendered as a blank page — which is
 * exactly how a failed save read as "the button is broken."
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[dashboard]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <AlertTriangle className="mx-auto size-8 text-destructive" />
      <h1 className="mt-4 font-heading text-xl font-medium tracking-tight">
        That didn&apos;t save
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || "Something went wrong."}
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
        Nothing was changed. Try again — if it keeps happening, note what you
        were editing before reporting it.
      </p>
      <div className="mt-6 flex justify-center gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button
          variant="outline"
          nativeButton={false}
          render={<a href="/dashboard" />}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
}

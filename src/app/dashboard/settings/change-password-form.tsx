"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { SubmitButton } from "@/components/submit-button";
import { changePassword, type ChangePasswordState } from "./actions";

const initialState: ChangePasswordState = { status: "idle" };

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="max-w-sm">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="newPassword">New password</FieldLabel>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">
            Confirm new password
          </FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11"
          />
        </Field>

        {state.status === "error" && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}
        {state.status === "success" && (
          <p className="flex items-center gap-1.5 text-sm text-brand">
            <CheckCircle2 className="size-4" /> Password updated.
          </p>
        )}

        <SubmitButton pendingText="Updating…">Update password</SubmitButton>
      </FieldGroup>
    </form>
  );
}

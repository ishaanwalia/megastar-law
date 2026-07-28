"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { practiceAreas } from "@/lib/firm-data";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-10 text-center"
      >
        <CheckCircle2 className="size-8 text-brand" />
        <h3 className="font-heading text-xl font-medium">Message sent</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thank you for reaching out. The firm will get back to you shortly —
          for anything urgent, call the 24/7 helpline directly.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate aria-live="polite">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="h-11"
          />
          <FieldError>{state.fieldErrors?.name}</FieldError>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="h-11"
            />
            <FieldError>{state.fieldErrors?.phone}</FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email (optional)</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-11"
            />
            <FieldError>{state.fieldErrors?.email}</FieldError>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="practiceArea">
            Practice area (optional)
          </FieldLabel>
          <select
            id="practiceArea"
            name="practiceArea"
            className="h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
            defaultValue=""
          >
            <option value="">Select one&hellip;</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.title}>
                {area.title}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="message">How can we help?</FieldLabel>
          <Textarea id="message" name="message" required rows={5} />
          <FieldError>{state.fieldErrors?.message}</FieldError>
        </Field>

        {state.status === "error" && state.message && (
          <p className="text-sm text-destructive">{state.message}</p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full sm:w-auto"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          Send Message
        </Button>
      </FieldGroup>
    </form>
  );
}

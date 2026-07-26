"use server";

import { z } from "zod";
import { Resend } from "resend";
import { firm } from "@/lib/firm-data";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  email: z.email("Enter a valid email").optional().or(z.literal("")),
  practiceArea: z.string().trim().optional(),
  message: z.string().trim().min(10, "Tell us a little about your matter"),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    practiceArea: formData.get("practiceArea"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof contactSchema>;
      fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  const { name, phone, email, practiceArea, message } = parsed.data;

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: "Megastar Law Website <onboarding@resend.dev>",
        to: firm.email,
        replyTo: email || undefined,
        subject: `New consultation request — ${name}`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          email ? `Email: ${email}` : null,
          practiceArea ? `Practice area: ${practiceArea}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch {
      return {
        status: "error",
        message:
          "We couldn't send your message right now — please call the helpline instead.",
      };
    }
  } else {
    // No RESEND_API_KEY configured yet — log locally so submissions aren't
    // silently lost during development. Wire up a real key before launch.
    console.log("[contact form submission — no RESEND_API_KEY set]", {
      name,
      phone,
      email,
      practiceArea,
      message,
    });
  }

  return { status: "success" };
}

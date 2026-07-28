import { Suspense } from "react";
import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Staff Login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
      <p className="text-sm font-medium tracking-wide text-brand uppercase">
        Megastar Law Associates
      </p>
      <h1 className="mt-2 font-heading text-2xl font-medium tracking-tight">
        Staff Login
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Internal access only.
      </p>
      <div className="mt-8">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Every Server Action re-checks auth itself instead of trusting `proxy.ts`.
 * Action IDs are routable from any URL — including public routes the proxy's
 * `/dashboard/:path*` matcher never sees — so the middleware alone is not a
 * gate. RLS is the last line; this is the first.
 */
export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be signed in to do that.");

  return { supabase, user };
}

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component — middleware refreshes the
            // session instead, so this can be safely ignored.
          }
        },
      },
    }
  );
}

# Megastar Law — Audit & Remediation

Audited 2026-08-02, remediated 2026-08-03. Verified against the **live** Supabase
project `tuugxjdvvojejkzisgdq`, not just the repo.

**Status: all findings closed except the three recorded as accepted decisions.**

---

## P0 — The two reported problems

### P0-1. Broken save button — **FIXED**

`matters/[id]/edit` renders `<MatterFormFields />`, which has no `client_id`
field, but `updateMatter`'s schema required `client_id: z.string().uuid()`. So
`formData.get("client_id")` was `null`, Zod threw, the action 500'd, and the
button spun forever with no message. New Matter worked only because it has a
hidden input.

Fixed by removing `client_id` from the shared schema entirely — an edit form
must not be able to reassign a matter to a different client, and re-writing the
same value is a no-op. `createMatter` reads and validates it separately.

The wider cause — every action used `.parse()` with no error UI, so *any*
validation failure looked identical — is addressed by `dashboard/error.tsx`.

### P0-2. CRM was on UTC, not IST — **FIXED, including the corrupted row**

The website clock (`chandigarh-clock.tsx`) was always correct. The CRM was not.

`new Date("2026-09-05T10:30")` parses a `datetime-local` string in the *server's*
zone; Vercel runs UTC. Confirmed against the live row — you typed 10:30, the
database held `10:30+00`, i.e. **16:00 IST**. The display path had the mirror
bug (`format()` also ran server-side in UTC), so the two errors cancelled on
screen and hid the corruption.

What didn't cancel: "Upcoming appointments" kept a 10:30 appointment listed until
16:00 IST, and `next dev` on an IST machine rendered 16:00 where prod rendered
10:30.

- All conversion now goes through `src/lib/crm/dates.ts` (`Intl`, no new dependency).
- The one mis-stored appointment was backfilled to `05:00+00` = 10:30 IST.
- `src/lib/crm/dates.test.ts` — 4 assertions, run under `TZ=UTC`,
  `TZ=Asia/Kolkata` and `TZ=America/New_York`; they pass identically in all
  three, which is precisely the property that was broken. `npm test`.
- `date-fns` removed — it was the only consumer and is now unused.

---

## Security — FIXED

- **S1** Every Server Action now calls `requireUser()`. Action IDs are routable
  from any URL, including public routes `proxy.ts` never sees, so middleware
  alone was not a gate.
- **S3** `revoke execute on handle_new_user()` — a SECURITY DEFINER trigger
  function was reachable as `/rpc/handle_new_user`.
- **S7** Security headers in `next.config.ts`: `X-Frame-Options: SAMEORIGIN`
  (chosen over DENY because practice-area pages iframe this same origin),
  `nosniff`, `Referrer-Policy`, HSTS, `Permissions-Policy`. `/dashboard/*`
  additionally sends `X-Robots-Tag: noindex` and `Cache-Control: private, no-store`.
- **S5** Aadhaar/PAN masked on screen with click-to-reveal (`masked-id.tsx`);
  stored readable so search and export keep working — *your decision*.

### Accepted risks — your explicit decisions, not oversights

- **S2 — anon lead-flooding, left open.** `"website can insert leads"` is
  directly reachable and unrate-limited; anyone can `curl` the endpoint and fill
  the CRM with junk. Closing it means moving the contact insert to
  `SUPABASE_SECRET_KEY` and dropping the anon policy. Cleanup meanwhile is
  manual deletion.
- **S4 — no per-actor audit trail.** You asked for timestamps rather than a
  "who" log, so `updated_at` is now stamped by a **database trigger** (not app
  code, so an edit made in the SQL editor still records), `appointments` gained
  an `updated_at`, and "Last Updated" is shown on client and matter pages. There
  is still no record of *which* staff member made a change.
- **S6 — leaked-password protection is off.** One toggle in the Supabase
  dashboard (Auth → Policies); I can't set it from here.
- **No CSP.** Deliberately omitted: the live iframe previews and framer-motion
  inline styles need a tested policy, not a guessed one.

---

## Logic & data integrity — FIXED

- **L1** Trashing a client now cascades to its matters, and restore brings back
  only those trashed in the same sweep (matched on the shared timestamp), so a
  matter trashed earlier on its own stays trashed. The matters list also filters
  out any matter whose client is in the Trash.
- **L2** `supabase/schema.sql` regenerated from the live database. It had drifted
  badly — missing 9 columns on `clients`, 5 on `matters`, `deleted_at`
  everywhere — while still saying "run once to set up". Rebuilding from it
  produced a CRM where every save failed.
- **L3** CRM email field now validated (`z.email()`), matching the public form.
- **L4** `updateMatter` revalidates the client page.
- **L5** `purgeExpiredTrash` is awaited — as a floating promise it silently never
  ran, because the serverless function can freeze once the response is sent.
- **L7** `updated_at` moved to a database trigger.
- **L6 — duplicate phone numbers: left as-is** (*your decision*). A unique
  constraint would block a family sharing one number.

---

## UX — FIXED

`error.tsx` (the reason a failed save read as a dead button) · `loading.tsx` ·
search on clients and matters · active nav state · appointment **edit** (create
and delete existed, edit didn't) · card layout for matters on phones instead of
an 8-column horizontal scroller · masked ID numbers.

**U9** — 11 ESLint errors cleared. `floating-widgets` now reads consent via
`useSyncExternalStore` instead of a mount effect; `hover-reveal-list` and
`reading-rail` derive reset state during render rather than setState-in-effect.
Also fixed a pre-existing missing space on the privacy page
("Associates(&ldquo;we&rdquo;") caused by JSX whitespace trimming.

---

## Verification

`npx tsc --noEmit` clean · `npx eslint src` clean (was 11 errors) ·
`npm run build` succeeds · `npm test` 4/4 in three timezones · all 10 public
routes 200 · security headers confirmed on the wire · `/dashboard` 307s to
`/login` when signed out · `updated_at` trigger confirmed firing via SQL ·
cookie banner, reading rail and client-side route changes verified in-browser
with no console or server errors.

**Not verified by me:** the CRM screens behind login — I have no credentials and
won't enter a password. The save fix is confirmed by the schema change, a clean
typecheck and a successful build; please click through Edit Matter once.

**Gotcha:** running `npm run build` and then `next dev` against the same `.next`
directory makes every route except `/` 404. `rm -rf .next` fixes it. Not a code
bug — cost me a confusing ten minutes, noting it so it doesn't cost you the same.

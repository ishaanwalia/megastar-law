# Pending — Megastar Law

As of 2026-08-03. Everything still open, grouped by who can unblock it.

---

## 🔴 URGENT — live and costing enquiries right now

**The contact form is telling every visitor it's broken.**

`contact/actions.ts` has no `RESEND_API_KEY`, so it takes the else-branch and
returns *"Our contact form is not accepting messages right now — please call the
24/7 helpline."*

The comment there says it refuses to report success so a visitor doesn't wrongly
believe the firm has their enquiry. That reasoning was sound when written — but
it is now **wrong**, because the lead is inserted into Supabase *before* the
email is attempted. The firm does have the enquiry. The form is telling people
it failed when it succeeded, and pushing them to phone instead.

Fix needs no credentials and can ship today: report success when the CRM insert
succeeded, and treat the notification email as a separate best-effort step.
Awaiting your go-ahead.

---

## Blocked on the client (Pradeep / the firm)

1. **Gmail App Password** for `megastarlaw@gmail.com` — needs 2-Step
   Verification enabled first. Deferred to tomorrow. Until then, notification
   emails cannot be sent by any method that uses the firm's own mailbox.
2. **Where should enquiry alerts go?** `megastarlaw@gmail.com`, a different
   address, or both advocates?
3. **Confirm the firm profile facts** — `PLAN.md` §0. The "150 Partners and
   Associates", "29 years", and 12-city office claims read as templated
   boilerplate and overlap another firm's material. They are currently parked in
   `additionalOfficeCitiesPendingConfirmation` and rendered nowhere, which is the
   right call — but the real numbers are still needed before the About/Why-Us
   copy can be finalised.
4. **Custom domain** — the site is on `megastar-law.vercel.app`. Needs a domain
   chosen, bought and attached.

## Blocked on you (Ishaan)

5. **Push the commit** — `git push origin master`. Blocked for me by the
   permission classifier. Until this lands, production still has the Edit Matter
   save bug and still writes appointments 5.5 hours off.
6. **Click through Edit Matter** once, to confirm the save fix. I have no login
   and won't enter a password, so this is the one fix I could not verify myself.
7. **Create a test appointment on production** after deploying, and confirm the
   listed time matches what you typed. This is the only way to prove the IST fix
   on a real UTC server.
8. **Enable leaked-password protection** — Supabase → Authentication → Policies.
   One toggle.
9. **Confirm whether `RESEND_API_KEY` exists in Vercel.** I can't read your env
   vars. If Resend is definitely dead, the dependency and code come out.

## Decisions still open

10. **Notification method** — Gmail SMTP (data stays Google→Google, needs the
    App Password), a third-party form relay (no credential, but a third party
    receives prospective clients' matter descriptions), or CRM-only with no
    email at all. Deferred pending item 1.
11. **Lead-flooding (S2)** — accepted as open. Anyone can POST to the database
    endpoint and fill the CRM with junk. Fix is ~10 min plus one Vercel env var.
12. **Content Security Policy** — needs testing against the live iframe previews
    and framer-motion inline styles, so it's a small focused job, not a one-liner.
13. **Per-actor audit trail** — you chose timestamps over a who-log. Worth
    revisiting if the firm takes on staff.
14. **Duplicate phone numbers** — accepted as-is.

## Code I can do whenever you say

15. **Pagination** on the clients and matters lists — I listed it in the original
    audit, then neither built it nor recorded it as deferred. My oversight.
    Search covers you until the lists get long.
16. **Replace `window.confirm()`** on the delete buttons with a styled dialog.
    Functional today, just visually out of step.
17. **Remove Resend** — dependency, `src/emails/contact-notification.tsx`, and
    the env branch, once item 10 is settled.

---

## Done and verified (for reference)

Edit Matter save fix · IST correctness across write, read and the one corrupted
row · `requireUser()` on every Server Action · security headers · masked
Aadhaar/PAN · trash cascade · `schema.sql` regenerated from live · `updated_at`
DB trigger · error and loading boundaries · search · active nav · appointment
edit · matters as cards on phones · 11 ESLint errors cleared · 4 timezone tests.

Full detail in `AUDIT.md`.

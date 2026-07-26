# Megastar Law Associates — Internal CRM: Feature Spec (for client sign-off)

Purpose: a simple, secure internal tool for Pradeep and Nikhil to track leads, clients, and cases from first contact through resolution — not a full practice-management suite. Scoped deliberately small so it actually gets used daily.

**Status (2026-07-26): v1 built and tested end-to-end**, ahead of the client answering the open questions below (built on reasonable defaults per instruction — revisit once answered). Staff log in at `/login` (not linked from public nav). Live on Supabase project `megastar-law` (org `ishaanwalia`), schema in [supabase/schema.sql](supabase/schema.sql). Built: auth/login, dashboard overview, Leads & Clients (pipeline + detail + new-lead form), Matters (detail, status, notes timeline, new-matter form), Appointments (list + new form), and the public Contact form auto-creating a Website-sourced lead. Not yet built from the spec below: document upload/vault, reports, appointment email reminders.

## 1. Login & Access
- Email + password login, restricted to firm staff only (no public sign-up).
- Two roles to start: **Advocate** (full access) and **Staff** (can log leads/notes, can't delete records or see billing if added later).
- Password reset via email.

## 2. Dashboard (home screen after login)
- Today's hearings/appointments at a glance.
- New leads awaiting first contact.
- Tasks/follow-ups due today or overdue.
- Quick counts: active clients, open matters, leads this month.

## 3. Leads & Clients
- Add a lead manually (name, phone, email, how they found the firm, practice area of interest, notes).
- Pipeline stages: **New → Contacted → Consultation Scheduled → Retained → Closed (Won/Lost)**.
- Move a lead between stages (drag or dropdown).
- Convert a retained lead into a Client record.
- Search/filter clients by name, phone, practice area, or stage.
- Flag for NRI clients (given the firm's 498A/NRI specialization) — quick filter.

## 4. Matters (Cases)
- Each Matter is linked to a Client.
- Fields: practice area, opposing party, court (District Court / High Court / other), case/FIR number, next hearing date, status (Active/On Hold/Closed).
- Timeline of notes/updates on each matter, newest first, with date and author (Pradeep or Nikhil).
- List of hearings for a matter with date + one-line outcome.

## 5. Appointments / Calendar
- Simple calendar view of consultations and hearings.
- Add/edit/cancel an appointment, linked to a client or matter.
- Optional: reminder email the day before (needs client confirmation — see open questions).

## 6. Documents
- Upload documents against a Client or Matter (ID proofs, case papers, drafts).
- Basic folder-per-matter organization, download/view, delete (Advocate role only).
- Files stored securely, not publicly accessible by URL guessing.

## 7. Contact-Form Intake
- Every submission from the public website's Contact form lands automatically as a new Lead in the pipeline (source = "Website"), so nothing sent through the site gets missed.

## 8. Reports (basic, v1)
- Leads by source (Website / Referral / Walk-in / Call) and by month.
- Conversion rate: leads → retained clients.
- Active matters by practice area.

---

## Explicitly NOT in v1 (can be added later if wanted)
- Billing / invoicing / payment tracking.
- Court e-filing integrations.
- SMS reminders (email only to start — SMS costs money per message; can add later if wanted).
- Multi-office / multi-branch permission structure (fine for 2 advocates + staff; would need rework for 150+ users).
- Mobile app (the dashboard will be usable on a phone browser, but not a native app).

## Open questions for the client
1. **Roles**: is "Advocate" vs "Staff" (2 roles) enough, or does Nikhil need a different permission level than office staff?
2. **How many people** will actually log into this day to day? (affects whether we need more granular permissions)
3. **Appointment reminders**: email only, or is SMS worth the added cost?
4. **Document sensitivity**: any documents that should be restricted even from Staff role (e.g., client ID proofs)?
5. Anything from the "not in v1" list above that's actually a must-have from day one?

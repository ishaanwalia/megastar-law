-- Megastar Law Associates CRM schema.
--
-- Regenerated 2026-08-03 to match the LIVE database (project tuugxjdvvojejkzisgdq).
-- The previous version of this file had drifted badly — it was missing 9 columns
-- on `clients`, 5 on `matters`, and `deleted_at` on every table — so rebuilding
-- from it produced a CRM where every save failed. Keep this file in step with
-- any migration applied to the live project.

create type public.staff_role as enum ('advocate', 'staff');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role public.staff_role not null default 'staff',
  created_at timestamptz not null default now()
);

create type public.client_stage as enum (
  'new',
  'contacted',
  'consultation_scheduled',
  'retained',
  'closed_won',
  'closed_lost'
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  address text,
  alternate_phone text,
  id_proof_type text,
  id_proof_number text,
  date_of_birth date,
  occupation text,
  referred_by text,
  source text,
  practice_area text,
  is_nri boolean not null default false,
  nri_country text,
  stage public.client_stage not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create type public.matter_status as enum ('active', 'on_hold', 'closed');

create table public.matters (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  practice_area text,
  opposing_party text,
  opposing_advocate text,
  court text,
  case_number text,
  under_section text,
  filing_date date,
  next_hearing_date date,
  litigation_stage text,
  status public.matter_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.matter_notes (
  id uuid primary key default gen_random_uuid(),
  matter_id uuid not null references public.matters (id) on delete cascade,
  author_id uuid references public.profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients (id) on delete cascade,
  matter_id uuid references public.matters (id) on delete set null,
  title text not null,
  -- Always UTC. The app converts to/from Asia/Kolkata at the edges — see
  -- src/lib/crm/dates.ts. Never write a bare local timestamp here.
  scheduled_at timestamptz not null,
  location text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Row Level Security: internal tool, small fixed staff — any authenticated
-- staff member (a row in profiles) can read/write; only 'advocate' can delete.
-- Firm-wide visibility is deliberate: both advocates see every matter.
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.matters enable row level security;
alter table public.matter_notes enable row level security;
alter table public.appointments enable row level security;

create policy "staff can read profiles" on public.profiles
  for select to authenticated using (true);

create policy "staff can read clients" on public.clients
  for select to authenticated using (true);
create policy "staff can insert clients" on public.clients
  for insert to authenticated with check (true);
create policy "staff can update clients" on public.clients
  for update to authenticated using (true);
create policy "advocates can delete clients" on public.clients
  for delete to authenticated using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'advocate')
  );

create policy "staff can read matters" on public.matters
  for select to authenticated using (true);
create policy "staff can insert matters" on public.matters
  for insert to authenticated with check (true);
create policy "staff can update matters" on public.matters
  for update to authenticated using (true);
create policy "advocates can delete matters" on public.matters
  for delete to authenticated using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'advocate')
  );

create policy "staff can read matter notes" on public.matter_notes
  for select to authenticated using (true);
create policy "staff can insert matter notes" on public.matter_notes
  for insert to authenticated with check (true);

create policy "staff can read appointments" on public.appointments
  for select to authenticated using (true);
create policy "staff can insert appointments" on public.appointments
  for insert to authenticated with check (true);
create policy "staff can update appointments" on public.appointments
  for update to authenticated using (true);
create policy "staff can delete appointments" on public.appointments
  for delete to authenticated using (true);

-- The public website's contact form uses the publishable key (anonymous), so it
-- needs its own narrow insert-only policy scoped to source='Website'.
-- KNOWN GAP (accepted 2026-08-03): this endpoint is directly reachable and
-- unrate-limited, so the CRM can be flooded with junk leads. Closing it means
-- moving the contact insert to SUPABASE_SECRET_KEY and dropping this policy.
create policy "website can insert leads" on public.clients
  for insert to anon with check (source = 'Website');

-- Auto-create a profile row when a staff member is invited/added in
-- Supabase Auth. Defaults to 'staff' — promote to 'advocate' manually.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email), 'staff');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- SECURITY DEFINER trigger functions have no business being callable over the
-- REST API as /rpc/handle_new_user.
revoke execute on function public.handle_new_user() from anon, authenticated, public;

-- Stamp updated_at in the database, so an edit made outside the app (SQL editor,
-- a future integration) is still recorded.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.clients
  for each row execute function public.touch_updated_at();
create trigger set_updated_at before update on public.matters
  for each row execute function public.touch_updated_at();
create trigger set_updated_at before update on public.appointments
  for each row execute function public.touch_updated_at();

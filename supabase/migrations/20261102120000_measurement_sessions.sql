-- One row per live measurement: a summary, not every individual reading.
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table public.measurement_sessions (
  id uuid primary key default gen_random_uuid(),
  -- Filled in automatically with the logged-in user's id; deleting the user deletes their sessions.
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  started_at timestamptz not null,
  duration_seconds integer not null check (duration_seconds > 0),
  -- Energy average over the session (Leq), not a plain average: loud moments weigh more.
  average_db real not null check (average_db between 0 and 200),
  peak_db real not null check (peak_db between 0 and 200),
  -- Share of the daily safe dose used up (100 = the whole day's allowance).
  dose_percent real not null check (dose_percent >= 0),
  created_at timestamptz not null default now()
);

-- The History tab asks for "my sessions, newest first"; this index makes that fast.
create index measurement_sessions_user_started_idx
  on public.measurement_sessions (user_id, started_at desc);

-- Row Level Security: without a matching policy, nobody can see or change any row.
alter table public.measurement_sessions enable row level security;

-- "Automatically expose new tables" was turned off, so the API role needs explicit access.
-- Logged-out visitors (the anon role) get nothing at all.
grant select, insert, delete on public.measurement_sessions to authenticated;

-- Each user only sees, adds and deletes their own rows.
-- (select auth.uid()) is evaluated once per query instead of once per row.
create policy "Users can read their own sessions"
  on public.measurement_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can add their own sessions"
  on public.measurement_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own sessions"
  on public.measurement_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

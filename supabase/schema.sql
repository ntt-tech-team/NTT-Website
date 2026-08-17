-- NTT — Neuro Tech Titans
-- Paste this entire file into the Supabase SQL Editor and click Run.
-- Safe to re-run: policies are dropped/recreated.

create extension if not exists "pgcrypto";

-- ─── Tables ────────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text unique,
  avatar_url text,
  year text,
  department text,
  membership_status text not null default 'not_applied'
    check (membership_status in ('not_applied', 'pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.membership_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  email text not null,
  year text not null,
  department text not null,
  skills text,
  reason text not null,
  links text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create unique index if not exists membership_applications_email_idx
  on public.membership_applications (lower(email));

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  starts_at timestamptz not null,
  venue text not null default 'SRMIST Trichy',
  capacity int not null default 0 check (capacity >= 0),
  registered_count int not null default 0 check (registered_count >= 0),
  status text not null default 'open'
    check (status in ('open', 'soon', 'completed')),
  accent text not null default '#7C6EFF',
  accent_rgb text not null default '124,110,255',
  created_at timestamptz not null default now()
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (event_id, user_id)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  category text not null default 'General'
    check (category in ('Urgent', 'General', 'Technical', 'Event')),
  pinned boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  image_url text,
  gradient text not null default 'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)',
  tall boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Triggers ──────────────────────────────────────────────────────────────

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.sync_membership_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set membership_status = new.status
  where (new.user_id is not null and id = new.user_id)
     or (email is not null and lower(email) = lower(new.email));
  return new;
end;
$$;

drop trigger if exists membership_status_sync on public.membership_applications;
create trigger membership_status_sync
  after insert or update of status, user_id on public.membership_applications
  for each row execute procedure public.sync_membership_status();

create or replace function public.refresh_event_registered_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event uuid;
begin
  v_event := coalesce(new.event_id, old.event_id);
  update public.events
  set registered_count = (
    select count(*) from public.event_registrations where event_id = v_event
  )
  where id = v_event;
  return null;
end;
$$;

drop trigger if exists event_reg_count on public.event_registrations;
create trigger event_reg_count
  after insert or delete on public.event_registrations
  for each row execute procedure public.refresh_event_registered_count();

-- ─── RPCs ──────────────────────────────────────────────────────────────────

create or replace function public.register_for_event(p_event_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_event public.events%rowtype;
  v_count int;
begin
  if v_user is null then
    return jsonb_build_object('ok', false, 'error', 'not_authenticated');
  end if;

  select * into v_event from public.events where id = p_event_id;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'not_found');
  end if;

  if v_event.status is distinct from 'open' then
    return jsonb_build_object('ok', false, 'error', 'closed');
  end if;

  if exists (
    select 1 from public.event_registrations
    where event_id = p_event_id and user_id = v_user
  ) then
    return jsonb_build_object('ok', false, 'error', 'already_registered');
  end if;

  select count(*) into v_count
  from public.event_registrations
  where event_id = p_event_id;

  if v_event.capacity > 0 and v_count >= v_event.capacity then
    return jsonb_build_object('ok', false, 'error', 'full');
  end if;

  insert into public.event_registrations (event_id, user_id)
  values (p_event_id, v_user);

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.get_club_stats()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'events', (select count(*)::int from public.events where status in ('open', 'soon')),
    'members', (select count(*)::int from public.profiles where membership_status = 'approved'),
    'this_sem', (
      select count(*)::int from public.events
      where starts_at >= (
        case
          when extract(month from now()) >= 7
            then make_date(extract(year from now())::int, 7, 1)
          else make_date(extract(year from now())::int - 1, 7, 1)
        end
      )
    )
  );
$$;

revoke all on function public.register_for_event(uuid) from public;
grant execute on function public.register_for_event(uuid) to authenticated;

revoke all on function public.get_club_stats() from public;
grant execute on function public.get_club_stats() to anon, authenticated;

-- ─── Row Level Security ────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.membership_applications enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.announcements enable row level security;
alter table public.gallery_items enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "events_public_read" on public.events;
create policy "events_public_read"
  on public.events for select
  using (true);

drop policy if exists "announcements_public_read" on public.announcements;
create policy "announcements_public_read"
  on public.announcements for select
  using (true);

drop policy if exists "gallery_public_read" on public.gallery_items;
create policy "gallery_public_read"
  on public.gallery_items for select
  using (true);

drop policy if exists "registrations_select_own" on public.event_registrations;
create policy "registrations_select_own"
  on public.event_registrations for select
  using (auth.uid() = user_id);

-- membership_applications: no client policies — inserts go through the
-- Next.js API with the service role key after validation.

-- ─── Grants ────────────────────────────────────────────────────────────────

grant usage on schema public to anon, authenticated;

grant select on public.events to anon, authenticated;
grant select on public.announcements to anon, authenticated;
grant select on public.gallery_items to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select on public.event_registrations to authenticated;

-- ─── Storage (gallery images) ──────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;

drop policy if exists "gallery_images_public_read" on storage.objects;
create policy "gallery_images_public_read"
  on storage.objects for select
  using (bucket_id = 'gallery');

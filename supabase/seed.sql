-- Optional sample data matching the current NTT PoC UI.
-- Run after schema.sql. Skips insert if the table already has rows.

insert into public.events (title, description, starts_at, venue, capacity, registered_count, status, accent, accent_rgb)
select * from (values
  (
    'Vibe-A-Thon 2026',
    'A 24-hour vibe-coding hackathon. Build fast, ship faster.',
    '2026-07-26 09:00:00+05:30'::timestamptz,
    'SRMIST Trichy',
    60, 38, 'open',
    '#7C6EFF', '124,110,255'
  ),
  (
    'DevDrop Workshop',
    'Hands-on session on building and deploying AI-powered web apps.',
    '2026-08-03 17:00:00+05:30'::timestamptz,
    'SRMIST Trichy',
    30, 12, 'open',
    '#38C2FF', '56,194,255'
  ),
  (
    'Cutthroat Coders',
    'DSA knockout — one wrong answer and you are out.',
    '2026-08-15 10:00:00+05:30'::timestamptz,
    'SRMIST Trichy',
    50, 0, 'soon',
    '#A78BFA', '167,139,250'
  )
) as v(title, description, starts_at, venue, capacity, registered_count, status, accent, accent_rgb)
where not exists (select 1 from public.events limit 1);

insert into public.announcements (title, body, category, pinned, created_at)
select * from (values
  (
    'Company visit July 25–26',
    'All members must attend the NTT corporate outreach at the ELCOT SEZ and BUTP Hub on July 25–26. Formal dress code applies. Report by 9:00 AM sharp.',
    'Urgent', true,
    now() - interval '2 hours'
  ),
  (
    'Vibe-A-Thon 2026 — Registration open',
    'Slots for Vibe-A-Thon 2026 are live. Register before they fill up. 62 spots total — 38 already taken as of this morning.',
    'Event', false,
    now() - interval '5 hours'
  ),
  (
    'DevDrop workshop registration open',
    'The DevDrop hands-on workshop on AI-powered web apps is now accepting registrations. Limited to 30 seats.',
    'General', false,
    now() - interval '8 hours'
  ),
  (
    'YUVA 26 tech stack finalized',
    'The platform stack for YUVA 26 is finalized: Next.js 14, Supabase, Vercel. Dev kickoff meeting this Friday at 5 PM in the CS lab.',
    'Technical', false,
    now() - interval '1 day'
  )
) as v(title, body, category, pinned, created_at)
where not exists (select 1 from public.announcements limit 1);

insert into public.gallery_items (label, gradient, tall, sort_order)
select * from (values
  ('Vibe-A-Thon 2026',  'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)', true,  1),
  ('DevDrop 2026',      'linear-gradient(135deg, #38C2FF 0%, #0EA5E9 100%)', false, 2),
  ('YUVA 26',           'linear-gradient(135deg, #A78BFA 0%, #7C6EFF 100%)', false, 3),
  ('NTT Induction',     'linear-gradient(135deg, #06B6D4 0%, #38C2FF 100%)', true,  4),
  ('Cutthroat Coders',  'linear-gradient(135deg, #F472B6 0%, #A78BFA 100%)', false, 5),
  ('Hack-a-Ton S2',     'linear-gradient(135deg, #34D399 0%, #06B6D4 100%)', false, 6)
) as v(label, gradient, tall, sort_order)
where not exists (select 1 from public.gallery_items limit 1);

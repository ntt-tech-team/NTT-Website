import type {
  AnnouncementRow,
  ClubStats,
  EventItem,
  GalleryRow,
} from '@/lib/supabase/types'

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'mock-1',
    title: 'Vibe-A-Thon 2026',
    description: 'A 24-hour vibe-coding hackathon. Build fast, ship faster.',
    starts_at: '2026-07-26T09:00:00+05:30',
    venue: 'SRMIST Trichy',
    capacity: 60,
    registered_count: 38,
    status: 'open',
    accent: '#7C6EFF',
    accent_rgb: '124,110,255',
    created_at: '2026-06-01T00:00:00Z',
    registered: false,
  },
  {
    id: 'mock-2',
    title: 'DevDrop Workshop',
    description: 'Hands-on session on building and deploying AI-powered web apps.',
    starts_at: '2026-08-03T17:00:00+05:30',
    venue: 'SRMIST Trichy',
    capacity: 30,
    registered_count: 12,
    status: 'open',
    accent: '#38C2FF',
    accent_rgb: '56,194,255',
    created_at: '2026-06-01T00:00:00Z',
    registered: false,
  },
  {
    id: 'mock-3',
    title: 'Cutthroat Coders',
    description: 'DSA knockout — one wrong answer and you are out.',
    starts_at: '2026-08-15T10:00:00+05:30',
    venue: 'SRMIST Trichy',
    capacity: 50,
    registered_count: 0,
    status: 'soon',
    accent: '#A78BFA',
    accent_rgb: '167,139,250',
    created_at: '2026-06-01T00:00:00Z',
    registered: false,
  },
]

export const MOCK_ANNOUNCEMENTS: AnnouncementRow[] = [
  {
    id: 'mock-a1',
    category: 'Urgent',
    pinned: true,
    title: 'Company visit July 25–26',
    body: 'All members must attend the NTT corporate outreach at the ELCOT SEZ and BUTP Hub on July 25–26. Formal dress code applies. Report by 9:00 AM sharp.',
    created_at: new Date(Date.now() - 2 * 3600_000).toISOString(),
  },
  {
    id: 'mock-a2',
    category: 'Event',
    pinned: false,
    title: 'Vibe-A-Thon 2026 — Registration open',
    body: 'Slots for Vibe-A-Thon 2026 are live. Register before they fill up. 62 spots total — 38 already taken as of this morning.',
    created_at: new Date(Date.now() - 5 * 3600_000).toISOString(),
  },
  {
    id: 'mock-a3',
    category: 'General',
    pinned: false,
    title: 'DevDrop workshop registration open',
    body: 'The DevDrop hands-on workshop on AI-powered web apps is now accepting registrations. Limited to 30 seats.',
    created_at: new Date(Date.now() - 8 * 3600_000).toISOString(),
  },
  {
    id: 'mock-a4',
    category: 'Technical',
    pinned: false,
    title: 'YUVA 26 tech stack finalized',
    body: 'The platform stack for YUVA 26 is finalized: Next.js 14, Supabase, Vercel. Dev kickoff meeting this Friday at 5 PM in the CS lab.',
    created_at: new Date(Date.now() - 86400_000).toISOString(),
  },
]

export const MOCK_GALLERY: GalleryRow[] = [
  { id: 'g1', label: 'Vibe-A-Thon 2026', image_url: null, gradient: 'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)', tall: true,  sort_order: 1, created_at: '' },
  { id: 'g2', label: 'DevDrop 2026',     image_url: null, gradient: 'linear-gradient(135deg, #38C2FF 0%, #0EA5E9 100%)', tall: false, sort_order: 2, created_at: '' },
  { id: 'g3', label: 'YUVA 26',          image_url: null, gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C6EFF 100%)', tall: false, sort_order: 3, created_at: '' },
  { id: 'g4', label: 'NTT Induction',    image_url: null, gradient: 'linear-gradient(135deg, #06B6D4 0%, #38C2FF 100%)', tall: true,  sort_order: 4, created_at: '' },
  { id: 'g5', label: 'Cutthroat Coders', image_url: null, gradient: 'linear-gradient(135deg, #F472B6 0%, #A78BFA 100%)', tall: false, sort_order: 5, created_at: '' },
  { id: 'g6', label: 'Hack-a-Ton S2',    image_url: null, gradient: 'linear-gradient(135deg, #34D399 0%, #06B6D4 100%)', tall: false, sort_order: 6, created_at: '' },
]

export const MOCK_STATS: ClubStats = { events: 3, members: 47, this_sem: 8 }

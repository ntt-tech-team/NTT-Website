import type {
  AnnouncementCategory,
  AnnouncementRow,
  DbAnnouncement,
  DbAnnouncementCategory,
  DbBanner,
  DbEvent,
  DbEventStatus,
  DbProfile,
  EventItem,
  EventStatus,
  GalleryRow,
  Profile,
} from '@/lib/supabase/types'

const ACCENTS: Array<[string, string]> = [
  ['#7C6EFF', '124,110,255'],
  ['#38C2FF', '56,194,255'],
  ['#A78BFA', '167,139,250'],
]

const GRADIENTS = [
  'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)',
  'linear-gradient(135deg, #38C2FF 0%, #0EA5E9 100%)',
  'linear-gradient(135deg, #A78BFA 0%, #7C6EFF 100%)',
  'linear-gradient(135deg, #06B6D4 0%, #38C2FF 100%)',
  'linear-gradient(135deg, #F472B6 0%, #A78BFA 100%)',
  'linear-gradient(135deg, #34D399 0%, #06B6D4 100%)',
]

function accentFor(id: string): [string, string] {
  let n = 0
  for (let i = 0; i < id.length; i++) n = (n + id.charCodeAt(i)) % ACCENTS.length
  return ACCENTS[n]
}

export function mapEventStatus(status: DbEventStatus | null | undefined): EventStatus {
  if (status === 'registration_open') return 'open'
  if (status === 'completed' || status === 'cancelled' || status === 'registration_closed') return 'completed'
  return 'soon'
}

export function mapEventRow(
  row: DbEvent,
  registeredCount = 0,
  registered = false,
): EventItem {
  const [accent, accent_rgb] = accentFor(row.id)
  return {
    id: row.id,
    title: row.title,
    description: row.description || '',
    starts_at: row.date_start,
    venue: row.venue || 'SRMIST Trichy',
    capacity: row.capacity || 0,
    registered_count: registeredCount,
    status: mapEventStatus(row.status),
    accent,
    accent_rgb,
    created_at: row.created_at || row.date_start,
    registered,
  }
}

const CAT_UI: Record<DbAnnouncementCategory, AnnouncementCategory> = {
  urgent: 'Urgent',
  general: 'General',
  technical: 'Technical',
  event: 'Event',
}

export function mapAnnouncement(row: DbAnnouncement): AnnouncementRow {
  const cat = row.category && CAT_UI[row.category] ? CAT_UI[row.category] : 'General'
  return {
    id: row.id,
    title: row.title,
    body: row.body || '',
    category: cat,
    pinned: Boolean(row.pinned),
    created_at: row.published_at || new Date().toISOString(),
  }
}

export function mapBanner(row: DbBanner, index = 0): GalleryRow {
  return {
    id: row.id,
    label: row.title || 'NTT',
    image_url: row.image_url,
    gradient: GRADIENTS[index % GRADIENTS.length],
    tall: (row.display_order ?? index) % 2 === 1,
    sort_order: row.display_order ?? index,
    created_at: row.created_at || '',
  }
}

export function mapProfile(row: DbProfile, email?: string | null): Profile {
  return {
    id: row.id,
    full_name: row.display_name,
    email: email ?? null,
    avatar_url: row.avatar_url,
    year: null,
    department: null,
    membership_status: 'not_applied',
    created_at: row.created_at || '',
    updated_at: row.created_at || '',
  }
}

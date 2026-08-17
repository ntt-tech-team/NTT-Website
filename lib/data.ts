import { isSupabaseConfigured } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { MOCK_ANNOUNCEMENTS, MOCK_EVENTS, MOCK_GALLERY, MOCK_STATS } from '@/lib/mocks'
import { mapAnnouncement, mapBanner, mapEventRow } from '@/lib/map'
import type { AnnouncementRow, ClubStats, DbAnnouncement, DbBanner, DbEvent, EventItem, GalleryRow } from '@/lib/supabase/types'

export async function getEvents(): Promise<EventItem[]> {
  if (!isSupabaseConfigured()) return MOCK_EVENTS

  const [{ data, error }, supabase] = await Promise.all([
    supabaseAdmin.from('events').select('*').order('date_start', { ascending: true }),
    createClient(),
  ])
  if (error) {
    console.error('[data] events', error)
    return []
  }
  const rows = (data ?? []) as DbEvent[]

  const { data: regs } = await supabaseAdmin
    .from('registrations')
    .select('event_id,user_id,status')
    .in('status', ['registered', 'waitlisted', 'attended'])

  const counts = new Map<string, number>()
  for (const r of regs ?? []) {
    counts.set(r.event_id, (counts.get(r.event_id) ?? 0) + 1)
  }

  const { data: { user } } = await supabase.auth.getUser()
  const mine = new Set(
    (regs ?? [])
      .filter(r => user && r.user_id === user.id)
      .map(r => r.event_id)
  )

  return rows.map(row => mapEventRow(row, counts.get(row.id) ?? 0, mine.has(row.id)))
}

export async function getUpcomingEvents(limit = 2): Promise<EventItem[]> {
  const all = await getEvents()
  return all.filter(e => e.status !== 'completed').slice(0, limit)
}

export async function getAnnouncements(limit?: number): Promise<AnnouncementRow[]> {
  if (!isSupabaseConfigured()) {
    return limit ? MOCK_ANNOUNCEMENTS.slice(0, limit) : MOCK_ANNOUNCEMENTS
  }
  let query = supabaseAdmin
    .from('announcements')
    .select('*')
    .order('pinned', { ascending: false })
    .order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data, error } = await query
  if (error) {
    console.error('[data] announcements', error)
    return []
  }
  return ((data ?? []) as DbAnnouncement[]).map(mapAnnouncement)
}

export async function getGallery(): Promise<GalleryRow[]> {
  if (!isSupabaseConfigured()) return MOCK_GALLERY
  const { data, error } = await supabaseAdmin
    .from('banners')
    .select('*')
    .eq('active', true)
    .order('display_order', { ascending: true })
  if (error) {
    console.error('[data] gallery', error)
    return []
  }
  return ((data ?? []) as DbBanner[]).map(mapBanner)
}

export async function getClubStats(): Promise<ClubStats> {
  if (!isSupabaseConfigured()) return MOCK_STATS
  const [eventsRes, membersRes] = await Promise.all([
    supabaseAdmin.from('events').select('id,status,date_start'),
    supabaseAdmin.from('profiles').select('id', { count: 'exact', head: true }),
  ])
  const events = eventsRes.data ?? []
  const open = events.filter(e => e.status === 'registration_open' || e.status === 'published').length
  const now = new Date()
  const semStart = now.getMonth() >= 6
    ? new Date(now.getFullYear(), 6, 1)
    : new Date(now.getFullYear() - 1, 6, 1)
  const this_sem = events.filter(e => e.date_start && new Date(e.date_start) >= semStart).length
  return {
    events: open,
    members: membersRes.count ?? 0,
    this_sem,
  }
}

export type MembershipStatus = 'not_applied' | 'pending' | 'approved' | 'rejected'
export type EventStatus = 'open' | 'soon' | 'completed'
export type AnnouncementCategory = 'Urgent' | 'General' | 'Technical' | 'Event'

export type DbEventStatus =
  | 'draft'
  | 'published'
  | 'registration_open'
  | 'registration_closed'
  | 'completed'
  | 'cancelled'

export type DbAnnouncementCategory = 'general' | 'urgent' | 'technical' | 'event'

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  year: string | null
  department: string | null
  membership_status: MembershipStatus
  created_at: string
  updated_at: string
}

export type EventRow = {
  id: string
  title: string
  description: string
  starts_at: string
  venue: string
  capacity: number
  registered_count: number
  status: EventStatus
  accent: string
  accent_rgb: string
  created_at: string
}

export type AnnouncementRow = {
  id: string
  title: string
  body: string
  category: AnnouncementCategory
  pinned: boolean
  created_at: string
}

export type GalleryRow = {
  id: string
  label: string
  image_url: string | null
  gradient: string
  tall: boolean
  sort_order: number
  created_at: string
}

export type EventItem = EventRow & { registered: boolean }

export type ClubStats = {
  events: number
  members: number
  this_sem: number
}

export type DbEvent = {
  id: string
  title: string
  description: string | null
  date_start: string
  date_end: string | null
  venue: string | null
  capacity: number | null
  status: DbEventStatus | null
  banner_url: string | null
  created_at: string | null
}

export type DbAnnouncement = {
  id: string
  title: string
  body: string | null
  category: DbAnnouncementCategory | null
  pinned: boolean | null
  published_at: string | null
}

export type DbBanner = {
  id: string
  image_url: string | null
  title: string | null
  link_url: string | null
  active: boolean | null
  display_order: number | null
  created_at: string | null
}

export type DbProfile = {
  id: string
  display_name: string | null
  phone: string | null
  avatar_url: string | null
  created_at: string | null
}

export type DbRegistration = {
  id: string
  event_id: string
  user_id: string | null
  guest_name: string | null
  guest_email: string | null
  status: 'registered' | 'waitlisted' | 'cancelled' | 'attended' | null
  registered_at: string | null
}

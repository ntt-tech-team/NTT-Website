'use client'
import Link from 'next/link'
import { EventCard } from '@/components/EventCard'
import type { EventItem } from '@/lib/supabase/types'

export function UpcomingEventsSection({ events }: { events: EventItem[] }) {
  return (
    <section className="pb-2">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Upcoming
        </span>
        <Link
          href="/events"
          className="text-[11px] font-medium"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          All events
        </Link>
      </div>

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No upcoming events yet.</p>
        ) : (
          events.map((event, i) => (
            <EventCard key={event.id} event={event} compact index={i} />
          ))
        )}
      </div>
    </section>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from '@/components/Calendar'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { MOCK_EVENTS } from '@/lib/mocks'
import { mapEventRow } from '@/lib/map'
import { formatEventDate } from '@/lib/format'
import type { DbEvent, EventItem } from '@/lib/supabase/types'

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function countdownParts(iso: string, now: number) {
  const diff = new Date(iso).getTime() - now
  if (diff <= 0) return { days: '00', hrs: '00', min: '00' }
  return {
    days: pad(Math.floor(diff / 86_400_000)),
    hrs: pad(Math.floor((diff % 86_400_000) / 3_600_000)),
    min: pad(Math.floor((diff % 3_600_000) / 60_000)),
  }
}

export function SidebarRight() {
  const [events, setEvents] = useState<EventItem[]>(() =>
    isSupabaseConfigured() ? [] : MOCK_EVENTS
  )
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    let cancelled = false
    ;(async () => {
      const { data, error } = await createClient()
        .from('events')
        .select('*')
        .order('date_start', { ascending: true })
      if (!cancelled && !error && data) setEvents((data as DbEvent[]).map(row => mapEventRow(row)))
    })()
    return () => { cancelled = true }
  }, [])

  const next = events.find(e => e.status !== 'completed')
  const countdown = next ? countdownParts(next.starts_at, now) : null

  return (
    <aside className="hidden md:block sticky top-[4.5rem] space-y-4 py-4">
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-2xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Calendar
          </span>
          <a
            href="/events"
            className="text-[11px] font-medium"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            View all
          </a>
        </div>
        <Calendar mini events={events} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-2xl p-4"
      >
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase block mb-3"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Upcoming Event
        </span>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          <img
            src="/poster.png"
            alt="Upcoming event poster"
            className="w-full h-auto block"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </motion.div>

      {next && countdown && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124,110,255,0.1) 0%, rgba(56,194,255,0.06) 100%)',
            border: '1px solid rgba(124,110,255,0.2)',
          }}
        >
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase block mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Next Event
          </span>
          <p
            className="text-sm font-bold mb-1"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            {next.title}
          </p>
          <p
            className="text-[10px] mb-3"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
          >
            {formatEventDate(next.starts_at)} · {next.venue}
          </p>

          <div className="flex items-center justify-center gap-2">
            {[
              { value: countdown.days, unit: 'days' },
              { value: countdown.hrs, unit: 'hrs' },
              { value: countdown.min, unit: 'min' },
            ].map(({ value, unit }) => (
              <div key={unit} className="text-center">
                <div
                  className="text-lg font-bold leading-none"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
                >
                  {value}
                </div>
                <div
                  className="text-[7px] uppercase tracking-[0.15em] mt-1"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </aside>
  )
}

'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EventItem } from '@/lib/supabase/types'
import { eventDayKey } from '@/lib/format'

const MONTHS = ['January','February','March','April','May','June',
                 'July','August','September','October','November','December']
const DAY_HEADERS = ['Su','Mo','Tu','We','Th','Fr','Sa']

type CalendarEventDot = {
  date: string
  title: string
  color: string
  rgb: string
  venue: string
}

function toDots(events: EventItem[]): Record<string, CalendarEventDot> {
  const map: Record<string, CalendarEventDot> = {}
  for (const event of events) {
    map[eventDayKey(event.starts_at)] = {
      date: eventDayKey(event.starts_at),
      title: event.title,
      color: event.accent,
      rgb: event.accent_rgb,
      venue: event.venue,
    }
  }
  return map
}

interface CalendarProps {
  mini?: boolean
  events?: EventItem[]
  onRegister?: (dateKey: string) => void
}

export function Calendar({ mini = false, events = [], onRegister }: CalendarProps) {
  const EVENT_MAP = toDots(events)
  const today = new Date()
  const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState<string | null>(null)

  const firstDow    = new Date(cur.y, cur.m, 1).getDay()
  const daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const toKey = (d: number) =>
    `${cur.y}-${String(cur.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const isToday = (d: number) =>
    d === today.getDate() && cur.m === today.getMonth() && cur.y === today.getFullYear()

  const prev = () => { setSelected(null); setCur(c => c.m === 0 ? { y: c.y - 1, m: 11 } : { ...c, m: c.m - 1 }) }
  const next = () => { setSelected(null); setCur(c => c.m === 11 ? { y: c.y + 1, m: 0  } : { ...c, m: c.m + 1 }) }

  const cellH = mini ? 30 : 40
  const selectedEvent = selected ? EVENT_MAP[selected] : null

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prev}
          className="w-7 h-7 flex items-center justify-center rounded-lg"
          style={{ color: 'var(--text-secondary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
          aria-label="Previous month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <span
          className="font-semibold"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: mini ? '12px' : '14px' }}
        >
          {MONTHS[cur.m]} {cur.y}
        </span>

        <button
          onClick={next}
          className="w-7 h-7 flex items-center justify-center rounded-lg"
          style={{ color: 'var(--text-secondary)', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
          aria-label="Next month"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map(d => (
          <div
            key={d}
            className="text-center font-semibold tracking-wider uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '9px', padding: mini ? '2px 0' : '4px 0' }}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} style={{ height: cellH }} />

          const key   = toKey(day)
          const event = EVENT_MAP[key]
          const today_ = isToday(day)
          const sel   = selected === key && !mini

          return (
            <motion.button
              key={key}
              whileTap={mini ? undefined : { scale: 0.9 }}
              onClick={() => { if (!mini) setSelected(sel ? null : key) }}
              className="flex flex-col items-center justify-center rounded-xl relative"
              style={{
                height: cellH,
                background: sel      ? 'var(--accent)'       :
                            today_   ? 'var(--accent-muted)' : 'transparent',
                border:     sel      ? '1px solid transparent'         :
                            today_   ? '1px solid var(--border-accent)': '1px solid transparent',
                cursor: mini ? 'default' : 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: mini ? '10px' : '12px',
                  fontWeight: today_ || sel ? '700' : '400',
                  color: sel ? '#fff' : today_ ? 'var(--accent)' : 'var(--text)',
                  lineHeight: 1,
                }}
              >
                {day}
              </span>

              {event && (
                <div
                  className="rounded-full mt-0.5"
                  style={{
                    width:  mini ? 3 : 4,
                    height: mini ? 3 : 4,
                    background: sel ? 'rgba(255,255,255,0.85)' : event.color,
                    flexShrink: 0,
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {!mini && (
        <AnimatePresence>
          {selectedEvent && selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 rounded-xl p-3.5"
              style={{
                background: `rgba(${selectedEvent.rgb}, 0.1)`,
                border: `1px solid rgba(${selectedEvent.rgb}, 0.28)`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: selectedEvent.color }}
                />
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
                >
                  {selectedEvent.title}
                </span>
              </div>
              <p
                className="text-[10px] ml-4"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {selected} · {selectedEvent.venue}
              </p>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onRegister?.(selected)}
                className="mt-3 w-full py-2 rounded-xl text-xs font-semibold text-white"
                style={{ background: selectedEvent.color }}
              >
                Register for this event
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {mini && (
        <div className="mt-3 space-y-1.5">
          {Object.entries(EVENT_MAP)
            .filter(([k]) => {
              const [y, mo] = k.split('-').map(Number)
              return y === cur.y && mo === cur.m + 1
            })
            .map(([key, ev]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                <span className="text-[10px]" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {key.slice(8)} — {ev.title}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

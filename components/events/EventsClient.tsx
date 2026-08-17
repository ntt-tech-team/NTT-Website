'use client'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from '@/components/Calendar'
import { EventCard } from '@/components/EventCard'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { eventDayKey } from '@/lib/format'
import type { EventItem } from '@/lib/supabase/types'

type View = 'list' | 'calendar'
type Tab = 'Upcoming' | 'Completed' | 'Mine'

export function EventsClient({ events }: { events: EventItem[] }) {
  const { user, openAuth, configured } = useAuth()
  const [view, setView] = useState<View>('list')
  const [tab, setTab] = useState<Tab>('Upcoming')
  const [items, setItems] = useState(events)

  const visible = useMemo(() => {
    if (tab === 'Completed') return items.filter(e => e.status === 'completed')
    if (tab === 'Mine') return items.filter(e => e.registered)
    return items.filter(e => e.status !== 'completed')
  }, [items, tab])

  async function registerByDate(dateKey: string) {
    const event = items.find(e => eventDayKey(e.starts_at) === dateKey)
    if (!event || event.status !== 'open') return
    if (!user) {
      openAuth()
      return
    }
    if (!configured || event.id.startsWith('mock-')) return
    const { error } = await createClient().from('registrations').insert({
      event_id: event.id,
      user_id: user.id,
      guest_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      guest_email: user.email ?? null,
      status: 'registered',
    })
    if (!error || error.code === '23505') {
      setItems(prev => prev.map(e =>
        e.id === event.id
          ? { ...e, registered: true, registered_count: error ? e.registered_count : e.registered_count + 1 }
          : e
      ))
    }
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="mb-5"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
          Events
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Register for upcoming NTT events
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between gap-3 mb-5"
      >
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {(['Upcoming', 'Completed', 'Mine'] as Tab[]).map(name => (
            <button
              key={name}
              onClick={() => {
                if (name === 'Mine' && !user) {
                  openAuth()
                  return
                }
                setTab(name)
              }}
              className="px-3 py-1.5 rounded-xl text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
              style={{
                background: tab === name ? 'var(--accent)' : 'var(--glass-bg)',
                border: `1px solid ${tab === name ? 'transparent' : 'var(--glass-border)'}`,
                color: tab === name ? '#fff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {name}
            </button>
          ))}
        </div>

        <div
          className="flex gap-1 p-1 rounded-xl flex-shrink-0"
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
        >
          <motion.button
            onClick={() => setView('list')}
            whileTap={{ scale: 0.92 }}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
            style={{
              background: view === 'list' ? 'var(--accent)' : 'transparent',
              color: view === 'list' ? '#fff' : 'var(--text-muted)',
            }}
            aria-label="List view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </motion.button>
          <motion.button
            onClick={() => setView('calendar')}
            whileTap={{ scale: 0.92 }}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all"
            style={{
              background: view === 'calendar' ? 'var(--accent)' : 'transparent',
              color: view === 'calendar' ? '#fff' : 'var(--text-muted)',
            }}
            aria-label="Calendar view"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {view === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="glass rounded-2xl p-4"
          >
            <Calendar events={items} onRegister={registerByDate} />
          </motion.div>
        )}

        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {visible.length === 0 ? (
              <p className="text-sm text-center py-10" style={{ color: 'var(--text-muted)' }}>
                {tab === 'Mine' ? 'You have not registered for any events yet.' : 'No events in this list.'}
              </p>
            ) : (
              visible.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

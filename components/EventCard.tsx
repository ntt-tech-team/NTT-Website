'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/AuthProvider'
import { formatEventDate } from '@/lib/format'
import type { EventItem } from '@/lib/supabase/types'

export function EventCard({ event, compact = false, index = 0 }: {
  event: EventItem
  compact?: boolean
  index?: number
}) {
  const { user, configured, openAuth } = useAuth()
  const [busy, setBusy] = useState(false)
  const [registered, setRegistered] = useState(event.registered)
  const [filled, setFilled] = useState(event.registered_count)
  const [message, setMessage] = useState('')

  const soon = event.status === 'soon'
  const done = event.status === 'completed'
  const dateLabel = formatEventDate(event.starts_at, compact)

  async function register() {
    if (soon || done) return
    if (!user) {
      openAuth()
      return
    }
    if (!configured || event.id.startsWith('mock-')) {
      setMessage('Connect Supabase to enable registration.')
      return
    }
    setBusy(true)
    setMessage('')
    const { data, error } = await createClient()
      .from('registrations')
      .insert({
        event_id: event.id,
        user_id: user.id,
        guest_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        guest_email: user.email ?? null,
        status: 'registered',
      })
      .select('id')
      .maybeSingle()
    setBusy(false)
    if (error) {
      if (error.code === '23505') {
        setRegistered(true)
        setMessage('You are already registered.')
        return
      }
      setMessage(error.message)
      return
    }
    if (!data) {
      setMessage('Could not register.')
      return
    }
    setRegistered(true)
    setFilled(n => n + 1)
  }

  const label = done ? 'Completed' : soon ? 'Coming soon' : registered ? 'Registered' : busy ? 'Registering…' : compact ? 'Register' : 'Register now'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.08 }}
      className="glass rounded-2xl p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3
            className={`font-semibold mb-0.5 ${compact ? 'text-sm leading-snug' : 'text-base'}`}
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            {event.title}
          </h3>
          <p className="text-[10px]" style={{ color: event.accent, fontFamily: 'var(--font-mono)' }}>
            {dateLabel} · {event.venue}
          </p>
        </div>
        <span
          className="text-[9px] font-bold px-2.5 py-1 rounded-full ml-2 flex-shrink-0"
          style={{
            color: event.accent,
            background: `rgba(${event.accent_rgb}, 0.12)`,
            border: `1px solid rgba(${event.accent_rgb}, 0.25)`,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {event.status === 'open' ? 'Open' : event.status === 'soon' ? 'Soon' : 'Done'}
        </span>
      </div>

      {!compact && (
        <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {event.description}
        </p>
      )}

      {event.capacity > 0 && (compact || filled > 0 || event.status === 'open') && (
        <div className={compact ? 'mb-3.5 mt-3' : 'mb-3'}>
          <div className="flex justify-between mb-1.5">
            <span className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {filled} / {event.capacity} registered
            </span>
            <span className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {Math.max(event.capacity - filled, 0)} left
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: event.accent }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((filled / event.capacity) * 100, 100)}%` }}
              transition={{ duration: 0.9, delay: 0.2 + index * 0.1 }}
            />
          </div>
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={register}
        disabled={busy || registered || soon || done}
        className="w-full py-2.5 rounded-xl text-xs font-semibold disabled:cursor-not-allowed"
        style={{
          background: soon || done || registered ? 'transparent' : event.accent,
          border: soon || done || registered ? `1px solid rgba(${event.accent_rgb}, 0.35)` : 'none',
          color: soon || done || registered ? event.accent : '#fff',
        }}
      >
        {label}
      </motion.button>

      {message && (
        <p className="text-[10px] text-center mt-2" style={{ color: 'var(--text-muted)' }}>{message}</p>
      )}
    </motion.div>
  )
}

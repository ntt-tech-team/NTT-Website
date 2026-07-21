'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar } from '@/components/Calendar'

const events = [
  {
    id: 1, title: 'Vibe-A-Thon 2026', date: 'Jul 26, 2026',
    venue: 'SRMIST Trichy', spots: 60, filled: 38,
    status: 'Open', accent: '#7C6EFF', accentRgb: '124,110,255',
    desc: 'A 24-hour vibe-coding hackathon. Build fast, ship faster.',
  },
  {
    id: 2, title: 'DevDrop Workshop', date: 'Aug 3, 2026',
    venue: 'SRMIST Trichy', spots: 30, filled: 12,
    status: 'Open', accent: '#38C2FF', accentRgb: '56,194,255',
    desc: 'Hands-on session on building and deploying AI-powered web apps.',
  },
  {
    id: 3, title: 'Cutthroat Coders', date: 'Aug 15, 2026',
    venue: 'SRMIST Trichy', spots: 50, filled: 0,
    status: 'Soon', accent: '#A78BFA', accentRgb: '167,139,250',
    desc: 'DSA knockout — one wrong answer and you are out.',
  },
]

type View = 'list' | 'calendar'

export default function EventsPage() {
  const [view, setView] = useState<View>('list')

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">

      {/* Page header */}
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

      {/* Controls row: filter tabs + view toggle */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between gap-3 mb-5"
      >
        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {['Upcoming', 'Completed', 'Mine'].map((tab, i) => (
            <button
              key={tab}
              className="px-3 py-1.5 rounded-xl text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
              style={{
                background: i === 0 ? 'var(--accent)' : 'var(--glass-bg)',
                border: `1px solid ${i === 0 ? 'transparent' : 'var(--glass-border)'}`,
                color: i === 0 ? '#fff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* View toggle */}
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

      {/* Content */}
      <AnimatePresence mode="wait">

        {/* ── Calendar view ── */}
        {view === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="glass rounded-2xl p-4"
          >
            <Calendar />
          </motion.div>
        )}

        {/* ── List view ── */}
        {view === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {events.map(({ id, title, date, venue, spots, filled, status, accent, accentRgb, desc }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: i * 0.08 }}
                className="glass rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-base mb-0.5" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                      {title}
                    </h3>
                    <p className="text-[10px]" style={{ color: accent, fontFamily: 'var(--font-mono)' }}>
                      {date} · {venue}
                    </p>
                  </div>
                  <span
                    className="text-[9px] font-bold px-2.5 py-1 rounded-full ml-2 flex-shrink-0"
                    style={{
                      color: accent, background: `rgba(${accentRgb}, 0.12)`,
                      border: `1px solid rgba(${accentRgb}, 0.25)`, fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {status}
                  </span>
                </div>

                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {desc}
                </p>

                {filled > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {filled} / {spots} registered
                      </span>
                      <span className="text-[9px]" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {spots - filled} left
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: accent }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(filled / spots) * 100}%` }}
                        transition={{ duration: 0.9, delay: 0.2 + i * 0.1 }}
                      />
                    </div>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold"
                  style={{
                    background: status === 'Soon' ? 'transparent' : accent,
                    border: status === 'Soon' ? `1px solid rgba(${accentRgb}, 0.35)` : 'none',
                    color: status === 'Soon' ? accent : '#fff',
                  }}
                >
                  {status === 'Soon' ? 'Coming soon' : 'Register now'}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'

const events = [
  {
    id: 1,
    title: 'Vibe-A-Thon 2026',
    date: 'Jul 26',
    venue: 'SRMIST Trichy',
    spots: 60,
    filled: 38,
    accent: '#7C6EFF',
    accentRgb: '124,110,255',
  },
  {
    id: 2,
    title: 'DevDrop Workshop',
    date: 'Aug 3',
    venue: 'SRMIST Trichy',
    spots: 30,
    filled: 12,
    accent: '#38C2FF',
    accentRgb: '56,194,255',
  },
]

export function UpcomingEventsSection() {
  return (
    <section className="pb-2">
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Upcoming
        </span>
        <button
          className="text-[11px] font-medium"
          style={{ color: 'var(--accent)' }}
        >
          All events
        </button>
      </div>

      <div className="space-y-3">
        {events.map(({ id, title, date, venue, spots, filled, accent, accentRgb }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-2xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4
                  className="font-semibold text-sm mb-0.5 leading-snug"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
                >
                  {title}
                </h4>
                <p
                  className="text-[10px]"
                  style={{ color: accent, fontFamily: 'var(--font-mono)' }}
                >
                  {date} · {venue}
                </p>
              </div>
              <span
                className="text-[9px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2"
                style={{
                  color: accent,
                  background: `rgba(${accentRgb}, 0.12)`,
                  border: `1px solid rgba(${accentRgb}, 0.25)`,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Open
              </span>
            </div>

            {/* Capacity bar */}
            <div className="mb-3.5">
              <div className="flex justify-between mb-1.5">
                <span
                  className="text-[9px]"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {filled} / {spots} registered
                </span>
                <span
                  className="text-[9px]"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {spots - filled} left
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: accent }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(filled / spots) * 100}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ opacity: 0.9 }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white"
              style={{ background: accent }}
            >
              Register
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'
import { Calendar } from '@/components/Calendar'

export function SidebarRight() {
  return (
    <aside className="hidden md:block sticky top-[4.5rem] space-y-4 py-4">
      {/* Mini Calendar */}
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
        <Calendar mini />
      </motion.div>

      {/* Event Poster */}
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

      {/* Next Event Countdown */}
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
          DevDrop Workshop
        </p>
        <p
          className="text-[10px] mb-3"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          Aug 3, 2026 · SRMIST Trichy
        </p>

        <div className="flex items-center justify-center gap-2">
          {[
            { value: '05', unit: 'days' },
            { value: '14', unit: 'hrs' },
            { value: '32', unit: 'min' },
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
    </aside>
  )
}

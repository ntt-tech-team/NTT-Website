'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar } from '@/components/Calendar'

export function HomeCalendar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-4"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 15 }}>🗓️</span>
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            This month
          </span>
        </div>
        <Link
          href="/events"
          className="text-[11px] font-medium"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          All events
        </Link>
      </div>

      <Calendar mini />
    </motion.div>
  )
}

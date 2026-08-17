'use client'
import { motion } from 'framer-motion'
import type { ClubStats } from '@/lib/supabase/types'

export function StatsStrip({ stats }: { stats: ClubStats }) {
  const items = [
    { value: String(stats.events), label: 'Events', color: '#7C6EFF' },
    { value: String(stats.members), label: 'Members', color: '#38C2FF' },
    { value: String(stats.this_sem), label: 'This sem', color: '#A78BFA' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ value, label, color }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 + i * 0.07, ease: 'easeOut' }}
          className="glass rounded-xl p-3 text-center"
        >
          <div
            className="text-2xl font-bold leading-none mb-1.5"
            style={{ color, fontFamily: 'var(--font-display)' }}
          >
            {value}
          </div>
          <div
            className="text-[9px] uppercase tracking-[0.18em]"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

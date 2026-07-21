'use client'
import { motion } from 'framer-motion'

const stats = [
  { value: '3', label: 'Events', color: '#7C6EFF' },
  { value: '47', label: 'Members', color: '#38C2FF' },
  { value: '8', label: 'This sem', color: '#A78BFA' },
]

export function StatsStrip() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ value, label, color }, i) => (
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

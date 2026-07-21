'use client'
import { motion } from 'framer-motion'

const items = [
  {
    id: 1,
    category: 'Urgent',
    dotColor: '#FF4848',
    textColor: '#FF7070',
    bg: 'var(--urgent-bg)',
    border: 'var(--urgent-border)',
    title: 'Company visit July 25–26 — all members must attend',
    time: '2h ago',
  },
  {
    id: 2,
    category: 'General',
    dotColor: '#6B6B9B',
    textColor: 'var(--text-muted)',
    bg: 'var(--glass-bg)',
    border: 'var(--glass-border)',
    title: 'DevDrop workshop registration is now open',
    time: '5h ago',
  },
  {
    id: 3,
    category: 'Technical',
    dotColor: '#38C2FF',
    textColor: '#38C2FF',
    bg: 'rgba(56,194,255,0.07)',
    border: 'rgba(56,194,255,0.18)',
    title: 'YUVA 26 tech stack has been finalized',
    time: '1d ago',
  },
]

export function AnnouncementsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Latest
        </span>
        <button
          className="text-[11px] font-medium"
          style={{ color: 'var(--accent)' }}
        >
          See all
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map(({ id, category, dotColor, textColor, bg, border, title, time }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38, delay: 0.18 + i * 0.08, ease: 'easeOut' }}
            className="rounded-xl p-3"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: dotColor }}
              />
              <span
                className="text-[9px] font-bold uppercase tracking-[0.12em]"
                style={{ color: textColor, fontFamily: 'var(--font-mono)' }}
              >
                {category}
              </span>
              <span
                className="text-[9px] ml-auto"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {time}
              </span>
            </div>
            <p className="text-sm leading-snug" style={{ color: 'var(--text)' }}>
              {title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

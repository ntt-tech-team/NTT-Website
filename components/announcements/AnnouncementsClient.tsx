'use client'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ANNOUNCEMENT_STYLES, timeAgo } from '@/lib/format'
import type { AnnouncementCategory, AnnouncementRow } from '@/lib/supabase/types'

const categories: Array<'All' | AnnouncementCategory> = ['All', 'Urgent', 'General', 'Technical', 'Event']

export function AnnouncementsClient({ announcements }: { announcements: AnnouncementRow[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const visible = useMemo(
    () => filter === 'All' ? announcements : announcements.filter(a => a.category === filter),
    [announcements, filter]
  )

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="mb-5"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
          Announcements
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Updates from the core team
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-3 py-1.5 rounded-xl text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              background: filter === cat ? 'var(--accent)' : 'var(--glass-bg)',
              border: `1px solid ${filter === cat ? 'transparent' : 'var(--glass-border)'}`,
              color: filter === cat ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {visible.map((item, i) => {
          const style = ANNOUNCEMENT_STYLES[item.category]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.38, delay: 0.12 + i * 0.07 }}
              className="rounded-2xl p-4 relative"
              style={{ background: style.bg, border: `1px solid ${style.border}` }}
            >
              {item.pinned && (
                <div
                  className="absolute top-3 right-3 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                  style={{ color: '#FF7070', background: 'rgba(255,72,72,0.15)', fontFamily: 'var(--font-mono)' }}
                >
                  Pinned
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.dotColor }} />
                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: style.textColor, fontFamily: 'var(--font-mono)' }}>
                  {item.category}
                </span>
                <span className="text-[9px] ml-auto pr-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {timeAgo(item.created_at)}
                </span>
              </div>
              <h3 className="font-semibold text-sm mb-1.5 leading-snug" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.body}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

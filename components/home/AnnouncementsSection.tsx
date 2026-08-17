'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ANNOUNCEMENT_STYLES, timeAgo } from '@/lib/format'
import type { AnnouncementRow } from '@/lib/supabase/types'

export function AnnouncementsSection({ items }: { items: AnnouncementRow[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] font-semibold tracking-[0.22em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Latest
        </span>
        <Link
          href="/announcements"
          className="text-[11px] font-medium"
          style={{ color: 'var(--accent)', textDecoration: 'none' }}
        >
          See all
        </Link>
      </div>

      <div className="space-y-2.5">
        {items.map((item, i) => {
          const style = ANNOUNCEMENT_STYLES[item.category]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.38, delay: 0.18 + i * 0.08, ease: 'easeOut' }}
              className="rounded-xl p-3"
              style={{ background: style.bg, border: `1px solid ${style.border}` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: style.dotColor }}
                />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: style.textColor, fontFamily: 'var(--font-mono)' }}
                >
                  {item.category}
                </span>
                <span
                  className="text-[9px] ml-auto"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {timeAgo(item.created_at)}
                </span>
              </div>
              <p className="text-sm leading-snug" style={{ color: 'var(--text)' }}>
                {item.title}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

'use client'
import { motion } from 'framer-motion'

const announcements = [
  {
    id: 1, category: 'Urgent', pinned: true,
    dotColor: '#FF4848', textColor: '#FF7070',
    bg: 'var(--urgent-bg)', border: 'var(--urgent-border)',
    title: 'Company visit July 25–26',
    body: 'All members must attend the NTT corporate outreach at the ELCOT SEZ and BUTP Hub on July 25–26. Formal dress code applies. Report by 9:00 AM sharp.',
    time: '2h ago',
  },
  {
    id: 2, category: 'Event', pinned: false,
    dotColor: '#7C6EFF', textColor: '#7C6EFF',
    bg: 'rgba(124,110,255,0.07)', border: 'rgba(124,110,255,0.2)',
    title: 'Vibe-A-Thon 2026 — Registration open',
    body: 'Slots for Vibe-A-Thon 2026 are live. Register before they fill up. 62 spots total — 38 already taken as of this morning.',
    time: '5h ago',
  },
  {
    id: 3, category: 'General', pinned: false,
    dotColor: '#6B6B9B', textColor: 'var(--text-muted)',
    bg: 'var(--glass-bg)', border: 'var(--glass-border)',
    title: 'DevDrop workshop registration open',
    body: 'The DevDrop hands-on workshop on AI-powered web apps is now accepting registrations. Limited to 30 seats.',
    time: '8h ago',
  },
  {
    id: 4, category: 'Technical', pinned: false,
    dotColor: '#38C2FF', textColor: '#38C2FF',
    bg: 'rgba(56,194,255,0.07)', border: 'rgba(56,194,255,0.18)',
    title: 'YUVA 26 tech stack finalized',
    body: 'The platform stack for YUVA 26 is finalized: Next.js 14, Supabase, Vercel. Dev kickoff meeting this Friday at 5 PM in the CS lab.',
    time: '1d ago',
  },
]

const categories = ['All', 'Urgent', 'General', 'Technical', 'Event']

export default function AnnouncementsPage() {
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

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-5 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {categories.map((cat, i) => (
          <button
            key={cat}
            className="px-3 py-1.5 rounded-xl text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              background: i === 0 ? 'var(--accent)' : 'var(--glass-bg)',
              border: `1px solid ${i === 0 ? 'transparent' : 'var(--glass-border)'}`,
              color: i === 0 ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {announcements.map(({ id, category, pinned, dotColor, textColor, bg, border, title, body, time }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.12 + i * 0.07 }}
            className="rounded-2xl p-4 relative"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            {pinned && (
              <div
                className="absolute top-3 right-3 text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                style={{ color: '#FF7070', background: 'rgba(255,72,72,0.15)', fontFamily: 'var(--font-mono)' }}
              >
                Pinned
              </div>
            )}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColor }} />
              <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: textColor, fontFamily: 'var(--font-mono)' }}>
                {category}
              </span>
              <span className="text-[9px] ml-auto pr-8" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {time}
              </span>
            </div>
            <h3 className="font-semibold text-sm mb-1.5 leading-snug" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
              {title}
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {body}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
          <Link
            href="/events"
            className="text-[11px] font-medium"
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            View all
          </Link>
        </div>
        <Calendar mini />
      </motion.div>

      {/* Quick Links */}
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
          Quick Links
        </span>
        <div className="space-y-1.5">
          {[
            { href: '/events', label: 'Upcoming Events', icon: '📅', accent: '#7C6EFF' },
            { href: '/gallery', label: 'Photo Gallery', icon: '📸', accent: '#38C2FF' },
            { href: '/announcements', label: 'Announcements', icon: '📢', accent: '#A78BFA' },
            { href: '/profile', label: 'My Profile', icon: '👤', accent: '#7C6EFF' },
          ].map(({ href, label, icon, accent }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all group"
              style={{
                textDecoration: 'none',
                background: 'transparent',
                border: '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-muted)'
                e.currentTarget.style.borderColor = 'var(--border-accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'transparent'
              }}
            >
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
              >
                {label}
              </span>
            </Link>
          ))}
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

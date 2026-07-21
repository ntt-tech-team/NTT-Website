'use client'
import { motion } from 'framer-motion'
import { useThemeStore } from '@/store/theme'

export function TopBar() {
  const { isDark, toggle } = useThemeStore()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 glass"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7C6EFF, #38C2FF)' }}
        >
          N
        </div>
        <div className="flex flex-col leading-none gap-0.5">
          <span
            className="text-sm font-bold tracking-tight"
            style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
          >
            NTT
          </span>
          <span
            className="text-[8px] tracking-[0.15em] uppercase hidden sm:block"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Neuro Tech Titans
          </span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* Theme toggle */}
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{
            color: 'var(--text-secondary)',
            background: 'var(--accent-muted)',
            border: '1px solid var(--border-accent)',
          }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.button>
      </div>
    </header>
  )
}

'use client'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useThemeStore } from '@/store/theme'

export function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { isDark, toggle } = useThemeStore()

  // Escape key + body-scroll lock while open
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70"
            style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Drawer panel — slides in from the right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-[78%] max-w-[300px] glass flex flex-col"
            style={{ borderLeft: '1px solid var(--border)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 h-14" style={{ borderBottom: '1px solid var(--border)' }}>
              <span
                className="text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                Menu
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                }}
                aria-label="Close menu"
              >
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                  <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Rows */}
            <div className="flex-1 flex flex-col gap-1 p-3">
              <Link
                href="/team"
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-xl transition-colors"
                style={{ color: 'var(--text)' }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', color: 'var(--accent)' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
                <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  Meet the Core Team
                </span>
              </Link>

              <div
                className="flex items-center gap-3 px-3 py-3 rounded-xl"
                style={{ color: 'var(--text)' }}
              >
                <span
                  className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', color: 'var(--text-secondary)' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </span>
                <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  Notifications
                </span>
              </div>

              <button
                onClick={toggle}
                className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl transition-colors"
                style={{ color: 'var(--text)' }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', color: 'var(--text-secondary)' }}
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
                  </span>
                  <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </span>

                {/* Switch */}
                <span
                  className="relative inline-flex items-center rounded-full flex-shrink-0"
                  style={{
                    width: 38,
                    height: 22,
                    background: isDark ? 'var(--accent)' : 'var(--border)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <motion.span
                    className="absolute rounded-full bg-white"
                    style={{ width: 16, height: 16, top: 3 }}
                    animate={{ left: isDark ? 19 : 3 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

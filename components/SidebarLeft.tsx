'use client'
import { motion } from 'framer-motion'
import { NTTLogoMark } from '@/components/NTTLogo'
import { CoreTeamShowcase } from '@/components/team/CoreTeamShowcase'

// ─────────────────────────────────────────────────────────────────────────────
// Toggle flags — flip to `true` to restore commented-out tiles
// ─────────────────────────────────────────────────────────────────────────────
const SHOW_CONNECT_TILE = false
const SHOW_CAMPUS_TILE = false

// ─────────────────────────────────────────────────────────────────────────────
// Main sidebar component
// ─────────────────────────────────────────────────────────────────────────────

export function SidebarLeft() {
  return (
    <aside className="hidden md:block sticky top-[4.5rem] space-y-4 py-4">
      {/* ───── Club Identity Card ───── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center gap-3 mb-4">
          <NTTLogoMark size={44} className="rounded-xl" />
          <div>
            <h3
              className="text-sm font-bold leading-tight"
              style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
            >
              Neuro Tech Titans
            </h3>
            <p
              className="text-[9px] tracking-[0.15em] uppercase mt-0.5"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              SRMIST Trichy
            </p>
          </div>
        </div>

        <p
          className="text-[11px] leading-relaxed mb-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          A premier technical club driving innovation in AI, ML, and emerging tech at SRM IST Trichy.
        </p>

        {/* Quick facts */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Founded', value: '2024' },
            { label: 'Members', value: '47+' },
            { label: 'Events', value: '10+' },
            { label: 'Rank', value: 'Top 3' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg px-2.5 py-2 text-center"
              style={{ background: 'var(--accent-muted)' }}
            >
              <div
                className="text-xs font-bold"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
              >
                {value}
              </div>
              <div
                className="text-[8px] uppercase tracking-[0.15em] mt-0.5"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ───── Core Team Showcase (shared component — also used on /team) ───── */}
      <CoreTeamShowcase />

      {/* ═══════════════════════════════════════════════════════
          COMMENTED OUT TILES — To restore, change the flag
          at the top of this file to `true`:
            • SHOW_CONNECT_TILE = true   → restores Connect tile
            • SHOW_CAMPUS_TILE = true    → restores Campus badge
         ═══════════════════════════════════════════════════════ */}

      {/* ───── Connect / Social Links (disabled) ───── */}
      {SHOW_CONNECT_TILE && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-2xl p-4"
        >
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase block mb-3"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Connect
          </span>
          <div className="flex items-center gap-2">
            {[
              {
                label: 'Instagram',
                href: '#',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
              },
              {
                label: 'LinkedIn',
                href: '#',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                ),
              },
              {
                label: 'GitHub',
                href: '#',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                ),
              },
              {
                label: 'Email',
                href: '#',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
            ].map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  background: 'var(--accent-muted)',
                  border: '1px solid var(--border-accent)',
                }}
                aria-label={label}
                title={label}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}

      {/* ───── Campus badge (disabled) ───── */}
      {SHOW_CAMPUS_TILE && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl p-4 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(124,110,255,0.08) 0%, rgba(56,194,255,0.05) 100%)',
            border: '1px solid rgba(124,110,255,0.15)',
          }}
        >
          <span
            className="text-[9px] tracking-[0.2em] uppercase block"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            🏛️ SRM Institute of Science & Technology
          </span>
          <span
            className="text-[8px] tracking-[0.18em] uppercase block mt-1"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
          >
            Trichy Campus
          </span>
        </motion.div>
      )}
    </aside>
  )
}

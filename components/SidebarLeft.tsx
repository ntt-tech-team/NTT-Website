'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NTTLogoMark } from '@/components/NTTLogo'

// ─────────────────────────────────────────────────────────────────────────────
// Core Team data — role-based. Each role supports one OR multiple members.
//
// SINGLE-PERSON ROLES  →  keep 1 entry in members[] (large centered layout)
// MULTI-PERSON ROLES   →  add more entries to members[] (row layout, smaller)
//
// To add a photo: place the image in /public/team/ and update the `photo` field.
// If an image fails to load, the initials gradient fallback is shown automatically.
// ─────────────────────────────────────────────────────────────────────────────

type Member = { name: string; initials: string; photo: string }
type TeamRole = { role: string; accent: string; members: Member[] }

const CORE_TEAM: TeamRole[] = [
  {
    role: 'President',
    accent: '#7C6EFF',
    members: [
      { name: 'President', initials: 'PR', photo: '/team/president.jpg' },
    ],
  },
  {
    role: 'Vice President',
    accent: '#38C2FF',
    members: [
      { name: 'Vice President', initials: 'VP', photo: '/team/V.jpeg' },
    ],
  },
  {
    role: 'Secretary',
    accent: '#A78BFA',
    members: [
      { name: 'Secretary', initials: 'SC', photo: '/team/Secretary.jpeg' },
    ],
  },
  {
    role: 'Treasurer',
    accent: '#7C6EFF',
    members: [
      { name: 'Treasurer', initials: 'TR', photo: '/team/Treasurer.jpeg' },
    ],
  },
  {
    role: 'Technical Lead',
    accent: '#38C2FF',
    members: [
      { name: 'Tech Lead', initials: 'TL', photo: '/team/tech-lead.jpg' },
      // Add more: { name: 'Tech Lead 2', initials: 'TL', photo: '/team/tech-lead-2.jpg' },
    ],
  },
  {
    role: 'Social Media Lead',
    accent: '#A78BFA',
    members: [
      { name: 'Social Media', initials: 'SM', photo: '/team/social.jpg' },
    ],
  },
  {
    role: 'Design Lead',
    accent: '#7C6EFF',
    members: [
      { name: 'Design Lead', initials: 'DL', photo: '/team/MD Lead.jpeg' },
    ],
  },
  {
    role: 'Event Coordinator',
    accent: '#38C2FF',
    members: [
      { name: 'Event Coord 1', initials: 'EC', photo: '/team/events.jpg' },
      // Add more members below:
      // { name: 'Event Coord 2', initials: 'EC', photo: '/team/events-2.jpg' },
      // { name: 'Event Coord 3', initials: 'EC', photo: '/team/events-3.jpg' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Toggle flags — flip to `true` to restore commented-out tiles
// ─────────────────────────────────────────────────────────────────────────────
const SHOW_CONNECT_TILE = false
const SHOW_CAMPUS_TILE = false

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Fallback avatar with gradient + initials (used when photo doesn't load) */
function AvatarFallback({ initials, accent, size = 64 }: { initials: string; accent: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
        fontSize: Math.round(size * 0.32),
        fontWeight: 700,
        color: '#fff',
        fontFamily: 'var(--font-display)',
      }}
    >
      {initials}
    </div>
  )
}

/** Member photo with auto-fallback on load error */
function MemberPhoto({
  photo,
  initials,
  accent,
  size = 64,
}: {
  photo: string
  initials: string
  accent: string
  size?: number
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <AvatarFallback initials={initials} accent={accent} size={size} />
  }

  return (
    <img
      src={photo}
      alt={initials}
      width={size}
      height={size}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: `2px solid ${accent}` }}
      onError={() => setFailed(true)}
    />
  )
}

type LightboxState = { member: Member; role: string; accent: string } | null

/** Fullscreen lightbox overlay — click backdrop or press Escape to close */
function PhotoLightbox({
  lightbox,
  onClose,
}: {
  lightbox: NonNullable<LightboxState>
  onClose: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75" style={{ backdropFilter: 'blur(6px)' }} />

      {/* Modal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.82 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-4 p-8 rounded-2xl"
        style={{
          background: 'rgba(8, 8, 26, 0.95)',
          border: `1px solid ${lightbox.accent}40`,
          boxShadow: `0 0 80px ${lightbox.accent}22, 0 24px 48px rgba(0,0,0,0.6)`,
          minWidth: 240,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full transition-colors"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Enlarged photo */}
        <div className="relative">
          <MemberPhoto
            photo={lightbox.member.photo}
            initials={lightbox.member.initials}
            accent={lightbox.accent}
            size={200}
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: `0 0 32px ${lightbox.accent}44, 0 0 64px ${lightbox.accent}22`,
            }}
          />
        </div>

        {/* Name */}
        <h4
          className="text-base font-bold leading-tight text-center"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
        >
          {lightbox.member.name}
        </h4>

        {/* Role badge */}
        <span
          className="text-[9px] font-medium tracking-[0.14em] uppercase px-3 py-1 rounded-full"
          style={{
            color: lightbox.accent,
            background: `${lightbox.accent}18`,
            border: `1px solid ${lightbox.accent}35`,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {lightbox.role}
        </span>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main sidebar component
// ─────────────────────────────────────────────────────────────────────────────

export function SidebarLeft() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  // Auto-cycle through roles every 4 s; pauses while lightbox is open
  useEffect(() => {
    if (lightbox) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CORE_TEAM.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [lightbox])

  const openLightbox = useCallback(
    (member: Member, accent: string, role: string) => {
      setLightbox({ member, accent, role })
    },
    []
  )

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const current = CORE_TEAM[activeIndex]

  return (
    <aside className="hidden md:block sticky top-[4.5rem] space-y-4 py-4">
      {/* ── Lightbox overlay ─────────────────────────────────────────
          Placed as a direct child of <aside> (not inside any motion.div)
          so that position:fixed is not broken by CSS transforms.
         ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <PhotoLightbox key="lightbox" lightbox={lightbox} onClose={closeLightbox} />
        )}
      </AnimatePresence>

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

      {/* ───── Core Team Showcase ───── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-2xl p-5 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-[9px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Core Team
          </span>
          <span
            className="text-[9px] tabular-nums"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {activeIndex + 1} / {CORE_TEAM.length}
          </span>
        </div>

        {/* Active role display */}
        <div
          className="relative flex-1 flex items-center justify-center"
          style={{ minHeight: 170 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center text-center"
            >
              {current.members.length === 1 ? (
                /* ── Single-member: large centered layout ─────────── */
                <>
                  <div
                    className="relative mb-4 cursor-pointer"
                    onClick={() => openLightbox(current.members[0], current.accent, current.role)}
                    title="Click to enlarge"
                  >
                    <MemberPhoto
                      photo={current.members[0].photo}
                      initials={current.members[0].initials}
                      accent={current.accent}
                      size={92}
                    />
                    {/* Glow ring */}
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: `0 0 20px ${current.accent}33, 0 0 40px ${current.accent}15`,
                      }}
                    />
                    {/* Enlarge hint */}
                    <div
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        background: current.accent,
                        border: '2px solid var(--bg)',
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 7L7 1M7 1H4M7 1V4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <h4
                    className="text-[15px] font-bold leading-tight"
                    style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
                  >
                    {current.members[0].name}
                  </h4>
                  <span
                    className="text-[9px] font-medium tracking-[0.12em] uppercase mt-1.5 px-3 py-1 rounded-full"
                    style={{
                      color: current.accent,
                      background: `${current.accent}18`,
                      border: `1px solid ${current.accent}30`,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {current.role}
                  </span>
                </>
              ) : (
                /* ── Multi-member: row of smaller clickable photos ── */
                <>
                  <div className="flex items-start justify-center gap-3 flex-wrap mb-3">
                    {current.members.map((member, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1.5 cursor-pointer"
                        onClick={() => openLightbox(member, current.accent, current.role)}
                        title={`Click to enlarge — ${member.name}`}
                      >
                        <div className="relative">
                          <MemberPhoto
                            photo={member.photo}
                            initials={member.initials}
                            accent={current.accent}
                            size={58}
                          />
                          <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{ boxShadow: `0 0 12px ${current.accent}33` }}
                          />
                          {/* Enlarge hint */}
                          <div
                            className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{
                              background: current.accent,
                              border: '2px solid var(--bg)',
                            }}
                          >
                            <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                              <path d="M1 7L7 1M7 1H4M7 1V4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <span
                          className="text-[9px] font-medium leading-tight text-center"
                          style={{
                            color: 'var(--text-secondary)',
                            maxWidth: 64,
                            fontFamily: 'var(--font-display)',
                          }}
                        >
                          {member.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shared role badge */}
                  <span
                    className="text-[9px] font-medium tracking-[0.12em] uppercase px-3 py-1 rounded-full"
                    style={{
                      color: current.accent,
                      background: `${current.accent}18`,
                      border: `1px solid ${current.accent}30`,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {current.role}
                  </span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators — one dot per role */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {CORE_TEAM.map((entry, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activeIndex ? entry.accent : 'var(--border)',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={`View ${entry.role}`}
            />
          ))}
        </div>
      </motion.div>

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

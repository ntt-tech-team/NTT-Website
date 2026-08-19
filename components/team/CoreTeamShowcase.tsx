'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CORE_TEAM, type Member } from './data'
import { MemberPhoto, PhotoLightbox, type LightboxState } from './TeamPrimitives'

type Size = 'compact' | 'large'

const SIZES: Record<Size, { single: number; multi: number; minHeight: number; name: number; multiName: number }> = {
  compact: { single: 92, multi: 58, minHeight: 170, name: 15, multiName: 9 },
  large: { single: 140, multi: 84, minHeight: 240, name: 20, multiName: 12 },
}

export function CoreTeamShowcase({
  size = 'compact',
  className = '',
}: {
  size?: Size
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>(null)
  const dims = SIZES[size]

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
    <div className={`glass rounded-2xl p-5 flex flex-col ${className}`}>
      {/* ── Lightbox overlay ─────────────────────────────────────────
          Placed outside any motion.div so position:fixed isn't broken
          by CSS transforms on ancestors.
         ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <PhotoLightbox key="lightbox" lightbox={lightbox} onClose={closeLightbox} />
        )}
      </AnimatePresence>

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
        style={{ minHeight: dims.minHeight }}
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
                    size={dims.single}
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
                  className="font-bold leading-tight"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-display)', fontSize: dims.name }}
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
                          size={dims.multi}
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
                        className="font-medium leading-tight text-center"
                        style={{
                          color: 'var(--text-secondary)',
                          maxWidth: dims.multi + 12,
                          fontFamily: 'var(--font-display)',
                          fontSize: dims.multiName,
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
    </div>
  )
}

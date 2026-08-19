'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import type { Member } from './data'

/** Fallback avatar with gradient + initials (used when photo doesn't load) */
export function AvatarFallback({ initials, accent, size = 64 }: { initials: string; accent: string; size?: number }) {
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
export function MemberPhoto({
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

export type LightboxState = { member: Member; role: string; accent: string } | null

/** Fullscreen lightbox overlay — renders via portal to escape any stacking context */
export function PhotoLightbox({
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
    // Lock body scroll while lightbox is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop — blurred bokeh background */}
      <div className="absolute inset-0 bg-black/80" style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }} />

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
    </div>,
    document.body
  )
}

'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Partners / Sponsors data
// Drop a logo file into `public/partners/` using the exact `logo` path below
// and it'll appear automatically. Until then, a clean wordmark badge is
// shown as a fallback so the card never looks broken.
// ─────────────────────────────────────────────────────────────────────────────
type Partner = {
  name: string
  short: string // shown in the fallback badge
  logo: string
  href?: string
}

const PARTNERS: Partner[] = [
  {
    name: 'AWS User Group — Trichy',
    short: 'AWS',
    logo: '/partners/aws-user-group-trichy.png',
    href: '#',
  },
  {
    name: 'Kuralit',
    short: 'KL',
    logo: '/partners/kuralit.png',
    href: '#',
  },
]

function PartnerLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'var(--accent-muted)',
          border: '1px solid var(--border-accent)',
        }}
      >
        <span
          className="text-[10px] font-bold tracking-wide"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)' }}
        >
          {partner.short}
        </span>
      </div>
    )
  }

  return (
    <img
      src={partner.logo}
      alt={partner.name}
      width={44}
      height={44}
      className="w-11 h-11 rounded-xl object-contain flex-shrink-0 p-1.5"
      style={{
        background: 'var(--accent-muted)',
        border: '1px solid var(--border-accent)',
      }}
      onError={() => setFailed(true)}
    />
  )
}

export function PartnersStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-4"
    >
      <span
        className="text-[9px] font-semibold tracking-[0.22em] uppercase block mb-3"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        Partners
      </span>

      <div className="flex flex-col gap-2.5">
        {PARTNERS.map((partner) => {
          const content = (
            <div className="flex items-center gap-3">
              <PartnerLogo partner={partner} />
              <span
                className="text-[11px] font-medium leading-snug"
                style={{ color: 'var(--text-secondary)' }}
              >
                {partner.name}
              </span>
            </div>
          )

          return partner.href ? (
            <motion.a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              className="rounded-xl -mx-1 px-1 py-0.5 transition-colors"
            >
              {content}
            </motion.a>
          ) : (
            <div key={partner.name}>{content}</div>
          )
        })}
      </div>
    </motion.div>
  )
}

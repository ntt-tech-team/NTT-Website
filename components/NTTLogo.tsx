'use client'
import { useState } from 'react'

interface NTTLogoMarkProps {
  size?: number
  className?: string
}

/**
 * Drop your logo files into /public:
 *   public/logo.png        — used in the navbar and site header
 *   public/logo-white.png  — white version for dark backgrounds (opening animation)
 *
 * If neither file exists, a gradient "N" placeholder renders automatically.
 */
export function NTTLogoMark({ size = 32, className = '' }: NTTLogoMarkProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/logo.png"
        alt="NTT"
        width={size}
        height={size}
        className={`object-contain flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.3),
        background: 'linear-gradient(135deg, #7C6EFF, #38C2FF)',
        fontSize: Math.round(size * 0.44),
        fontFamily: 'var(--font-display)',
      }}
    >
      N
    </div>
  )
}

/** White/light version for use on dark backgrounds (e.g. opening animation) */
export function NTTLogoMarkWhite({ size = 48, className = '' }: NTTLogoMarkProps) {
  const [failed, setFailed] = useState(false)

  if (!failed) {
    return (
      <img
        src="/logo-white.png"
        alt="NTT"
        width={size}
        height={size}
        className={`object-contain flex-shrink-0 ${className}`}
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    )
  }

  // Fallback: invisible — OpeningAnimation uses its own gradient text instead
  return null
}

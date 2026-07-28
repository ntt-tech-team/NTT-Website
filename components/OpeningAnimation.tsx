'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

type Phase = 'idle' | 'assemble' | 'hold' | 'outro'

// Fragment origin positions (off-screen directions)
const FRAGMENT_ORIGINS = [
  { x: -320, y: -280, rotate: -145 },
  { x: 260,  y: -310, rotate:  120 },
  { x: -280, y:  220, rotate: -90  },
  { x: 310,  y:  260, rotate:  155 },
  { x: -360, y:   40, rotate: -60  },
  { x:  340, y:  -80, rotate:  80  },
  { x:   80, y: -340, rotate: -110 },
  { x: -120, y:  320, rotate:  170 },
  { x:  200, y:  300, rotate: -135 },
]

// Per-letter initial flying positions
const LETTER_CONFIGS = [
  { from: { x: -380, y: -200, rotate: -130, scale: 0.3 } }, // N
  { from: { x:    0, y:  400, rotate:  180, scale: 0.2 } }, // T
  { from: { x:  380, y: -220, rotate:  125, scale: 0.3 } }, // T
]

const LETTERS = ['N', 'T', 'T']

export function OpeningAnimation() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [visible, setVisible] = useState(true)
  const [showFlash, setShowFlash] = useState(false)
  const [showShockwave, setShowShockwave] = useState(false)

  const dismiss = () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('ntt_seen', '1')
    }
    setPhase('outro')
  }

  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem('ntt_seen')) {
      setVisible(false)
      return
    }

    // Small idle pause, then fly in
    const t1 = setTimeout(() => setPhase('assemble'), 300)

    // Impact flash + shockwave at assembly moment
    const t2 = setTimeout(() => {
      setShowFlash(true)
      setShowShockwave(true)
      setTimeout(() => setShowFlash(false), 120)
      setTimeout(() => setShowShockwave(false), 600)
    }, 1100)

    // Hold briefly, then exit
    const t3 = setTimeout(() => setPhase('hold'), 1200)
    const t4 = setTimeout(() => {
      sessionStorage.setItem('ntt_seen', '1')
      setPhase('outro')
    }, 2800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence>
      {phase !== 'outro' && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: '#08081A' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={(def) => {
            // When exit animation completes
            if (phase === 'outro') setVisible(false)
          }}
          onClick={dismiss}
        >
          {/* Background ambient glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'radial-gradient(ellipse 60% 45% at 50% 50%, rgba(124,110,255,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Floating background shards (decorative) */}
          {phase !== 'idle' && FRAGMENT_ORIGINS.map((_, i) => (
            <motion.div
              key={`shard-${i}`}
              className="absolute pointer-events-none"
              initial={{
                x: FRAGMENT_ORIGINS[i].x * 0.4,
                y: FRAGMENT_ORIGINS[i].y * 0.4,
                rotate: FRAGMENT_ORIGINS[i].rotate,
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                x: FRAGMENT_ORIGINS[i].x * 0.08,
                y: FRAGMENT_ORIGINS[i].y * 0.08,
                rotate: FRAGMENT_ORIGINS[i].rotate * 0.3,
                opacity: phase === 'hold' ? [0, 0.18, 0.18, 0] : [0, 0.15],
                scale: 0.6,
              }}
              transition={{
                duration: 0.8,
                delay: 0.05 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: 28 + (i % 4) * 14,
                height: 3,
                borderRadius: 2,
                background: i % 2 === 0
                  ? 'linear-gradient(90deg, #7C6EFF, transparent)'
                  : 'linear-gradient(90deg, #38C2FF, transparent)',
              }}
            />
          ))}

          {/* Main NTT letters */}
          <div className="relative flex items-center justify-center select-none" style={{ gap: 'clamp(6px, 2vw, 18px)' }}>
            {LETTERS.map((letter, i) => (
              <motion.span
                key={`letter-${i}`}
                initial={{
                  x: LETTER_CONFIGS[i].from.x,
                  y: LETTER_CONFIGS[i].from.y,
                  rotate: LETTER_CONFIGS[i].from.rotate,
                  scale: LETTER_CONFIGS[i].from.scale,
                  opacity: 0,
                }}
                animate={
                  phase === 'idle'
                    ? {}
                    : {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: 0.72,
                  delay: i * 0.045,
                  ease: [0.12, 0.9, 0.35, 1],
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(5.5rem, 20vw, 9.5rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  background: 'linear-gradient(135deg, #7C6EFF 0%, #a89fff 45%, #38C2FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.04em',
                  filter: 'drop-shadow(0 0 24px rgba(124,110,255,0.5))',
                  display: 'inline-block',
                }}
              >
                {letter}
              </motion.span>
            ))}

            {/* Impact flash overlay */}
            <AnimatePresence>
              {showFlash && (
                <motion.div
                  key="flash"
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(124,110,255,0.2) 50%, transparent 80%)',
                    borderRadius: 24,
                    transform: 'scale(2)',
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Shockwave ring */}
          <AnimatePresence>
            {showShockwave && (
              <motion.div
                key="shockwave"
                className="absolute pointer-events-none"
                initial={{ width: 40, height: 40, opacity: 0.8, borderWidth: 3 }}
                animate={{ width: 420, height: 180, opacity: 0, borderWidth: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                style={{
                  borderRadius: '50%',
                  borderStyle: 'solid',
                  borderColor: 'rgba(124,110,255,0.6)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Tagline fade-in after assembly */}
          <AnimatePresence>
            {phase === 'hold' && (
              <motion.p
                key="tagline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute tracking-[0.28em] uppercase"
                style={{
                  top: 'calc(50% + clamp(3.5rem, 10vw, 6rem))',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: 'clamp(8px, 2vw, 11px)',
                  color: 'rgba(144,144,190,0.75)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Neuro Tech Titans · SRMIST Trichy
              </motion.p>
            )}
          </AnimatePresence>

          {/* Tap to skip hint */}
          <AnimatePresence>
            {phase === 'assemble' && (
              <motion.p
                key="skip-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute bottom-8 tracking-[0.32em] uppercase pointer-events-none"
                style={{
                  fontSize: 10,
                  color: 'rgba(107,107,155,0.55)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                tap anywhere to skip
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'idle' | 'logo' | 'assemble' | 'hold' | 'outro'

// Per-letter flying origins (off-screen)
const LETTER_CONFIGS = [
  { from: { x: -350, y: -180, rotate: -120, scale: 0.2 } }, // N
  { from: { x:   60, y:  380, rotate:  160, scale: 0.15 } }, // T
  { from: { x:  350, y: -200, rotate:  110, scale: 0.2 } },  // T
]

const LETTERS = ['N', 'T', 'T']

// Decorative shard positions
const SHARDS = [
  { x: -280, y: -240, rotate: -145, color: '#7C6EFF' },
  { x:  240, y: -270, rotate:  120, color: '#38C2FF' },
  { x: -250, y:  200, rotate:  -90, color: '#38C2FF' },
  { x:  280, y:  230, rotate:  155, color: '#7C6EFF' },
  { x: -320, y:   30, rotate:  -60, color: '#7C6EFF' },
  { x:  300, y:  -60, rotate:   80, color: '#38C2FF' },
  { x:   60, y: -300, rotate: -110, color: '#7C6EFF' },
  { x: -100, y:  280, rotate:  170, color: '#38C2FF' },
]

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
      setTimeout(() => window.dispatchEvent(new Event('ntt:animation-done')), 150)
      return
    }

    // Phase 1: Logo appears
    const t1 = setTimeout(() => setPhase('logo'), 300)

    // Phase 2: Letters fly in + impact
    const t2 = setTimeout(() => setPhase('assemble'), 1100)
    const t3 = setTimeout(() => {
      setShowFlash(true)
      setShowShockwave(true)
      setTimeout(() => setShowFlash(false), 140)
      setTimeout(() => setShowShockwave(false), 650)
    }, 1800)

    // Phase 3: Hold
    const t4 = setTimeout(() => setPhase('hold'), 1900)

    // Phase 4: Exit
    const t5 = setTimeout(() => {
      sessionStorage.setItem('ntt_seen', '1')
      setPhase('outro')
    }, 3200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence onExitComplete={() => { setVisible(false); window.dispatchEvent(new Event('ntt:animation-done')) }}>
      {phase !== 'outro' && (
        <motion.div
          key="opening"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ background: '#08081A' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onClick={dismiss}
        >
          {/* Ambient background glow — pulses in during hold */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'hold' ? 1 : phase === 'assemble' ? 0.4 : 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'radial-gradient(ellipse 55% 40% at 50% 48%, rgba(124,110,255,0.14) 0%, transparent 70%)',
            }}
          />

          {/* Decorative shards — streak during assembly */}
          {(phase === 'assemble' || phase === 'hold') && SHARDS.map((shard, i) => (
            <motion.div
              key={`shard-${i}`}
              className="absolute pointer-events-none"
              initial={{
                x: shard.x * 0.5,
                y: shard.y * 0.5,
                rotate: shard.rotate,
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                x: shard.x * 0.1,
                y: shard.y * 0.1,
                rotate: shard.rotate * 0.2,
                opacity: phase === 'hold' ? [0, 0.2, 0.2, 0] : [0, 0.18],
                scale: 0.5,
              }}
              transition={{
                duration: 0.7,
                delay: 0.04 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                width: 24 + (i % 4) * 12,
                height: 2.5,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${shard.color}, transparent)`,
              }}
            />
          ))}

          {/* Center content container */}
          <div className="relative z-10 flex flex-col items-center select-none px-6">

            {/* Club Logo — appears first, moves up when letters arrive */}
            <AnimatePresence>
              {phase !== 'idle' && (
                <motion.div
                  key="logo"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.6, y: 0 }}
                  animate={{
                    opacity: 1,
                    scale: phase === 'logo' ? 1 : 0.85,
                    y: phase === 'logo' ? 0 : -20,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Glow behind logo */}
                  <motion.div
                    className="absolute pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: phase === 'logo' ? 0.6 : phase === 'hold' ? 0.45 : 0.3,
                      scale: 1.2,
                    }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    style={{
                      width: 'clamp(120px, 30vw, 180px)',
                      height: 'clamp(120px, 30vw, 180px)',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(124,110,255,0.35) 0%, rgba(56,194,255,0.12) 50%, transparent 75%)',
                      filter: 'blur(18px)',
                    }}
                  />
                  <img
                    src="/logo-white.png"
                    alt="NTT"
                    style={{
                      width: 'clamp(72px, 18vw, 110px)',
                      height: 'clamp(72px, 18vw, 110px)',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 2,
                      filter: 'drop-shadow(0 0 20px rgba(124,110,255,0.45))',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* NTT Letters — fly in during assemble phase */}
            <div
              className="relative flex items-center justify-center"
              style={{
                gap: 'clamp(4px, 1.5vw, 14px)',
                marginTop: 'clamp(12px, 3vw, 20px)',
                minHeight: 'clamp(5rem, 16vw, 8rem)',
              }}
            >
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
                    phase === 'idle' || phase === 'logo'
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
                    duration: 0.65,
                    delay: i * 0.04,
                    ease: [0.08, 0.92, 0.35, 1],
                  }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4.5rem, 16vw, 8rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, #7C6EFF 0%, #a89fff 45%, #38C2FF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.04em',
                    filter: 'drop-shadow(0 0 20px rgba(124,110,255,0.4))',
                    display: 'inline-block',
                  }}
                >
                  {letter}
                </motion.span>
              ))}

              {/* Impact flash */}
              <AnimatePresence>
                {showFlash && (
                  <motion.div
                    key="flash"
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14 }}
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(124,110,255,0.15) 50%, transparent 80%)',
                      borderRadius: 24,
                      transform: 'scale(2.2)',
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Shockwave ring — emanates from center on impact */}
          <AnimatePresence>
            {showShockwave && (
              <motion.div
                key="shockwave"
                className="absolute pointer-events-none"
                initial={{ width: 30, height: 30, opacity: 0.7, borderWidth: 2.5 }}
                animate={{ width: 380, height: 160, opacity: 0, borderWidth: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  borderRadius: '50%',
                  borderStyle: 'solid',
                  borderColor: 'rgba(124,110,255,0.55)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </AnimatePresence>

          {/* Tagline — fades in during hold */}
          <AnimatePresence>
            {phase === 'hold' && (
              <motion.p
                key="tagline"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="absolute tracking-[0.28em] uppercase"
                style={{
                  top: 'calc(50% + clamp(6rem, 16vw, 10rem))',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  fontSize: 'clamp(7px, 1.8vw, 10px)',
                  color: 'rgba(144,144,190,0.7)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Neuro Tech Titans · SRMIST Trichy
              </motion.p>
            )}
          </AnimatePresence>

          {/* Tap to skip hint */}
          <AnimatePresence>
            {(phase === 'logo' || phase === 'assemble') && (
              <motion.p
                key="skip-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute bottom-8 tracking-[0.32em] uppercase pointer-events-none"
                style={{
                  fontSize: 10,
                  color: 'rgba(107,107,155,0.5)',
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

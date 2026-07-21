'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NTTLogoMarkWhite } from '@/components/NTTLogo'

type Phase = 'canvas' | 'logo' | 'tagline' | 'outro'

const TAGLINE = 'NEURO TECH TITANS · SRMIST TRICHY'

export function OpeningAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const [phase, setPhase] = useState<Phase>('canvas')
  const [typeText, setTypeText] = useState('')
  const [visible, setVisible] = useState(true)

  const dismiss = () => {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('ntt_seen', '1')
    }
    setPhase('outro')
  }

  // Check session + run timeline
  useEffect(() => {
    if (typeof sessionStorage === 'undefined') return
    if (sessionStorage.getItem('ntt_seen')) {
      setVisible(false)
      return
    }
    const t1 = setTimeout(() => setPhase('logo'), 500)
    const t2 = setTimeout(() => setPhase('tagline'), 1400)
    const t3 = setTimeout(() => {
      sessionStorage.setItem('ntt_seen', '1')
      setPhase('outro')
    }, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  // Typewriter
  useEffect(() => {
    if (phase !== 'tagline') return
    let i = 0
    const id = setInterval(() => {
      i++
      setTypeText(TAGLINE.slice(0, i))
      if (i >= TAGLINE.length) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [phase])

  // Canvas particle system
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.max(24, Math.min(72, Math.floor(window.innerWidth / 13)))
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 1.6 + 0.6,
      violet: Math.random() > 0.42,
    }))

    const draw = () => {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#08081A'
      ctx.fillRect(0, 0, w, h)

      // Move + draw dots
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -8) p.x = w + 8
        else if (p.x > w + 8) p.x = -8
        if (p.y < -8) p.y = h + 8
        else if (p.y > h + 8) p.y = -8

        ctx.globalAlpha = 0.75
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.violet ? '#7C6EFF' : '#38C2FF'
        ctx.fill()
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 140) {
            ctx.globalAlpha = (1 - d / 140) * 0.32
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].violet ? '#7C6EFF' : '#38C2FF'
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [visible])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden cursor-pointer"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'outro' ? 0 : 1 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      onAnimationComplete={() => {
        if (phase === 'outro') setVisible(false)
      }}
      onClick={dismiss}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 text-center select-none px-6">
        <AnimatePresence>
          {phase !== 'canvas' && (
            <motion.div
              key="ntt-logo"
              initial={{ opacity: 0, scale: 0.78, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* If logo-white.png exists in /public it renders here, otherwise nothing */}
              <div className="flex justify-center mb-3">
                <NTTLogoMarkWhite size={64} />
              </div>
              <h1
                className="font-black leading-none tracking-tighter select-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(5.5rem, 18vw, 9rem)',
                  background: 'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NTT
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(phase === 'tagline' || phase === 'outro') && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-5"
            >
              <span
                className="text-[11px] sm:text-[13px] tracking-[0.28em]"
                style={{
                  color: 'rgba(144, 144, 190, 0.88)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {typeText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.75 }}
                >
                  |
                </motion.span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip hint */}
      <AnimatePresence>
        {phase === 'logo' && (
          <motion.p
            key="skip-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-8 text-[10px] tracking-[0.32em] uppercase pointer-events-none"
            style={{ color: 'rgba(107, 107, 155, 0.6)', fontFamily: 'var(--font-mono)' }}
          >
            tap anywhere to skip
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

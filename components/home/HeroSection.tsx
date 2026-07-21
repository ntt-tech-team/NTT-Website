'use client'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(124,110,255,0.14) 0%, rgba(56,194,255,0.07) 100%)',
        borderColor: 'rgba(124,110,255,0.28)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,110,255,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      <div
        className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-2"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        This week · Featured
      </div>

      <h2
        className="text-xl font-bold mb-1.5 leading-tight"
        style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
      >
        Vibe-A-Thon 2026
      </h2>

      <p
        className="text-xs mb-4 font-medium"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
      >
        July 26, 2026 · SRMIST Trichy · 62 spots
      </p>

      <div className="flex items-center gap-2.5">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="px-5 py-2 rounded-xl text-xs font-semibold text-white"
          style={{ background: 'var(--accent)' }}
        >
          Register now
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 rounded-xl text-xs font-medium"
          style={{
            color: 'var(--text-secondary)',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
          }}
        >
          Learn more
        </motion.button>
      </div>
    </motion.div>
  )
}

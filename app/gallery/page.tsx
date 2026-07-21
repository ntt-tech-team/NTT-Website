'use client'
import { motion } from 'framer-motion'

const banners = [
  { id: 1, label: 'Vibe-A-Thon 2026', gradient: 'linear-gradient(135deg, #7C6EFF 0%, #38C2FF 100%)', tall: true },
  { id: 2, label: 'DevDrop 2026', gradient: 'linear-gradient(135deg, #38C2FF 0%, #0EA5E9 100%)', tall: false },
  { id: 3, label: 'YUVA 26', gradient: 'linear-gradient(135deg, #A78BFA 0%, #7C6EFF 100%)', tall: false },
  { id: 4, label: 'NTT Induction', gradient: 'linear-gradient(135deg, #06B6D4 0%, #38C2FF 100%)', tall: true },
  { id: 5, label: 'Cutthroat Coders', gradient: 'linear-gradient(135deg, #F472B6 0%, #A78BFA 100%)', tall: false },
  { id: 6, label: 'Hack-a-Ton S2', gradient: 'linear-gradient(135deg, #34D399 0%, #06B6D4 100%)', tall: false },
]

export default function GalleryPage() {
  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="mb-5"
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
          Gallery
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Event posters and banners
        </p>
      </motion.div>

      {/* Masonry-style grid */}
      <div className="columns-2 gap-3 space-y-3">
        {banners.map(({ id, label, gradient, tall }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
            className="break-inside-avoid rounded-2xl overflow-hidden relative cursor-pointer mb-3"
            style={{ height: tall ? '180px' : '120px', background: gradient }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0 flex items-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }}
            >
              <span
                className="text-white text-[11px] font-semibold leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-[10px] mt-6 tracking-widest uppercase"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        6 items · Supabase Storage in Phase 3
      </motion.p>
    </div>
  )
}

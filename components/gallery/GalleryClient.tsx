'use client'
import { motion } from 'framer-motion'
import type { GalleryRow } from '@/lib/supabase/types'

export function GalleryClient({ items }: { items: GalleryRow[] }) {
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

      <div className="columns-2 gap-3 space-y-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.07 }}
            className="break-inside-avoid rounded-2xl overflow-hidden relative cursor-pointer mb-3"
            style={{
              height: item.tall ? '180px' : '120px',
              background: item.image_url ? undefined : item.gradient,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {item.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image_url}
                alt={item.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div
              className="absolute inset-0 flex items-end p-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }}
            >
              <span
                className="text-white text-[11px] font-semibold leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {item.label}
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
        {items.length} items · Supabase Storage
      </motion.p>
    </div>
  )
}

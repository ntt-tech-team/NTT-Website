'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/config'

type Step = 'choose' | 'email' | 'sent'

export function AuthSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const configured = isSupabaseConfigured()
  const [step, setStep] = useState<Step>('choose')
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function resetAndClose() {
    onClose()
    setTimeout(() => {
      setStep('choose')
      setEmail('')
      setError('')
      setBusy(false)
    }, 220)
  }

  async function google() {
    if (!configured) {
      setError('Supabase is not configured yet.')
      return
    }
    setBusy(true)
    setError('')
    const origin = window.location.origin
    const { error: authError } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${origin}/auth/callback` },
    })
    if (authError) {
      setError(authError.message)
      setBusy(false)
    }
  }

  async function sendMagicLink() {
    if (!configured) {
      setError('Supabase is not configured yet.')
      return
    }
    if (!email.trim()) return
    setBusy(true)
    setError('')
    const origin = window.location.origin
    const { error: authError } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${origin}/auth/callback` },
    })
    setBusy(false)
    if (authError) {
      setError(authError.message)
      return
    }
    setStep('sent')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={resetAndClose}
          />
          <motion.div
            key="sheet"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl p-6 max-w-lg mx-auto"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: 'var(--border-accent)' }} />

            {step === 'sent' ? (
              <div className="text-center pb-4">
                <p className="font-bold text-lg mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Check your inbox
                </p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  We sent a sign-in link to {email}
                </p>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={resetAndClose}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Done
                </motion.button>
              </div>
            ) : (
              <>
                <p className="text-center font-bold text-lg mb-1" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
                  Join NTT
                </p>
                <p className="text-center text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                  Sign in to register for events and get notified
                </p>

                {step === 'email' ? (
                  <div className="space-y-3">
                    <input
                      type="email"
                      autoFocus
                      placeholder="you@srmist.edu.in"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') sendMagicLink() }}
                      className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                      style={{
                        background: 'var(--surface-2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                      }}
                    />
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={sendMagicLink}
                      disabled={busy || !email.trim()}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                      style={{ background: 'var(--accent)' }}
                    >
                      {busy ? 'Sending…' : 'Send magic link'}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => { setStep('choose'); setError('') }}
                      className="w-full text-xs py-1"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={google}
                      disabled={busy}
                      className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 disabled:opacity-50"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text)' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setStep('email')}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      Continue with Email
                    </motion.button>
                  </div>
                )}

                {error && (
                  <p className="text-center text-xs mt-3" style={{ color: '#FF6B6B' }}>{error}</p>
                )}

                <p className="text-center text-[10px] mt-4" style={{ color: 'var(--text-muted)' }}>
                  No password required · Magic link sent to your inbox
                </p>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

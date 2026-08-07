'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Platform = 'android' | 'ios' | null

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [platform, setPlatform] = useState<Platform>(null)
  const [show, setShow] = useState(false)
  const [animationDone, setAnimationDone] = useState(false)

  // Detect platform
  useEffect(() => {
    // Already in standalone — never show
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true
    ) {
      return
    }

    // Previously dismissed
    if (localStorage.getItem('ntt_pwa_dismissed')) return

    const ua = navigator.userAgent

    // Detect iOS: iPhone/iPod in Safari (not CriOS/FxiOS/EdgiOS)
    const isIOS = /iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)

    // Detect iPadOS: Macintosh UA + touch support (iPad reports as Mac since iPadOS 13)
    const isIPadOS =
      /Macintosh/.test(ua) &&
      navigator.maxTouchPoints > 1 &&
      /Safari/.test(ua) &&
      !/CriOS|FxiOS|EdgiOS/.test(ua)

    if (isIOS || isIPadOS) {
      setPlatform('ios')
    }

    // Android / desktop Chrome — capture beforeinstallprompt
    const handleBIP = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setPlatform('android')
    }

    window.addEventListener('beforeinstallprompt', handleBIP)
    return () => window.removeEventListener('beforeinstallprompt', handleBIP)
  }, [])

  // Listen for animation-done event
  useEffect(() => {
    const handler = () => setAnimationDone(true)
    window.addEventListener('ntt:animation-done', handler)
    return () => window.removeEventListener('ntt:animation-done', handler)
  }, [])

  // Show prompt 800ms after animation completes
  useEffect(() => {
    if (!animationDone || !platform) return
    if (localStorage.getItem('ntt_pwa_dismissed')) return

    const timeout = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(timeout)
  }, [animationDone, platform])

  const dismiss = useCallback(() => {
    setShow(false)
    localStorage.setItem('ntt_pwa_dismissed', '1')
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null)
    }
    dismiss()
  }, [deferredPrompt, dismiss])

  return (
    <AnimatePresence>
      {show && platform && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pwa-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={dismiss}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 89,
              background: 'rgba(0, 0, 0, 0.5)',
            }}
          />

          {/* Bottom sheet */}
          <motion.div
            key="pwa-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 90,
              background: '#13132E',
              borderTop: '1px solid var(--border-accent)',
              borderRadius: '20px 20px 0 0',
              padding: '24px 20px',
              paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
              maxWidth: 480,
              marginInline: 'auto',
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: 'rgba(144, 144, 184, 0.3)',
                margin: '0 auto 20px',
              }}
            />

            {/* Header: icon + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img
                src="/icons/icon-192x192.png"
                alt="NTT"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  boxShadow: '0 4px 16px rgba(124, 110, 255, 0.25)',
                }}
              />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 700,
                    color: '#F0EFFF',
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  Install NTT
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#9090B8',
                    margin: '2px 0 0',
                    lineHeight: 1.4,
                  }}
                >
                  Add to your home screen for the best experience
                </p>
              </div>
            </div>

            {platform === 'android' ? (
              /* ── Android: Install + Not Now buttons ── */
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  onClick={dismiss}
                  style={{
                    flex: 1,
                    padding: '13px 0',
                    borderRadius: 12,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'transparent',
                    color: '#9090B8',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Not Now
                </button>
                <button
                  onClick={handleInstall}
                  style={{
                    flex: 1.5,
                    padding: '13px 0',
                    borderRadius: 12,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7C6EFF 0%, #9B8FFF 100%)',
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(124, 110, 255, 0.35)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(124, 110, 255, 0.45)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 110, 255, 0.35)'
                  }}
                >
                  Install App
                </button>
              </div>
            ) : (
              /* ── iOS / iPadOS: Step-by-step instructions ── */
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
                  {[
                    {
                      step: '1',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                      ),
                      text: (
                        <>Tap the <strong style={{ color: '#F0EFFF' }}>Share</strong> button in Safari</>
                      ),
                    },
                    {
                      step: '2',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="12" y1="8" x2="12" y2="16" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      ),
                      text: (
                        <>Tap <strong style={{ color: '#F0EFFF' }}>Add to Home Screen</strong></>
                      ),
                    },
                    {
                      step: '3',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ),
                      text: (
                        <>Tap <strong style={{ color: '#F0EFFF' }}>Add</strong> to confirm</>
                      ),
                    },
                  ].map(({ step, icon, text }) => (
                    <div
                      key={step}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 14px',
                        borderRadius: 12,
                        background: 'rgba(124, 110, 255, 0.06)',
                        border: '1px solid rgba(124, 110, 255, 0.1)',
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: 'rgba(124, 110, 255, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {icon}
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: '#9090B8',
                          margin: 0,
                          lineHeight: 1.45,
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Close button */}
                <button
                  onClick={dismiss}
                  style={{
                    width: '100%',
                    marginTop: 16,
                    padding: '13px 0',
                    borderRadius: 12,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'transparent',
                    color: '#9090B8',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  Got It
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

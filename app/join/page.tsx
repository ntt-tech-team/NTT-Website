'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']
const DEPARTMENTS = [
  'CSE', 'CSE (AI & ML)', 'CSE (Data Science)', 'CSE (Cyber Security)',
  'ECE', 'EEE', 'Mechanical', 'Civil', 'IT', 'Other'
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function JoinPage() {
  const { user, profile, refresh } = useAuth()
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    year: '',
    department: '',
    skills: '',
    reason: '',
    links: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [prefilled, setPrefilled] = useState(false)

  useEffect(() => {
    if (prefilled || (!user && !profile)) return
    setForm(prev => ({
      ...prev,
      full_name: prev.full_name || profile?.full_name || user?.user_metadata?.full_name || user?.user_metadata?.name || '',
      email: prev.email || profile?.email || user?.email || '',
      year: prev.year || profile?.year || '',
      department: prev.department || profile?.department || '',
    }))
    setPrefilled(true)
  }, [user, profile, prefilled])

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit() {
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong. Try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      await refresh()
    } catch {
      setErrorMsg('Network error. Check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="px-4 py-5 max-w-lg mx-auto pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }} className="mb-6"
      >
        <Link
          href="/profile"
          className="flex items-center gap-1.5 text-xs mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Profile
        </Link>

        <div className="flex items-center gap-3 mb-2">
          {/* Gradient icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(124,110,255,0.25) 0%, rgba(56,194,255,0.25) 100%)',
              border: '1px solid rgba(124,110,255,0.4)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#joinGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="joinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C6EFF" />
                  <stop offset="100%" stopColor="#38C2FF" />
                </linearGradient>
              </defs>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
              Join NTT
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Apply to become a Neuro Tech Titans member
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          /* ── Success State ── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-8 text-center"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,110,255,0.2) 0%, rgba(56,194,255,0.2) 100%)', border: '1px solid rgba(124,110,255,0.4)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" stroke="url(#checkGrad)" />
                <defs>
                  <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C6EFF" />
                    <stop offset="100%" stopColor="#38C2FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="font-bold text-lg mb-2" style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}>
              Application Submitted!
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              We'll review your application and reach out to you at the email you provided. Keep an eye on your inbox.
            </p>
            <Link href="/">
              <motion.button
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'var(--accent)' }}
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          /* ── Form ── */
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-3">
              {/* Personal Info card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-4 space-y-3"
              >
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Personal Info
                </p>

                <Field label="Full Name" required>
                  <input
                    type="text"
                    placeholder="e.g. Ravi Shankar"
                    value={form.full_name}
                    onChange={set('full_name')}
                    className="field-input"
                  />
                </Field>

                <Field label="College Email" required>
                  <input
                    type="email"
                    placeholder="yourname@srmist.edu.in"
                    value={form.email}
                    onChange={set('email')}
                    className="field-input"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Year" required>
                    <select value={form.year} onChange={set('year')} className="field-input">
                      <option value="">Select</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </Field>

                  <Field label="Department" required>
                    <select value={form.department} onChange={set('department')} className="field-input">
                      <option value="">Select</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </Field>
                </div>
              </motion.div>

              {/* About You card */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="glass rounded-2xl p-4 space-y-3"
              >
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  About You
                </p>

                <Field label="Skills & Interests">
                  <textarea
                    rows={2}
                    placeholder="e.g. Python, React, ML, UI/UX, Robotics…"
                    value={form.skills}
                    onChange={set('skills')}
                    className="field-input resize-none"
                  />
                </Field>

                <Field label="Why do you want to join NTT?" required>
                  <textarea
                    rows={3}
                    placeholder="Tell us what excites you about NTT and what you'd bring to the club…"
                    value={form.reason}
                    onChange={set('reason')}
                    className="field-input resize-none"
                  />
                </Field>

                <Field label="Portfolio / GitHub / LinkedIn" hint="Optional">
                  <input
                    type="text"
                    placeholder="github.com/yourusername"
                    value={form.links}
                    onChange={set('links')}
                    className="field-input"
                  />
                </Field>
              </motion.div>

              {/* Error */}
              <AnimatePresence>
                {status === 'error' && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-xl px-4 py-3 text-sm"
                    style={{ background: 'var(--urgent-bg)', border: '1px solid var(--urgent-border)', color: '#FF6B6B' }}
                  >
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={status === 'submitting' || !form.full_name || !form.email || !form.year || !form.department || !form.reason}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, var(--accent) 0%, #5B8EFF 100%)' }}
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Submitting…
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </motion.button>

                <p className="text-center text-[10px] mt-3" style={{ color: 'var(--text-muted)' }}>
                  Applications are reviewed by the NTT core team · We'll contact you within a few days
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .field-input {
          width: 100%;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 13px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .field-input:focus {
          border-color: var(--border-accent);
        }
        .field-input::placeholder {
          color: var(--text-muted);
        }
        select.field-input option {
          background: var(--surface);
          color: var(--text);
        }
      `}</style>
    </div>
  )
}

function Field({
  label, required, hint, children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
        {required && <span style={{ color: 'var(--accent)' }}>*</span>}
        {hint && <span className="ml-auto font-normal" style={{ color: 'var(--text-muted)' }}>{hint}</span>}
      </label>
      {children}
    </div>
  )
}

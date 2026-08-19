'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import type { MembershipStatus } from '@/lib/supabase/types'

const statusConfig: Record<
  MembershipStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  not_applied: {
    label: 'Not Applied',
    bg: 'rgba(107, 107, 155, 0.15)',
    text: 'var(--text-muted)',
    border: 'rgba(107, 107, 155, 0.25)',
  },
  pending: {
    label: 'Pending',
    bg: 'rgba(255, 183, 38, 0.15)',
    text: '#FFB726',
    border: 'rgba(255, 183, 38, 0.3)',
  },
  approved: {
    label: 'Member ✓',
    bg: 'rgba(52, 211, 153, 0.15)',
    text: '#34D399',
    border: 'rgba(52, 211, 153, 0.3)',
  },
  rejected: {
    label: 'Not approved',
    bg: 'rgba(255, 72, 72, 0.12)',
    text: '#FF6B6B',
    border: 'rgba(255, 72, 72, 0.25)',
  },
}

export default function ProfilePage() {
  const { user, profile, loading, openAuth, signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  const membershipStatus: MembershipStatus =
    profile?.membership_status ?? 'not_applied'

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0]

  const avatarUrl =
    profile?.avatar_url ||
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture

  return (
    <div className="px-4 py-5 max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-5"
      >
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            color: 'var(--text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Profile
        </h1>

        <p
          className="text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          Your NTT account
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="glass rounded-2xl p-6 text-center mb-4"
      >
        <div
          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden"
          style={{
            background: 'var(--accent-muted)',
            border: '2px solid var(--border-accent)',
          }}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--accent)' }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
        </div>

        {loading ? (
          <p
            className="text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Loading…
          </p>
        ) : user ? (
          <>
            <p
              className="font-semibold mb-1"
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {displayName}
            </p>

            <p
              className="text-xs mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              {user.email}
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={async () => {
                setSigningOut(true)
                await signOut()
                setSigningOut(false)
              }}
              disabled={signingOut}
              className="w-full py-3 rounded-xl text-sm font-semibold"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text)',
              }}
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </motion.button>
          </>
        ) : (
          <>
            <p
              className="font-semibold mb-1"
              style={{
                color: 'var(--text)',
                fontFamily: 'var(--font-display)',
              }}
            >
              You are not signed in
            </p>

            <p
              className="text-xs mb-5"
              style={{ color: 'var(--text-muted)' }}
            >
              Sign in to view registrations, manage notifications, and more
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={openAuth}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'var(--accent)' }}
            >
              Sign in to NTT
            </motion.button>
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mb-2.5"
      >
        <a
          href="https://forms.gle/pzqoZUQGTB9adyWD6"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-xl p-3.5 flex items-center gap-3"
            style={{
              cursor: 'pointer',
              borderLeft: `3px solid ${
                membershipStatus === 'approved'
                  ? statusConfig.approved.text
                  : 'var(--accent)'
              }`,
              transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <span className="text-xl">🏅</span>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium"
                style={{
                  color: 'var(--text)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {membershipStatus === 'approved'
                  ? "You're already a member"
                  : 'Become a Member'}
              </p>

              <p
                className="text-[10px]"
                style={{ color: 'var(--text-muted)' }}
              >
                {membershipStatus === 'approved'
                  ? 'Welcome to Neuro Tech Titans!'
                  : membershipStatus === 'pending'
                    ? 'Your application is under review'
                    : membershipStatus === 'rejected'
                      ? 'You can apply again from the join page'
                      : 'Apply to join NTT Club'}
              </p>
            </div>

            <span
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0"
              style={{
                background: statusConfig[membershipStatus].bg,
                color: statusConfig[membershipStatus].text,
                border: `1px solid ${statusConfig[membershipStatus].border}`,
                ...(membershipStatus === 'pending'
                  ? {
                      animation:
                        'pulse-badge 2s ease-in-out infinite',
                    }
                  : {}),
              }}
            >
              {statusConfig[membershipStatus].label}
            </span>

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                color: 'var(--text-muted)',
                flexShrink: 0,
              }}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.div>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-2.5"
      >
        {[
          {
            href: '/events',
            icon: '📋',
            label: 'My Registrations',
            sub: 'View all your event sign-ups',
            locked: !user,
          },
          {
            icon: '🔔',
            label: 'Notification Preferences',
            sub: 'Web Push, Email, Telegram',
            locked: true,
          },
          {
            icon: '🎟️',
            label: 'Event History',
            sub: 'Past events you attended',
            locked: true,
          },
        ].map(({ href, icon, label, sub, locked }) => {
          const inner = (
            <div
              className="glass rounded-xl p-3.5 flex items-center gap-3"
              style={{ opacity: locked ? 0.5 : 1 }}
            >
              <span className="text-xl">{icon}</span>

              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--text)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {label}
                </p>

                <p
                  className="text-[10px]"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {sub}
                </p>
              </div>
            </div>
          )

          return href && !locked ? (
            <Link
              key={label}
              href={href}
              style={{ textDecoration: 'none' }}
            >
              {inner}
            </Link>
          ) : (
            <div key={label}>{inner}</div>
          )
        })}
      </motion.div>
    </div>
  )
}
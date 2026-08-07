import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { TopBar } from '@/components/TopBar'
import { BottomNav } from '@/components/BottomNav'
import { OpeningAnimation } from '@/components/OpeningAnimation'
import { SidebarLeft } from '@/components/SidebarLeft'
import { SidebarRight } from '@/components/SidebarRight'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
})

const sansFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08081A' },
    { media: '(prefers-color-scheme: light)', color: '#FAFAFF' },
  ],
}

export const metadata: Metadata = {
  title: 'NTT — Neuro Tech Titans',
  description: 'The official platform for Neuro Tech Titans, SRMIST Trichy',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'NTT',
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} font-sans antialiased`}>
        <ServiceWorkerRegister />
        <ThemeProvider>
          <OpeningAnimation />
          <div className="flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-1 pt-14 pb-24">
              <div className="app-layout">
                <SidebarLeft />
                <div className="app-main">{children}</div>
                <SidebarRight />
              </div>
            </main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

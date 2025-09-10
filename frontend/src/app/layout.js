import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'ApplyEase - AI-Powered Job Application Assistant',
  description:
    'Experience the future of job applications with AI-powered matching, Gen Z design, and sustainable technology. Built for the next generation.',
  keywords: 'job search, AI, career, applications, Gen Z, sustainable tech',
  authors: [{ name: 'ApplyEase Team' }],
  creator: 'ApplyEase',
  publisher: 'ApplyEase',
  openGraph: {
    title: 'ApplyEase - AI-Powered Job Application Assistant',
    description:
      'Experience the future of job applications with AI-powered matching and Gen Z design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApplyEase - AI-Powered Job Application Assistant',
    description:
      'Experience the future of job applications with AI-powered matching and Gen Z design.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <SupabaseProvider>{children}</SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

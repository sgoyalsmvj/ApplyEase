import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SupabaseProvider from '@/components/providers/supabase-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'ApplyEase - AI-Powered Job Application Assistant',
  description:
    'Streamline your job search with AI-tailored resumes and automated job matching',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}

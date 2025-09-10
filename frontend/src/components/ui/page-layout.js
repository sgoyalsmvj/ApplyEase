'use client'

import { Navigation } from './navigation'
import { CustomCursor } from './custom-cursor'
import { ScrollProgress } from './scroll-progress'
import { Footer } from './footer'

export function PageLayout({
  children,
  showNavigation = true,
  showFooter = true,
}) {
  return (
    <div className='relative min-h-screen'>
      <CustomCursor />
      <ScrollProgress />

      {showNavigation && <Navigation />}

      <main className={showNavigation ? 'pt-[var(--nav-height)]' : ''}>
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  )
}

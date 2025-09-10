'use client'

import { PageLayout } from '../components/ui/page-layout'
import { HeroSection } from '../components/ui/hero-section'
import { AboutSection } from '../components/ui/about-section'
import { FeaturesSection } from '../components/ui/features-section'
import { ChatbotSection } from '../components/ui/chatbot-section'
import { PricingSection } from '../components/ui/pricing-section'
import { CTASection } from '../components/ui/cta-section'

export default function Home() {
  return (
    <PageLayout>
      <section id='home'>
        <HeroSection />
      </section>

      <section id='about'>
        <AboutSection />
      </section>

      <section id='features'>
        <FeaturesSection />
      </section>

      {/* <section id='ai'>
        <ChatbotSection />
      </section> */}

      {/* <section id='pricing'>
        <PricingSection />
      </section> */}

      <section id='cta'>
        <CTASection />
      </section>
    </PageLayout>
  )
}

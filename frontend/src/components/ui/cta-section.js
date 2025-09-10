'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Sparkles } from 'lucide-react'
import { MagneticButton } from './magnetic-button'

export function CTASection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section
      ref={ref}
      className='section-lg px-container relative overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        {/* Light Mode Background - Bright and vibrant */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-purple-700 dark:via-pink-700 dark:to-blue-700' />

        {/* Light Mode Overlay - Minimal dark overlay for light mode, more for dark mode */}
        <div className='absolute inset-0 bg-black/10 dark:bg-black/40' />

        {/* Additional Light Mode Enhancement */}
        <div className='absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 dark:from-transparent dark:via-transparent dark:to-transparent' />

        {/* Animated Background Elements */}
        <motion.div
          className='absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30 dark:bg-white/10'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute bottom-20 right-20 w-40 h-40 rounded-full bg-white/25 dark:bg-white/5'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Additional decorative elements for light mode */}
        <motion.div
          className='absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white/20 dark:bg-white/10'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.div
          className='absolute top-1/3 right-1/3 w-28 h-28 rounded-full bg-white/15 dark:bg-white/8'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />

        <motion.div
          className='absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/20 dark:bg-white/10'
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className='container text-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Icon */}
          <motion.div
            className='w-20 h-20 mx-auto mb-8 rounded-full bg-white/40 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/60 dark:border-white/40'
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Sparkles className='w-10 h-10 text-white dark:text-white' />
          </motion.div>

          {/* Title */}
          <h2 className='display-text text-5xl md:text-7xl text-gradient dark:text-white mb-8 leading-tight'>
            Ready to Land Your
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-yellow-300 dark:to-orange-300'>
              Dream Job?
            </span>
          </h2>

          {/* Description */}
          <p className='text-xl md:text-2xl text-gray/60 dark:text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-medium'>
            Join thousands of
            <span className='text-gradient'> Gen-Z job seekers</span> who've already found their perfect
            match. Your next career move is just a click away.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mb-16'>
            <MagneticButton className='bg-white dark:bg-white text-purple-600 dark:text-purple-600 hover:bg-white/90 dark:hover:bg-white/90 px-10 py-5 text-lg font-semibold rounded-xl shadow-2xl flex items-center gap-3 group'>
              Start Your Journey
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </MagneticButton>

            {/* <MagneticButton className='border-2 border-gray/70 dark:border-white/30 text-black dark:text-white hover:bg-white/30 dark:hover:bg-white/10 px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm'>
              Watch Demo
            </MagneticButton> */}
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-8 text-gray/95 dark:text-white/80'
          >
            <div className='flex items-center gap-2'>
              <div className='flex -space-x-2'>
                {['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬'].map((avatar, index) => (
                  <motion.div
                    key={index}
                    className='w-12 h-12 rounded-full bg-gray/50 dark:bg-white/20 flex items-center justify-center text-lg border-2 border-gray/70 dark:border-white/30'
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {avatar}
                  </motion.div>
                ))}
              </div>
              <span className='ml-3 font-medium text-gray/90 dark:text-white/90'>
                10,000+ happy users
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className='text-yellow-200 dark:text-yellow-300 text-xl'
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>
              <span className='ml-2 font-medium text-gray/90 dark:text-white/90'>
                4.9/5 rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-2 h-2 bg-white rounded-full opacity-40 dark:opacity-20'
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </section>
  )
}

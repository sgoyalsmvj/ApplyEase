'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { MagneticButton } from './magnetic-button'

export function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className='hero-section relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 -z-20'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse'></div>
        <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-75'></div>
        <div className='absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-150'></div>
      </div>

      {/* Main Content Container */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 h-full'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          className='flex flex-col items-center justify-center text-center h-full max-w-5xl mx-auto py-12 sm:py-16 lg:py-20 relative z-10'
        >
          {/* Floating Icons */}
          <motion.div
            className='absolute top-0 left-0 pointer-events-none hidden lg:block'
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className='w-8 h-8 text-yellow-400/60' />
          </motion.div>

          <motion.div
            className='absolute top-10 right-0 pointer-events-none hidden lg:block'
            animate={{
              y: [0, -30, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <Zap className='w-10 h-10 text-blue-400/60' />
          </motion.div>

          {/* Badge */}
          <motion.div variants={itemVariants} className='mb-8'>
            <span className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full text-sm font-medium glass backdrop-blur-sm border border-purple-500/20'>
              🚀 Welcome to the Future
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 tracking-tight leading-[0.85] max-w-full'
            data-text='ApplyEase'
          >
            <span
              className='text-gradient-aurora'
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            >
              Apply
            </span>
            <span
              className='text-gradient'
              style={{ fontSize: 'inherit', lineHeight: 'inherit' }}
            >
              Ease
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl leading-relaxed font-light px-4'
          >
            Experience the next generation of{' '}
            <span className='text-gradient-secondary font-semibold'>
              job applications
            </span>{' '}
            with AI-powered matching, immersive design, and{' '}
            <span className='text-gradient font-semibold'>Gen Z vibes</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 sm:mb-20'
          >
            <MagneticButton className='btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 flex items-center gap-3 group min-w-[180px] sm:min-w-[200px] justify-center'>
              Start Your Journey
              <ArrowRight className='w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform' />
            </MagneticButton>

            <MagneticButton className='glass px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-medium interactive group min-w-[180px] sm:min-w-[200px] justify-center flex items-center gap-2 backdrop-blur-sm border border-white/20'>
              Watch Demo
              <motion.div
                className='w-2 h-2 bg-red-500 rounded-full'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </MagneticButton>
          </motion.div>

        </motion.div>
      </div>

      {/* Floating Shapes */}
      <div className='absolute inset-0 -z-10 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute top-1/4 left-10 w-16 h-16 morphing-blob opacity-40 hidden lg:block'
          style={{
            background: 'var(--gradient-tertiary)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className='absolute bottom-1/4 right-16 w-12 h-12 morphing-blob opacity-40 hidden md:block'
          style={{
            background: 'var(--gradient-secondary)',
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.div
          className='absolute top-1/2 right-10 w-8 h-8 morphing-blob opacity-30 hidden xl:block'
          style={{
            background: 'var(--gradient-primary)',
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </section>
  )
}

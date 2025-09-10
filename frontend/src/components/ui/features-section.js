'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Rocket, Shield, Sparkles, Target, Zap } from 'lucide-react'

export function FeaturesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description:
        'Our advanced AI analyzes your skills and matches you with the perfect opportunities.',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0,
    },
    {
      icon: Rocket,
      title: 'Instant Applications',
      description:
        'Apply to multiple jobs with one click. We handle the paperwork, you focus on success.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description:
        'Your data is encrypted and secure. We believe in sustainable, ethical technology.',
      gradient: 'from-green-500 to-emerald-500',
      delay: 0.2,
    },
    {
      icon: Target,
      title: 'Smart Targeting',
      description:
        'Get matched with companies that align with your values and career goals.',
      gradient: 'from-orange-500 to-red-500',
      delay: 0.3,
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Experience blazing-fast performance with our cutting-edge tech stack.',
      gradient: 'from-yellow-500 to-orange-500',
      delay: 0.4,
    },
    {
      icon: Sparkles,
      title: 'Gen Z Experience',
      description:
        'Built by Gen Z, for Gen Z. Intuitive, beautiful, and authentically you.',
      gradient: 'from-indigo-500 to-purple-500',
      delay: 0.5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section ref={ref} className='section px-container relative'>
      {/* Background Pattern */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/20 to-transparent dark:via-purple-900/10' />
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className='container'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <h2 className='display-text text-5xl md:text-6xl mb-6'>
            <span className='text-gradient'>Superpowers</span> for Job Seekers
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Discover features designed to give you an unfair advantage in
            today's competitive job market
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className='group relative'
              whileHover={{
                y: -10,
                rotateY: 5,
                rotateX: 5,
              }}
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <div className='card-3d glass p-8 h-full relative overflow-hidden'>
                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 relative`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className='w-full h-full text-white' />
                  <motion.div
                    className='absolute inset-0 rounded-2xl'
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`,
                    }}
                    animate={{
                      x: [-100, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Content */}
                <h3 className='text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300'>
                  {feature.title}
                </h3>

                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {feature.description}
                </p>

                {/* Floating Particles */}
                <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <motion.div
                    className='w-2 h-2 bg-yellow-400 rounded-full'
                    animate={{
                      y: [0, -20, 0],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>

                {/* Interactive Border */}
                <div className='absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300' />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center mt-20'
        >
          <motion.button
            className='btn-primary text-lg px-10 py-5 relative overflow-hidden group'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-10'>Explore All Features</span>
            <motion.div
              className='absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

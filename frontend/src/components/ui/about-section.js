'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star, Quote, Users, TrendingUp, Award, Coffee } from 'lucide-react'

export function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Job Seekers',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'Success Rate',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      value: '500+',
      label: 'Partner Companies',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Coffee,
      value: '24/7',
      label: 'AI Support',
      color: 'from-orange-500 to-red-500',
    },
  ]

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Software Engineer',
      company: 'TechFlow',
      avatar: '👨‍💻',
      content:
        'ApplyEase matched me with my dream job in 2 weeks! The AI understood exactly what I was looking for.',
      rating: 5,
    },
    {
      name: 'Zara Williams',
      role: 'UX Designer',
      company: 'CreativeHub',
      avatar: '👩‍🎨',
      content:
        'The interface is so intuitive and beautiful. It actually makes job hunting fun! Love the Gen Z vibe.',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Scientist',
      company: 'DataMind',
      avatar: '👨‍🔬',
      content:
        'The AI recommendations were spot-on. Found a role that perfectly matches my skills and values.',
      rating: 5,
    },
  ]

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
    hidden: { y: 50, opacity: 0 },
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
    <section
      ref={ref}
      className='section px-container relative overflow-hidden'
    >
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/50' />
      </div>

      <div className='container'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <h2 className='display-text text-5xl md:text-6xl mb-6'>
            Built by <span className='text-gradient'>Gen Z</span>, for{' '}
            <span className='text-gradient-secondary'>Gen Z</span>
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            We understand what it's like to navigate today's job market. That's
            why we built something different.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate={inView ? 'visible' : 'hidden'}
          className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-20'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='text-center group'
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} p-4 group-hover:shadow-lg transition-shadow`}
              >
                <stat.icon className='w-full h-full text-white' />
              </div>
              <motion.div
                className='text-3xl md:text-4xl font-bold text-gradient mb-2'
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                }}
              >
                {stat.value}
              </motion.div>
              <div className='text-gray-600 dark:text-gray-300 font-medium'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mb-20'
        >
          <h3 className='text-3xl md:text-4xl font-bold text-center mb-16'>
            What our community says
          </h3>

          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className='glass p-8 rounded-2xl relative group'
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Quote Icon */}
                <Quote className='w-8 h-8 text-purple-500 mb-4 opacity-50' />

                {/* Rating */}
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-4 h-4 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>

                {/* Content */}
                <p className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl'>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className='font-bold text-lg text-foreground dark:text-white'>
                      {testimonial.name}
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-300 font-medium'>
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='text-center max-w-4xl mx-auto'
        >
          <div className='glass p-12 rounded-3xl relative overflow-hidden'>
            <div className='relative z-10'>
              <h3 className='text-3xl md:text-4xl font-bold mb-6'>
                Our <span className='text-gradient'>Mission</span>
              </h3>
              <p className='text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8'>
                We believe job searching shouldn't be a soul-crushing
                experience. Using sustainable technology and authentic design,
                we're building a platform that respects your time, values your
                uniqueness, and actually gets you hired. No corporate BS, just
                results.
              </p>
              <div className='flex flex-wrap justify-center gap-4 text-sm'>
                <span className='px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full'>
                  🌱 Carbon Neutral
                </span>
                <span className='px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full'>
                  🔒 Privacy First
                </span>
                <span className='px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full'>
                  ✨ Authentically Gen Z
                </span>
                <span className='px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full'>
                  🚀 AI-Powered
                </span>
              </div>
            </div>

            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-5'>
              <div
                className='absolute inset-0'
                style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(99, 102, 241, 0.3) 1px, transparent 0)`,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Shapes */}
      <motion.div
        className='absolute top-20 left-10 w-32 h-32 morphing-blob opacity-10'
        style={{ background: 'var(--gradient-primary)' }}
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className='absolute bottom-20 right-10 w-24 h-24 morphing-blob opacity-10'
        style={{ background: 'var(--gradient-secondary)' }}
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />
    </section>
  )
}

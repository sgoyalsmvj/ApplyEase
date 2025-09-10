'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Heart,
  Leaf,
  Mail,
  MapPin,
} from 'lucide-react'

export function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const socialLinks = [
    {
      icon: Twitter,
      href: '#',
      label: 'Twitter',
      color: 'hover:text-blue-400',
    },
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram',
      color: 'hover:text-pink-400',
    },
    {
      icon: Linkedin,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-400' },
  ]

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'AI Assistant', href: '#ai' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'API', href: '#api' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Blog', href: '#blog' },
        { label: 'Press', href: '#press' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Community', href: '#community' },
        { label: 'Contact', href: '#contact' },
        { label: 'Status', href: '#status' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' },
      ],
    },
  ]

  return (
    <footer ref={ref} className='section px-container relative overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent dark:from-black dark:via-gray-900' />
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className='container'>
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16'
        >
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <motion.div
              className='flex items-center gap-3 mb-6'
              whileHover={{ scale: 1.05 }}
            >
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>A</span>
              </div>
              <span className='font-bold text-2xl text-gradient'>
                ApplyEase
              </span>
            </motion.div>

            <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
              Revolutionizing job applications with AI-powered matching and Gen
              Z design. Built with sustainability and authenticity in mind.
            </p>

            {/* Contact Info */}
            <div className='space-y-3 mb-6'>
              <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
                <Mail className='w-4 h-4' />
                <span>hello@applyease.com</span>
              </div>
              <div className='flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300'>
                <MapPin className='w-4 h-4' />
                <span>Remote-first, Global team</span>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex items-center gap-4'>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-white/10 dark:bg-gray-800/50 flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transition-colors interactive`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className='w-5 h-5' />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.1 * (sectionIndex + 1) }}
            >
              <h3 className='font-bold text-xl mb-4 text-foreground dark:text-white'>
                {section.title}
              </h3>
              <ul className='space-y-3'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className='text-gray-600 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors interactive font-medium'
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='glass rounded-2xl p-8 mb-16'
        >
          <div className='text-center max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold mb-4'>Stay in the Loop</h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6'>
              Get the latest updates on new features, job market trends, and
              career tips.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-1 px-4 py-3 rounded-xl bg-white/20 dark:bg-gray-800/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400'
              />
              <motion.button
                className='btn-primary px-6 py-3 whitespace-nowrap'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className='pt-8 border-t border-white/20 dark:border-gray-800'
        >
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
              <span>© 2025 ApplyEase. Made with</span>
              <Heart className='w-4 h-4 text-red-500 animate-pulse' />
              <span>and</span>
              <Leaf className='w-4 h-4 text-green-500' />
              <span>by Gen Z</span>
            </div>

            <div className='flex items-center gap-6 text-sm'>
              <motion.a
                href='#sustainability'
                className='text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors flex items-center gap-2 interactive'
                whileHover={{ scale: 1.05 }}
              >
                <Leaf className='w-4 h-4' />
                Carbon Neutral
              </motion.a>
              <span className='text-gray-600 dark:text-gray-300'>
                🌍 Built for a better future
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className='absolute top-10 right-10 w-20 h-20 morphing-blob opacity-20'
        style={{ background: 'var(--gradient-tertiary)' }}
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
    </footer>
  )
}

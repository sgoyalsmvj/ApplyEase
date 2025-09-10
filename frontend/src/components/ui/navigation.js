'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X, Home, User, Briefcase, MessageCircle } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { MagneticButton } from './magnetic-button'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Briefcase, label: 'Features', href: '#features' },
    { icon: MessageCircle, label: 'AI Assistant', href: '#ai' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='fixed top-0 left-0 right-0 z-50 px-container py-4'
      >
        <div className='container'>
          <div className='glass rounded-2xl px-6 py-3 flex items-center justify-between'>
            {/* Logo */}
            <motion.div
              className='flex items-center gap-3'
              whileHover={{ scale: 1.05 }}
            >
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>A</span>
              </div>
              <span className='font-bold text-xl text-gradient'>ApplyEase</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className='hidden md:flex items-center gap-8'>
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className='flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors interactive'
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <item.icon className='w-4 h-4' />
                  <span className='font-medium'>{item.label}</span>
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-4'>
              <ThemeToggle />

              <MagneticButton className='hidden md:block btn-primary px-6 py-2'>
                Get Started
              </MagneticButton>

              {/* Mobile Menu Button */}
              <motion.button
                className='md:hidden w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center interactive'
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode='wait'>
                  {isOpen ? (
                    <motion.div
                      key='close'
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className='w-5 h-5' />
                    </motion.div>
                  ) : (
                    <motion.div
                      key='menu'
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className='w-5 h-5' />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='fixed top-20 left-0 right-0 z-40 md:hidden px-container'
          >
            <div className='glass rounded-2xl p-6 space-y-4'>
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className='flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-3 px-4 rounded-xl hover:bg-white/10 interactive'
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <item.icon className='w-5 h-5' />
                  <span className='font-medium'>{item.label}</span>
                </motion.a>
              ))}

              <div className='pt-4 border-t border-white/20'>
                <MagneticButton className='w-full btn-primary py-3 justify-center'>
                  Get Started
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden'
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

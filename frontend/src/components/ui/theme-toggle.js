'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../providers/theme-provider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className='relative w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 interactive'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className='w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center justify-center'
        animate={{
          x: theme === 'dark' ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <Moon className='w-4 h-4 text-blue-400' />
          ) : (
            <Sun className='w-4 h-4 text-yellow-500' />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = e => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = e => {
      if (
        e.target &&
        typeof e.target.matches === 'function' &&
        e.target.matches('button, a, .interactive')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = e => {
      if (
        e.target &&
        typeof e.target.matches === 'function' &&
        e.target.matches('button, a, .interactive')
      ) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return (
    <motion.div
      className='custom-cursor'
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 2 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
      style={{
        background: isHovering
          ? 'var(--gradient-secondary)'
          : 'var(--gradient-primary)',
      }}
    />
  )
}

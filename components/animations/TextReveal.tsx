
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function TextReveal({ children, delay = 0, className = '' }: TextRevealProps) {
  const text = typeof children === 'string' ? children : ''
  
  if (typeof children !== 'string') {
    return <div className={className}>{children}</div>
  }

  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    })
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20
    }
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

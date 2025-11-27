
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassmorphCardProps {
  children: ReactNode
  className?: string
  hoverScale?: boolean
}

export function GlassmorphCard({ children, className = '', hoverScale = true }: GlassmorphCardProps) {
  return (
    <motion.div
      whileHover={hoverScale ? { 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
      className={cn(
        "relative backdrop-blur-lg bg-white/60 border border-white/20 rounded-3xl shadow-xl",
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-50",
        "hover:shadow-2xl hover:border-white/40 transition-all duration-300",
        className
      )}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  )
}

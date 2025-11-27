
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ModernContentProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

export function ModernContent({ title, icon, children }: ModernContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4">
          <div className="w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex items-start gap-6">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl">
            {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-white" })}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <div className="h-1 w-20 bg-purple-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-purple-900 prose-ul:text-gray-600">
        {children}
      </div>
    </motion.div>
  )
}

// Helper components for rich content
export const SectionCard = ({ title, children, color = 'blue' }: { title: string, children: React.ReactNode, color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow' }) => {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    green: 'bg-green-50 border-green-200 text-green-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    orange: 'bg-orange-50 border-orange-200 text-orange-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  }

  return (
    <div className={`p-6 rounded-xl border-2 ${colors[color]} mb-6 not-prose`}>
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        {title}
      </h3>
      <div className="text-gray-700 space-y-2">
        {children}
      </div>
    </div>
  )
}

export const InfoBox = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 my-6 flex gap-4 not-prose">
    {icon && <div className="text-purple-600 mt-1">{icon}</div>}
    <div className="text-gray-600">
      {children}
    </div>
  </div>
)

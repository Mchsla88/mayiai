
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Info, AlertCircle, Quote, Star, Sparkles } from 'lucide-react'

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
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-1000">
          <div className="w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-20 transform -translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-1000">
          <div className="w-64 h-64 bg-pink-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-inner">
            {React.isValidElement(icon) ? (
               React.cloneElement(icon as React.ReactElement, { className: "w-10 h-10 text-white" })
            ) : icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">{title}</h1>
            <div className="h-1.5 w-24 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-slate-700 prose-strong:text-indigo-900 prose-ul:text-slate-700 prose-li:marker:text-purple-500">
        {children}
      </div>
    </motion.div>
  )
}

// Helper components for rich content
export const SectionCard = ({ title, children, color = 'blue' }: { title: string, children: React.ReactNode, color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow' }) => {
  const styles = {
    blue: { bg: 'bg-blue-50/50', border: 'border-blue-100', title: 'text-blue-700', icon: 'bg-blue-100 text-blue-600' },
    green: { bg: 'bg-emerald-50/50', border: 'border-emerald-100', title: 'text-emerald-700', icon: 'bg-emerald-100 text-emerald-600' },
    purple: { bg: 'bg-purple-50/50', border: 'border-purple-100', title: 'text-purple-700', icon: 'bg-purple-100 text-purple-600' },
    red: { bg: 'bg-rose-50/50', border: 'border-rose-100', title: 'text-rose-700', icon: 'bg-rose-100 text-rose-600' },
    orange: { bg: 'bg-orange-50/50', border: 'border-orange-100', title: 'text-orange-700', icon: 'bg-orange-100 text-orange-600' },
    yellow: { bg: 'bg-amber-50/50', border: 'border-amber-100', title: 'text-amber-700', icon: 'bg-amber-100 text-amber-600' },
  }

  const s = styles[color]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 md:p-8 rounded-3xl border ${s.bg} ${s.border} mb-8 not-prose shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden`}
    >
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-4 flex items-center gap-3 ${s.title}`}>
          <span className={`p-2 rounded-xl ${s.icon}`}>
            <Sparkles className="w-5 h-5" />
          </span>
          {title}
        </h3>
        <div className="text-slate-700 space-y-3 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export const InfoBox = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="bg-white p-6 md:p-8 rounded-3xl shadow-lg shadow-purple-900/5 border border-purple-100 my-8 flex flex-col md:flex-row gap-6 not-prose relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-indigo-500" />
    <div className="shrink-0 flex items-start justify-center">
      <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
        {icon || <Info className="w-6 h-6" />}
      </div>
    </div>
    <div className="text-slate-600 leading-relaxed max-w-3xl">
      {children}
    </div>
  </motion.div>
)


'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Info, Sparkles } from 'lucide-react'

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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-10"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl overflow-hidden relative group border border-white/10">
        <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition-transform duration-[2s]">
          <div className="w-96 h-96 bg-white rounded-full blur-[100px]" />
        </div>
        <div className="absolute bottom-0 left-0 p-8 opacity-20 transform -translate-x-1/3 translate-y-1/3 group-hover:scale-110 transition-transform duration-[2s]">
          <div className="w-80 h-80 bg-pink-400 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-inner group-hover:bg-white/20 transition-colors duration-500">
            {React.isValidElement(icon) ? (
               React.cloneElement(icon as React.ReactElement, { className: "w-12 h-12 text-white" })
            ) : icon}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg">{title}</h1>
            <div className="flex items-center gap-3">
               <div className="h-1.5 w-12 bg-white/30 rounded-full" />
               <div className="h-1.5 w-24 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full" />
               <div className="h-1.5 w-6 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="prose prose-lg max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-indigo-900 prose-ul:text-slate-600 prose-li:marker:text-purple-500">
        {children}
      </div>
    </motion.div>
  )
}

// Helper components for rich content
export const SectionCard = ({ title, children, color = 'blue' }: { title: string, children: React.ReactNode, color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'yellow' }) => {
  const styles = {
    blue: { bg: 'bg-indigo-50/50', border: 'border-indigo-100', title: 'text-indigo-800', icon: 'bg-indigo-100/80 text-indigo-600', gradient: 'from-indigo-500 to-blue-500' },
    green: { bg: 'bg-emerald-50/50', border: 'border-emerald-100', title: 'text-emerald-800', icon: 'bg-emerald-100/80 text-emerald-600', gradient: 'from-emerald-500 to-teal-500' },
    purple: { bg: 'bg-purple-50/50', border: 'border-purple-100', title: 'text-purple-800', icon: 'bg-purple-100/80 text-purple-600', gradient: 'from-purple-500 to-violet-500' },
    red: { bg: 'bg-rose-50/50', border: 'border-rose-100', title: 'text-rose-800', icon: 'bg-rose-100/80 text-rose-600', gradient: 'from-rose-500 to-red-500' },
    orange: { bg: 'bg-orange-50/50', border: 'border-orange-100', title: 'text-orange-800', icon: 'bg-orange-100/80 text-orange-600', gradient: 'from-orange-500 to-amber-500' },
    yellow: { bg: 'bg-amber-50/50', border: 'border-amber-100', title: 'text-amber-800', icon: 'bg-amber-100/80 text-amber-600', gradient: 'from-amber-500 to-yellow-500' },
  }

  const s = styles[color]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      className={`p-8 rounded-[2rem] border ${s.bg} ${s.border} mb-10 not-prose shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-300 relative overflow-hidden group bg-white`}
    >
      <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${s.gradient} opacity-80`} />
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-bl-full transition-opacity duration-500`} />
      
      <div className="relative z-10 pl-6">
        <h3 className={`text-2xl font-bold mb-6 flex items-center gap-4 ${s.title}`}>
          <div className={`p-3 rounded-2xl ${s.icon} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <Sparkles className="w-6 h-6" />
          </div>
          {title}
        </h3>
        <div className="text-slate-600 space-y-4 leading-relaxed text-lg">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export const InfoBox = ({ children, icon }: { children: React.ReactNode, icon?: React.ReactNode }) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-[2rem] shadow-xl shadow-purple-900/5 border border-purple-100 my-10 flex flex-col md:flex-row gap-8 not-prose relative overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-50 rounded-full blur-3xl group-hover:bg-purple-100 transition-colors duration-500" />
    
    <div className="shrink-0 flex items-start justify-center relative z-10">
      <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ring-1 ring-purple-100">
        {icon || <Info className="w-8 h-8" />}
      </div>
    </div>
    <div className="text-slate-600 leading-relaxed max-w-4xl text-lg relative z-10 flex items-center">
      <div>{children}</div>
    </div>
  </motion.div>
)

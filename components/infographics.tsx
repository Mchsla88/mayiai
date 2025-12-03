'use client'

import { motion } from 'framer-motion'
import { 
  Brain, 
  Image as ImageIcon, 
  Sparkles, 
  Shield, 
  Lock, 
  Users,
  User, 
  Eye, 
  Palette, 
  Microscope, 
  Gamepad2, 
  Music, 
  Video,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Heart,
  BookOpen
} from 'lucide-react'

// --- 1. AI Process Flow Animation ---
export function AiProcessFlow() {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Step 1: Input */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mb-3 shadow-md">
            <div className="grid grid-cols-2 gap-2">
              <ImageIcon className="w-6 h-6 text-blue-500" />
              <ImageIcon className="w-6 h-6 text-blue-400" />
              <ImageIcon className="w-6 h-6 text-blue-600" />
              <ImageIcon className="w-6 h-6 text-blue-300" />
            </div>
          </div>
          <span className="font-bold text-blue-800">1. Miliony Obrazków</span>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 md:rotate-0" />
        </motion.div>

        {/* Step 2: AI Brain */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center relative"
        >
          <div className="w-32 h-32 bg-purple-600 rounded-full flex items-center justify-center mb-3 shadow-xl z-10 relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-purple-600 opacity-50"
            />
            <Brain className="w-16 h-16 text-white z-10" />
          </div>
          <span className="font-bold text-purple-800">2. Mózg AI (Uczenie)</span>
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 100, 
                y: (Math.random() - 0.5) * 100, 
                opacity: [0, 1, 0] 
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>

        {/* Arrow 2 */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7, repeat: Infinity, repeatDelay: 2 }}
        >
          <ArrowRight className="w-8 h-8 text-gray-400 rotate-90 md:rotate-0" />
        </motion.div>

        {/* Step 3: Output */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-400 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <span className="font-bold text-pink-600">3. Nowe Dzieło!</span>
        </motion.div>
      </div>
    </div>
  )
}

// --- 2. Safety Shield Animation ---
export function SafetyShield() {
  return (
    <div className="py-8 flex justify-center">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Central Shield */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="z-20"
        >
          <Shield className="w-24 h-24 text-red-600 fill-red-100" />
        </motion.div>

        {/* Orbiting Satellites */}
        {[
          { icon: Lock, color: "bg-blue-500", label: "Prywatność", angle: 0 },
          { icon: Users, color: "bg-green-500", label: "Rodzice", angle: 120 },
          { icon: Eye, color: "bg-purple-500", label: "Czujność", angle: 240 }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ rotate: item.angle }}
            animate={{ rotate: item.angle + 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ width: '100%', height: '100%' }}
          >
            <motion.div 
              className={`absolute top-0 left-1/2 -ml-6 w-12 h-12 ${item.color} rounded-full flex items-center justify-center shadow-lg text-white`}
              style={{ transformOrigin: '50% 150px' }} // Orbit radius hack
            >
              <item.icon className="w-6 h-6" />
            </motion.div>
          </motion.div>
        ))}
        
        {/* Pulsing Rings */}
        <motion.div
          className="absolute inset-0 border-4 border-red-200 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  )
}

// --- 3. Creator Type Cards ---
export function CreatorCards() {
  const types = [
    { title: "Artysta", icon: Palette, color: "from-pink-500 to-rose-500", desc: "Rysujesz, malujesz, tworzysz!" },
    { title: "Naukowiec", icon: Microscope, color: "from-blue-500 to-cyan-500", desc: "Eksperymenty i ciekawostki." },
    { title: "Gamer", icon: Gamepad2, color: "from-purple-500 to-indigo-500", desc: "Gry i wirtualne światy." },
    { title: "Muzyk", icon: Music, color: "from-yellow-400 to-orange-500", desc: "Dźwięki i melodie." },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
      {types.map((type, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, scale: 1.05 }}
          className={`bg-gradient-to-br ${type.color} p-4 rounded-xl text-white shadow-lg cursor-pointer`}
        >
          <div className="bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm">
            <type.icon className="w-6 h-6" />
          </div>
          <h4 className="font-bold mb-1">{type.title}</h4>
          <p className="text-xs opacity-90">{type.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

// --- 4. Interactive Checklist ---
export function InteractiveChecklist({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:border-green-400 transition-colors cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500 group-hover:bg-green-50 flex items-center justify-center transition-all">
            <motion.div 
              className="w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100" 
              layoutId="check"
            />
          </div>
          <span className="text-gray-700 group-hover:text-gray-900 font-medium">{item}</span>
        </motion.div>
      ))}
    </div>
  )
}

// --- 5. Comparison Scale (Good vs Bad) ---
export function ComparisonScale() {
  return (
    <div className="grid md:grid-cols-2 gap-6 py-6">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-green-50 border-2 border-green-200 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-green-200 px-3 py-1 rounded-bl-lg text-green-800 font-bold text-xs">TAK!</div>
        <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Prawdziwy Influencer
        </h4>
        <ul className="space-y-3">
          {[
            { icon: Heart, text: "Kocha to, co robi" },
            { icon: Sparkles, text: "Inspiruje innych" },
            { icon: Users, text: "Buduje przyjaźnie" }
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-green-800">
              <div className="bg-white p-1 rounded-full"><item.icon className="w-4 h-4" /></div>
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-red-50 border-2 border-red-200 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-red-200 px-3 py-1 rounded-bl-lg text-red-800 font-bold text-xs">NIE!</div>
        <h4 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" /> To NIE jest to
        </h4>
        <ul className="space-y-3">
          {[
            { text: "Tylko dla lajków" },
            { text: "Udawanie kogoś innego" },
            { text: "Bycie sławnym za wszelką cenę" }
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-red-800">
              <div className="bg-white p-1 rounded-full text-red-500">❌</div>
              <span className="font-medium">{item.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}

// --- 6. Platform Grid ---
export function PlatformGrid() {
  const platforms = [
    { name: "YouTube Kids", color: "bg-red-500", icon: Video, desc: "Twoja bezpieczna telewizja" },
    { name: "Roblox", color: "bg-gray-800", icon: Gamepad2, desc: "Buduj własne światy" },
    { name: "Messenger Kids", color: "bg-blue-500", icon: Users, desc: "Rozmowy z przyjaciółmi" }
  ]

  return (
    <div className="grid gap-4 py-4">
      {platforms.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`${p.color} w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg`}>
            <p.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-lg">{p.name}</h4>
            <p className="text-sm text-gray-500">{p.desc}</p>
          </div>
          <div className="ml-auto">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Bezpieczne ✅</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// --- 7. Story Profile Card ---
export function StoryProfile({ name, age, hobby, story, color = "blue" }: any) {
  const colorClasses: any = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    green: "bg-green-50 border-green-200 text-green-700"
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl border-2 ${colorClasses[color]} relative mt-8`}
    >
      <div className="absolute -top-6 left-6 w-12 h-12 bg-white rounded-full border-2 border-current flex items-center justify-center shadow-sm">
        <User className="w-6 h-6" />
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-xl mb-1">{name}, {age} lat</h4>
        <div className="inline-block bg-white/50 px-2 py-1 rounded text-xs font-bold mb-4 uppercase tracking-wide">
          Pasja: {hobby}
        </div>
        <p className="text-gray-700 italic leading-relaxed">"{story}"</p>
      </div>
    </motion.div>
  )
}

// --- 8. Visual Calendar ---
export function VisualCalendar() {
  const days = [
    { day: "Pon", task: "Rysowanie", icon: Palette, color: "bg-pink-100 text-pink-700" },
    { day: "Wt", task: "Szkoła", icon: BookOpen, color: "bg-gray-100 text-gray-500" },
    { day: "Śr", task: "Eksperyment", icon: Microscope, color: "bg-blue-100 text-blue-700" },
    { day: "Czw", task: "Szkoła", icon: BookOpen, color: "bg-gray-100 text-gray-500" },
    { day: "Pt", task: "Montaż", icon: Video, color: "bg-purple-100 text-purple-700" },
    { day: "Sob", task: "Publikacja!", icon: Sparkles, color: "bg-yellow-100 text-yellow-700" },
    { day: "Nd", task: "Odpoczynek", icon: Heart, color: "bg-green-100 text-green-700" }
  ]

  return (
    <div className="grid grid-cols-7 gap-2 py-6 overflow-x-auto">
      {days.map((d, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-2 min-w-[60px]"
        >
          <span className="text-xs font-bold text-gray-400 uppercase">{d.day}</span>
          <div className={`w-full aspect-square rounded-xl ${d.color} flex flex-col items-center justify-center p-2 text-center shadow-sm`}>
            <d.icon className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-bold leading-tight">{d.task}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

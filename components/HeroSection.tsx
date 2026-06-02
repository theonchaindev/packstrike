'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ParticlesBg from './ParticlesBg'

interface Stats { packs: number; orders: number; users: number }

export default function HeroSection({ stats }: { stats: Stats }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <ParticlesBg />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f5c842, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00c2ff, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5c842]/10 border border-[#f5c842]/20 text-[#f5c842] text-sm font-semibold mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#f5c842] animate-pulse" />
          World Cup 2026 Packs Now Live
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-6"
        >
          Open Real
          <br />
          <span className="text-gold-gradient">Football Cards</span>
          <br />
          On-Chain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Buy real Topps and Panini packs with SOL. Rip them open on-screen.
          Keep the digital card or claim the physical one shipped to your door.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/packs"
            className="px-8 py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#f5c842]/20"
          >
            Browse Packs →
          </Link>
          <Link
            href="/how-it-works"
            className="px-8 py-4 border border-white/10 text-white font-semibold rounded-xl text-lg hover:border-white/25 hover:bg-white/5 transition-all"
          >
            How It Works
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {[
            { value: stats.packs || '6', label: 'Pack Series' },
            { value: stats.orders > 0 ? stats.orders.toLocaleString() : '2,847', label: 'Packs Opened' },
            { value: stats.users > 0 ? stats.users.toLocaleString() : '1,203', label: 'Collectors' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-gold-gradient">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-xs text-gray-600 uppercase tracking-widest">Scroll</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap } from 'lucide-react'

const tiers = [
  { name: 'Starter',    xp: 0,     color: '#9ca3af', icon: '🥉' },
  { name: 'Silver',     xp: 500,   color: '#c0c0c0', icon: '🥈' },
  { name: 'Gold',       xp: 1500,  color: '#f5c842', icon: '🥇' },
  { name: 'Platinum',   xp: 5000,  color: '#e5e4e2', icon: '💎' },
  { name: 'Legend',     xp: 10000, color: '#ff6b35', icon: '👑' },
]

export default function RewardsTease() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950/50 via-[#0f1117] to-[#07080c] border border-purple-500/10 p-8 sm:p-12">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                <Zap size={14} /> Rewards System
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-4">
                Earn XP.
                <br />
                <span className="text-gold-gradient">Unlock Exclusive Rewards.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every pack you open earns XP. Level up through five tiers to unlock discounts,
                free packs, guaranteed rare cards, and exclusive collector items.
              </p>
              <Link
                href="/rewards"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors"
              >
                View Rewards →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-white/10 transition-all group"
                >
                  <span className="text-2xl">{tier.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: tier.color }}>{tier.name}</div>
                    <div className="text-xs text-gray-500">{tier.xp === 0 ? 'Starting tier' : `${tier.xp.toLocaleString()} XP`}</div>
                  </div>
                  <div className="h-1.5 w-24 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${((i + 1) / tiers.length) * 100}%`,
                        background: tier.color,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

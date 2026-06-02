'use client'

import { motion } from 'framer-motion'
import PackCard from '@/components/PackCard'
import ParticlesBg from '@/components/ParticlesBg'

interface Pack {
  id: string
  name: string
  series: string
  edition: string
  description: string
  price: number
  solPrice: number
  imageUrl: string
  rarity: string
  stock: number
  sold: number
  isFeatured: boolean
  isWorldCup: boolean
  xpReward: number
}

const groups = [
  { group: 'Group A', teams: ['🇧🇷 Brazil', '🇩🇪 Germany', '🇯🇵 Japan', '🇲🇽 Mexico'] },
  { group: 'Group B', teams: ['🇦🇷 Argentina', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', '🇳🇱 Netherlands', '🇸🇳 Senegal'] },
  { group: 'Group C', teams: ['🇫🇷 France', '🇵🇹 Portugal', '🇪🇸 Spain', '🇭🇷 Croatia'] },
  { group: 'Group D', teams: ['🇺🇸 USA', '🇧🇪 Belgium', '🇨🇦 Canada', '🇲🇦 Morocco'] },
]

export default function WorldCupClient({ packs }: { packs: Pack[] }) {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-24 px-4 sm:px-6">
        <ParticlesBg />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 to-[#07080c]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl mb-6"
          >
            🏆
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black mb-4"
          >
            FIFA World Cup
            <span className="block text-gold-gradient">2026</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Exclusive World Cup 2026 collections. Chase rare Prizm parallels of the tournament&apos;s
            biggest stars. Limited stock — once sold, gone forever.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {/* Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-black mb-6">World Cup Packs</h2>
          {packs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No World Cup packs available yet</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {packs.map((pack, i) => (
                <PackCard key={pack.id} pack={pack} index={i} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Groups */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-black mb-6">Tournament Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map(({ group, teams }, i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl bg-[#0f1117] border border-white/5"
              >
                <div className="text-xs font-bold text-[#f5c842] uppercase tracking-wider mb-3">{group}</div>
                <ul className="space-y-2">
                  {teams.map(team => (
                    <li key={team} className="text-sm text-gray-300">{team}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

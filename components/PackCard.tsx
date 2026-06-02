'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Star } from 'lucide-react'

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

const rarityConfig: Record<string, { label: string; color: string; glow: string; badge: string }> = {
  standard: { label: 'Standard', color: '#9ca3af', glow: 'rgba(156,163,175,0.15)', badge: 'bg-gray-700 text-gray-300' },
  premium: { label: 'Premium', color: '#f5c842', glow: 'rgba(245,200,66,0.2)', badge: 'bg-yellow-900/50 text-yellow-300' },
  elite: { label: 'Elite', color: '#a78bfa', glow: 'rgba(167,139,250,0.2)', badge: 'bg-purple-900/50 text-purple-300' },
}

export default function PackCard({ pack, index = 0 }: { pack: Pack; index?: number }) {
  const rarity = rarityConfig[pack.rarity] || rarityConfig.standard
  const stockPct = Math.max(0, Math.min(100, ((pack.stock - pack.sold) / pack.stock) * 100))
  const remaining = pack.stock - pack.sold

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/packs/${pack.id}`} className="block group">
        <div
          className="relative overflow-hidden rounded-2xl bg-[#0f1117] border border-white/5 transition-all duration-300 group-hover:border-white/15"
          style={{
            boxShadow: `0 4px 30px ${rarity.glow}`,
          }}
        >
          {/* Pack image */}
          <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1a1d26] to-[#0f1117] overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: `radial-gradient(circle at 50% 50%, ${rarity.glow} 0%, transparent 70%)` }}
            >
              {/* Placeholder — in prod use next/image */}
              <div className="text-center px-6">
                <div className="text-6xl mb-3">⚽</div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{pack.series}</div>
              </div>
            </div>

            {/* Shimmer overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {pack.isFeatured && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-[#f5c842]/10 border border-[#f5c842]/20 text-[#f5c842] text-xs font-semibold rounded-full backdrop-blur-sm">
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}
              {pack.isWorldCup && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full backdrop-blur-sm">
                  🏆 World Cup
                </span>
              )}
            </div>

            <div className="absolute top-3 right-3">
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${rarity.badge}`}>
                {rarity.label}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">{pack.edition}</div>
            <h3 className="font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-[#f5c842] transition-colors">
              {pack.name}
            </h3>

            {/* Stock bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{remaining} left</span>
                <span>{stockPct.toFixed(0)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${stockPct}%`,
                    background: stockPct > 50 ? '#00ff87' : stockPct > 20 ? '#f5c842' : '#ff3b5c',
                  }}
                />
              </div>
            </div>

            {/* Price + XP */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xl font-black text-[#f5c842]">{pack.solPrice} SOL</div>
                <div className="text-xs text-gray-500">≈ £{pack.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-purple-400 font-medium">
                <Zap size={12} />
                +{pack.xpReward} XP
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

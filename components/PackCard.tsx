'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, Star } from 'lucide-react'
import PackArtwork from './PackArtwork'

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
  standard: { label: 'Standard', color: '#9ca3af', glow: 'rgba(156,163,175,0.12)', badge: 'bg-gray-800 text-gray-300' },
  premium:  { label: 'Premium',  color: '#f5c842', glow: 'rgba(245,200,66,0.18)',  badge: 'bg-yellow-900/60 text-yellow-300' },
  elite:    { label: 'Elite',    color: '#a78bfa', glow: 'rgba(167,139,250,0.18)', badge: 'bg-purple-900/60 text-purple-300' },
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
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/packs/${pack.id}`} className="block">
        <div
          className="relative overflow-hidden rounded-2xl bg-[#0f1117] border border-white/5 transition-all duration-300 group-hover:border-white/15"
          style={{ boxShadow: `0 4px 30px ${rarity.glow}` }}
        >
          {/* Pack artwork */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <PackArtwork
              series={pack.series}
              edition={pack.edition}
              name={pack.name}
              rarity={pack.rarity}
              isWorldCup={pack.isWorldCup}
              size="sm"
              animated={false}
            />

            {/* Hover shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
              }}
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 0.6 }}
            />

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
              {pack.isFeatured && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-[#f5c842]/25 text-[#f5c842] text-[10px] font-bold rounded-full">
                  <Star size={8} fill="currentColor" /> Featured
                </span>
              )}
              {pack.isWorldCup && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-blue-500/25 text-blue-300 text-[10px] font-bold rounded-full">
                  🏆 WC
                </span>
              )}
            </div>

            <div className="absolute top-2.5 right-2.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm ${rarity.badge}`}>
                {rarity.label}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-3.5">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mb-0.5 truncate">{pack.edition}</div>
            <h3 className="font-bold text-sm leading-tight mb-2.5 line-clamp-1 group-hover:text-[#f5c842] transition-colors duration-200">
              {pack.name}
            </h3>

            {/* Stock */}
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                <span>{remaining} left</span>
                <span>{stockPct < 20 ? '🔥' : ''} {stockPct.toFixed(0)}%</span>
              </div>
              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${stockPct}%`,
                    background: stockPct < 20 ? '#ff3b5c' : stockPct < 50 ? '#f5c842' : '#00ff87',
                  }}
                />
              </div>
            </div>

            {/* Price + XP */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-lg font-black text-[#f5c842]">{pack.solPrice} SOL</div>
                <div className="text-[10px] text-gray-600">≈ £{pack.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-purple-400 font-semibold">
                <Zap size={10} />+{pack.xpReward}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

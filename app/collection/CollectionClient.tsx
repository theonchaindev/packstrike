'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap } from 'lucide-react'

const rarityConfig: Record<string, { label: string; color: string; border: string }> = {
  common:    { label: 'Common',    color: '#9ca3af', border: 'border-gray-700' },
  uncommon:  { label: 'Uncommon', color: '#34d399', border: 'border-emerald-800' },
  rare:      { label: 'Rare',     color: '#60a5fa', border: 'border-blue-800' },
  epic:      { label: 'Epic',     color: '#a78bfa', border: 'border-purple-800' },
  legendary: { label: 'Legendary',color: '#f5c842', border: 'border-yellow-700' },
}

interface UserCard {
  id: string
  redeemed: boolean
  card: {
    id: string
    player: string
    team: string
    league: string
    rarity: string
    cashValue: number
    series: string
    number: number | null
    totalPrint: number | null
  }
}

interface User {
  xpPoints: number
  level: number
}

export default function CollectionClient({ cards, user }: { cards: UserCard[]; user: User }) {
  const [filter, setFilter] = useState('all')
  const rarities = ['all', 'legendary', 'epic', 'rare', 'uncommon', 'common']

  const filtered = filter === 'all' ? cards : cards.filter(c => c.card.rarity === filter)
  const totalValue = cards.reduce((sum, c) => sum + c.card.cashValue, 0)
  const unredeemed = cards.filter(c => !c.redeemed)

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-2">Collection</div>
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-4xl font-black">My Cards</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="text-center">
              <div className="font-black text-xl text-[#00ff87]">£{totalValue.toFixed(2)}</div>
              <div className="text-gray-500 text-xs">Total Value</div>
            </div>
            <div className="text-center">
              <div className="font-black text-xl">{cards.length}</div>
              <div className="text-gray-500 text-xs">Cards</div>
            </div>
            <div className="text-center">
              <div className="font-black text-xl flex items-center gap-1">
                <Zap size={16} className="text-purple-400" />
                {user.xpPoints}
              </div>
              <div className="text-gray-500 text-xs">XP</div>
            </div>
          </div>
        </div>

        {/* Rarity filter */}
        <div className="flex gap-2 flex-wrap">
          {rarities.map(r => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                filter === r ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </motion.div>

      {cards.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📦</div>
          <h2 className="text-xl font-bold mb-2">No cards yet</h2>
          <p className="text-gray-500 mb-6">Open your first pack to start your collection.</p>
          <Link href="/packs" className="px-6 py-3 bg-[#f5c842] text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
            Shop Packs →
          </Link>
        </div>
      ) : (
        <>
          {unredeemed.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-[#f5c842]/5 border border-[#f5c842]/15 flex items-center justify-between"
            >
              <div className="text-sm">
                <span className="font-bold text-[#f5c842]">{unredeemed.length} cards</span>
                <span className="text-gray-400"> ready to redeem (cash out or ship)</span>
              </div>
              <Link href="/redeem" className="px-4 py-1.5 bg-[#f5c842] text-black text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
                Redeem →
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((uc, i) => {
              const cfg = rarityConfig[uc.card.rarity] || rarityConfig.common
              return (
                <motion.div
                  key={uc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative p-4 rounded-2xl bg-[#0f1117] border ${cfg.border} cursor-pointer`}
                  style={{ boxShadow: `0 4px 20px ${cfg.color}15` }}
                >
                  {uc.redeemed && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center z-10">
                      <span className="text-xs font-bold text-gray-400 bg-black/80 px-2 py-1 rounded">Redeemed</span>
                    </div>
                  )}
                  <div className="aspect-[3/4] flex flex-col items-center justify-center text-center mb-2">
                    <div className="text-4xl mb-2">⚽</div>
                    <div className="text-xs font-bold leading-tight">{uc.card.player}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{uc.card.team}</div>
                    {uc.card.number && uc.card.totalPrint && (
                      <div className="text-xs font-bold mt-1" style={{ color: cfg.color }}>
                        #{uc.card.number}/{uc.card.totalPrint}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
                    <span className="text-xs text-gray-500">£{uc.card.cashValue}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

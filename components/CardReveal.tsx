'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Card {
  id: string
  player: string
  team: string
  league: string
  rarity: string
  imageUrl: string
  cashValue: number
  series: string
  number?: number | null
  totalPrint?: number | null
  description?: string | null
}

const rarityConfig: Record<string, { label: string; color: string; bg: string; glow: string }> = {
  common:    { label: 'Common',    color: '#9ca3af', bg: 'from-gray-800 to-gray-900',   glow: 'rgba(156,163,175,0.3)' },
  uncommon:  { label: 'Uncommon', color: '#34d399', bg: 'from-emerald-900 to-gray-900', glow: 'rgba(52,211,153,0.4)' },
  rare:      { label: 'Rare',     color: '#60a5fa', bg: 'from-blue-900 to-gray-900',    glow: 'rgba(96,165,250,0.4)' },
  epic:      { label: 'Epic',     color: '#a78bfa', bg: 'from-purple-900 to-gray-900',  glow: 'rgba(167,139,250,0.5)' },
  legendary: { label: 'Legendary',color: '#f5c842', bg: 'from-yellow-900 to-gray-900',  glow: 'rgba(245,200,66,0.6)' },
}

function SingleCard({ card, delay = 0, onReveal }: { card: Card; delay?: number; onReveal?: () => void }) {
  const [flipped, setFlipped] = useState(false)
  const cfg = rarityConfig[card.rarity] || rarityConfig.common

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => { setFlipped(!flipped); onReveal?.() }}
        whileHover={{ scale: 1.03 }}
      >
        {/* Front */}
        <div
          className={`relative w-48 h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${cfg.bg} border border-white/10`}
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: flipped ? `0 0 40px ${cfg.glow}` : `0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          {/* Rarity shimmer for legendary/epic */}
          {(card.rarity === 'legendary' || card.rarity === 'epic') && (
            <div className="absolute inset-0 opacity-30 shimmer pointer-events-none" />
          )}

          {card.rarity === 'legendary' && (
            <div className="absolute inset-0 holo-card opacity-10 pointer-events-none" />
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="text-5xl mb-3">⚽</div>
            <div className="text-lg font-black leading-tight">{card.player}</div>
            <div className="text-xs text-gray-400 mt-1">{card.team}</div>
            <div className="text-xs text-gray-500">{card.league}</div>

            {card.number && card.totalPrint && (
              <div className="mt-2 px-2 py-0.5 bg-black/40 rounded-full text-xs font-bold" style={{ color: cfg.color }}>
                #{card.number}/{card.totalPrint}
              </div>
            )}

            <div className="mt-3 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${cfg.glow}`, color: cfg.color }}>
              {cfg.label}
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 w-48 h-64 rounded-2xl bg-gradient-to-br from-[#1a1d26] to-[#0f1117] border border-white/10 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center p-4">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-sm font-semibold text-gray-400">Cash Value</div>
            <div className="text-2xl font-black text-[#00ff87]">£{card.cashValue.toFixed(2)}</div>
            {card.description && (
              <div className="text-xs text-gray-500 mt-2 leading-relaxed">{card.description}</div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CardReveal({
  cards,
  onComplete,
}: {
  cards: Card[]
  onComplete: () => void
}) {
  const [revealed, setRevealed] = useState(0)
  const totalCashValue = cards.reduce((sum, c) => sum + c.cashValue, 0)

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-gray-400 text-sm">Tap each card to reveal</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card, i) => (
          <SingleCard
            key={card.id}
            card={card}
            delay={i * 0.15}
            onReveal={() => setRevealed(r => Math.min(r + 1, cards.length))}
          />
        ))}
      </div>

      <AnimatePresence>
        {revealed === cards.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="text-center">
              <div className="text-sm text-gray-400">Total Pack Value</div>
              <div className="text-3xl font-black text-[#f5c842]">£{totalCashValue.toFixed(2)}</div>
            </div>
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Add to Collection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

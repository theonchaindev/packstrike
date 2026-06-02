'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RARITY_CONFIG, type CardDef } from '@/lib/packData'

interface TradingCardProps {
  card: CardDef
  faceDown?: boolean
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
}

const TEAM_COLORS: Record<string, [string, string]> = {
  'Real Madrid':       ['#001F5B', '#ffffff'],
  'Barcelona':         ['#A50044', '#004D98'],
  'Manchester City':   ['#6CABDD', '#1C2C5B'],
  'Arsenal':           ['#EF0107', '#063672'],
  'Bayern Munich':     ['#DC052D', '#0066B2'],
  'Liverpool':         ['#C8102E', '#00B2A9'],
  'Chelsea':           ['#034694', '#ffffff'],
  'Bayer Leverkusen':  ['#E32221', '#000000'],
  'Inter Miami':       ['#F7B5CD', '#231F20'],
  'Al Nassr':          ['#FFC200', '#003087'],
  'Various':           ['#1a1d26', '#374151'],
}

function getTeamColors(team: string): [string, string] {
  return TEAM_COLORS[team] || ['#1a1d26', '#374151']
}

export default function TradingCard({ card, faceDown = false, onClick, size = 'md' }: TradingCardProps) {
  const [revealed, setRevealed] = useState(!faceDown)
  const cfg = RARITY_CONFIG[card.rarity]
  const [color1, color2] = getTeamColors(card.team)
  const isHolo = card.rarity === 'legendary' || card.rarity === 'epic'

  const dims = {
    sm: { w: 'w-28', h: 'h-40', text: 'text-[9px]', name: 'text-xs', value: 'text-sm' },
    md: { w: 'w-44', h: 'h-60', text: 'text-[10px]', name: 'text-sm', value: 'text-lg' },
    lg: { w: 'w-52', h: 'h-72', text: 'text-xs',  name: 'text-base', value: 'text-xl' },
  }[size]

  const handleClick = () => {
    if (faceDown && !revealed) {
      setRevealed(true)
      onClick?.()
    } else {
      onClick?.()
    }
  }

  return (
    <div
      className={`relative ${dims.w} ${dims.h} cursor-pointer select-none`}
      style={{ perspective: '800px' }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: revealed ? 0 : 180 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={revealed ? { scale: 1.04, rotateY: 5 } : {}}
      >
        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 rounded-xl overflow-hidden border ${cfg.border}`}
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: revealed ? `0 8px 32px ${cfg.glow}, 0 2px 8px rgba(0,0,0,0.6)` : undefined,
          }}
        >
          {/* Holographic shimmer for legendary/epic */}
          {isHolo && (
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-20"
              style={{
                background: 'linear-gradient(125deg, #ff008055 0%, #ff8c0055 15%, #ffe60055 30%, #00ff8055 45%, #00d4ff55 60%, #8000ff55 75%, #ff008055 90%)',
                backgroundSize: '300% 300%',
                animation: 'holo 4s ease infinite',
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Card art — gradient player silhouette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${color1} 0%, ${color2} 100%)`,
            }}
          >
            {/* Stadium lights pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(ellipse at 30% 20%, white 1px, transparent 1px), radial-gradient(ellipse at 70% 20%, white 1px, transparent 1px)', backgroundSize: '100% 100%' }}
            />

            {/* Player silhouette SVG */}
            <svg viewBox="0 0 100 140" className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4/5 opacity-70">
              <defs>
                <linearGradient id={`cg-${card.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.4)"/>
                </linearGradient>
              </defs>
              {/* Head */}
              <ellipse cx="50" cy="12" rx="10" ry="11" fill={`url(#cg-${card.id})`}/>
              {/* Body */}
              <path d="M36 28 Q50 22 64 28 L68 70 Q50 64 32 70 Z" fill={`url(#cg-${card.id})`}/>
              {/* Left arm raised */}
              <path d="M36 32 Q24 25 16 18 Q13 14 18 13 Q25 20 36 38Z" fill={`url(#cg-${card.id})`}/>
              {/* Right arm */}
              <path d="M64 32 Q76 28 82 38 Q80 44 74 40 Q68 36 64 44Z" fill={`url(#cg-${card.id})`}/>
              {/* Left leg */}
              <path d="M38 68 Q30 88 28 112 Q33 116 40 112 Q46 92 48 70Z" fill={`url(#cg-${card.id})`}/>
              {/* Right leg — kicking */}
              <path d="M62 68 Q68 88 76 108 Q74 115 66 112 Q58 92 52 70Z" fill={`url(#cg-${card.id})`}/>
              {/* Ball */}
              <circle cx="84" cy="114" r="10" fill={`url(#cg-${card.id})`}/>
              <path d="M79 110 L89 110 M84 105 L84 119" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5"/>
            </svg>

            {/* Top fade */}
            <div className="absolute top-0 inset-x-0 h-1/3"
              style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)' }}
            />
            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-2/5"
              style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9), transparent)' }}
            />
          </div>

          {/* Rarity tag — top left */}
          <div className="absolute top-2 left-2 z-20">
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider`}
              style={{ background: cfg.color + '22', color: cfg.color, border: `1px solid ${cfg.color}44` }}
            >
              {cfg.label}
            </span>
          </div>

          {/* Parallel / print run — top right */}
          {card.parallel && (
            <div className="absolute top-2 right-2 z-20">
              <span className="text-[9px] font-bold text-white/70">
                {card.totalPrint ? `/${card.totalPrint}` : card.parallel.split(' ')[0]}
              </span>
            </div>
          )}

          {/* Nation flag */}
          <div className="absolute top-1/3 right-2 z-20 text-base">{card.nation}</div>

          {/* Bottom info */}
          <div className="absolute bottom-0 inset-x-0 z-20 px-2.5 pb-2.5 pt-1">
            <div className={`font-black leading-tight ${dims.name} text-white`}>{card.player}</div>
            <div className={`${dims.text} text-white/60 mt-0.5`}>{card.team}</div>
            {card.parallel && (
              <div className={`${dims.text} mt-1 font-semibold`} style={{ color: cfg.color }}>{card.parallel}</div>
            )}
            <div className={`font-black text-[#00ff87] ${dims.value} mt-1`}>
              £{card.cashValue.toFixed(2)}
            </div>
          </div>

          {/* Border shine */}
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: `inset 0 0 0 1px ${cfg.color}30` }}
          />
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-[#0f1117] border border-white/10 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-black text-sm"
              style={{ background: 'linear-gradient(135deg, #f5c842, #ff6b35)' }}
            >
              PS
            </div>
            <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest">PackStrike</div>
          </div>
          {/* Pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f5c842 0, #f5c842 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }}
          />
          {faceDown && (
            <motion.div
              className="absolute bottom-3 text-[10px] text-white/40 font-medium"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Tap to reveal
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

'use client'

import { useState, useCallback, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getPackById, drawCards, RARITY_CONFIG, type CardDef } from '@/lib/packData'
import PackArtwork from '@/components/PackArtwork'
import PackRipAnimation from '@/components/PackRipAnimation'
import TradingCard from '@/components/TradingCard'
import ParticlesBg from '@/components/ParticlesBg'
import { useDemoMode } from '@/lib/demoMode'

type Phase = 'ready' | 'ripping' | 'reveal'

export default function DemoOpenPage({ params }: { params: Promise<{ packId: string }> }) {
  const { packId } = use(params)
  const router = useRouter()
  const { demoCredits, spendCredit } = useDemoMode()
  const pack = getPackById(packId)
  const [phase, setPhase] = useState<Phase>('ready')
  const [cards, setCards] = useState<CardDef[]>([])
  const [revealedCount, setRevealedCount] = useState(0)

  const onRipComplete = useCallback(() => {
    if (!pack) return
    const drawn = drawCards(pack, pack.cardsPerPack)
    setCards(drawn)
    setPhase('reveal')
  }, [pack])

  const handleStart = () => {
    spendCredit()
    setPhase('ripping')
  }

  if (!pack) {
    return (
      <div className="pt-32 text-center">
        <p className="text-gray-500">Pack not found.</p>
        <Link href="/packs" className="mt-4 inline-block text-[#f5c842]">← Back to packs</Link>
      </div>
    )
  }

  const totalValue = cards.reduce((s, c) => s + c.cashValue, 0)
  const bestCard = cards.length > 0 ? cards.reduce((a, b) => a.cashValue > b.cashValue ? a : b) : null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 bg-[#07080c]">
      <ParticlesBg />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: phase === 'ripping'
            ? 'radial-gradient(circle at 50% 50%, rgba(245,200,66,0.1) 0%, transparent 60%)'
            : phase === 'reveal'
            ? 'radial-gradient(circle at 50% 30%, rgba(0,194,255,0.06) 0%, transparent 60%)'
            : 'none',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        <AnimatePresence mode="wait">

          {/* ── READY ── */}
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold mb-4">
                  🧪 Demo Mode · {demoCredits} pack{demoCredits !== 1 ? 's' : ''} left
                </div>
                <h1 className="text-3xl sm:text-4xl font-black">{pack.name}</h1>
                <p className="text-gray-500 mt-1">{pack.edition} · {pack.cardsPerPack} cards</p>
              </div>

              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={{ width: 220, height: 310 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04, rotate: 2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleStart}
              >
                <PackArtwork
                  series={pack.series} edition={pack.edition}
                  name={pack.name} rarity={pack.rarity}
                  isWorldCup={pack.isWorldCup} size="lg" animated
                />
                <motion.div
                  className="absolute inset-x-0 bottom-4 flex justify-center"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                >
                  <span className="px-4 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-xs font-bold border border-white/20">
                    Tap to rip 👆
                  </span>
                </motion.div>
              </motion.div>

              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-12 py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-black text-xl rounded-2xl shadow-xl shadow-[#f5c842]/20"
              >
                RIP IT! 🔥
              </motion.button>

              <Link href={`/packs/${pack.id}`} className="text-gray-600 text-sm hover:text-white transition-colors">
                ← Back to pack details
              </Link>
            </motion.div>
          )}

          {/* ── RIPPING ── */}
          {phase === 'ripping' && (
            <motion.div
              key="ripping"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Opening</div>
                <div className="text-2xl font-black">{pack.name}</div>
              </div>
              <PackRipAnimation
                pack={{ name: pack.name, series: pack.series, edition: pack.edition, rarity: pack.rarity, isWorldCup: pack.isWorldCup }}
                onRipComplete={onRipComplete}
              />
            </motion.div>
          )}

          {/* ── REVEAL ── */}
          {phase === 'reveal' && cards.length > 0 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                  className="text-5xl mb-3"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-black">Pack Opened!</h2>
                <p className="text-gray-500 text-sm mt-1">Tap each card to reveal · click to flip back</p>
              </motion.div>

              {/* Cards */}
              <div className="flex flex-wrap justify-center gap-5">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 40, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1 + i * 0.12, type: 'spring', bounce: 0.3 }}
                  >
                    <TradingCard
                      card={card}
                      faceDown
                      size="lg"
                      onClick={() => setRevealedCount(c => Math.min(c + 1, cards.length))}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Summary — shown once all cards revealed */}
              <AnimatePresence>
                {revealedCount >= cards.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm"
                  >
                    {/* Value summary */}
                    <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/8 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-black text-[#00ff87]">£{totalValue.toFixed(2)}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Total Value</div>
                        </div>
                        <div>
                          <div className="text-2xl font-black text-[#f5c842]">
                            {bestCard ? `£${bestCard.cashValue.toFixed(2)}` : '—'}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">Best Card</div>
                        </div>
                      </div>
                      {bestCard && (
                        <div className="mt-3 pt-3 border-t border-white/5 text-center text-sm">
                          <span className="font-semibold">{bestCard.player}</span>
                          {bestCard.parallel && (
                            <span className="text-gray-500"> · {bestCard.parallel}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      {demoCredits > 0 ? (
                        <button
                          onClick={() => { setCards([]); setRevealedCount(0); setPhase('ready') }}
                          className="w-full py-3 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
                        >
                          Open Another Pack ({demoCredits} left)
                        </button>
                      ) : null}
                      <Link
                        href="/packs"
                        className="block w-full py-3 text-center border border-white/10 text-gray-300 font-semibold rounded-xl hover:border-white/25 hover:bg-white/5 transition-all text-sm"
                      >
                        Browse All Packs
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

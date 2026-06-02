'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import CardReveal from '@/components/CardReveal'
import ParticlesBg from '@/components/ParticlesBg'
import PackRipAnimation from '@/components/PackRipAnimation'
import PackArtwork from '@/components/PackArtwork'

interface Order {
  id: string
  pack: {
    name: string
    series: string
    edition: string
    rarity: string
    isWorldCup: boolean
    xpReward: number
  }
}

type Phase = 'ready' | 'ripping' | 'fetching' | 'reveal'

export default function PackOpenClient({ order }: { order: Order }) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('ready')
  const [cards, setCards] = useState<Parameters<typeof CardReveal>[0]['cards']>([])
  const [error, setError] = useState('')

  // Called once the rip animation visually completes
  const onRipComplete = useCallback(async () => {
    setPhase('fetching')
    try {
      const res = await fetch(`/api/order/${order.id}/open`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCards(data.cards)
      setPhase('reveal')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to open pack')
    }
  }, [order.id])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <ParticlesBg />

      {/* Background glow that intensifies during rip */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: phase === 'ripping'
            ? 'radial-gradient(circle at 50% 50%, rgba(245,200,66,0.12) 0%, transparent 60%)'
            : phase === 'reveal'
            ? 'radial-gradient(circle at 50% 30%, rgba(167,139,250,0.08) 0%, transparent 60%)'
            : 'none',
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
        <AnimatePresence mode="wait">

          {/* READY — tap to rip */}
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">You bought</div>
                <h1 className="text-2xl sm:text-3xl font-black">{order.pack.name}</h1>
                <p className="text-gray-500 mt-1 text-sm">{order.pack.edition}</p>
              </div>

              {/* Pack preview */}
              <motion.div
                className="relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
                style={{ width: 220, height: 310 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.04, rotate: 2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setPhase('ripping')}
              >
                {/* Import PackArtwork inline here */}
                <PackArtworkWrapper pack={order.pack} />

                {/* Tap cue */}
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/20"
                  >
                    Tap to rip! 👆
                  </motion.div>
                </div>
              </motion.div>

              <motion.button
                onClick={() => setPhase('ripping')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-black text-xl rounded-2xl shadow-lg shadow-[#f5c842]/20"
              >
                RIP IT! 🔥
              </motion.button>
            </motion.div>
          )}

          {/* RIPPING — dramatic animation */}
          {phase === 'ripping' && (
            <motion.div
              key="ripping"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-sm text-gray-500 uppercase tracking-widest">Opening</div>
                <div className="text-xl font-black mt-1">{order.pack.name}</div>
              </motion.div>

              <PackRipAnimation pack={order.pack} onRipComplete={onRipComplete} />
            </motion.div>
          )}

          {/* FETCHING — brief loading while we call API */}
          {phase === 'fetching' && (
            <motion.div
              key="fetching"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-[#f5c842]/20 border-t-[#f5c842]"
              />
              <div className="text-gray-400">Revealing your cards...</div>
            </motion.div>
          )}

          {/* REVEAL — flip cards */}
          {phase === 'reveal' && cards.length > 0 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6 }}
                  className="text-5xl mb-3"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-black">Pack Opened!</h2>
                <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1">
                  <span className="text-purple-400 font-bold">+{order.pack.xpReward} XP</span> earned
                </p>
              </motion.div>

              <CardReveal cards={cards} onComplete={() => router.push('/collection')} />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-400 p-6"
            >
              <div className="text-4xl mb-4">😬</div>
              <p className="font-semibold">{error}</p>
              <button
                onClick={() => router.push('/collection')}
                className="mt-4 px-6 py-2 border border-white/10 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
              >
                Go to Collection
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

function PackArtworkWrapper({ pack }: { pack: { name: string; series: string; edition: string; rarity: string; isWorldCup: boolean } }) {
  return <PackArtwork series={pack.series} edition={pack.edition} name={pack.name} rarity={pack.rarity} isWorldCup={pack.isWorldCup} size="lg" animated />
}

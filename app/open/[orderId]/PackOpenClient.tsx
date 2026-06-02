'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import CardReveal from '@/components/CardReveal'
import ParticlesBg from '@/components/ParticlesBg'

interface Order {
  id: string
  pack: { name: string; series: string; xpReward: number }
}

export default function PackOpenClient({ order }: { order: Order }) {
  const router = useRouter()
  const [phase, setPhase] = useState<'countdown' | 'ripping' | 'reveal'>('countdown')
  const [cards, setCards] = useState<Parameters<typeof CardReveal>[0]['cards']>([])
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (phase !== 'countdown') return
    if (count === 0) { setPhase('ripping'); return }
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, count])

  useEffect(() => {
    if (phase !== 'ripping') return
    const ripPack = async () => {
      const res = await fetch(`/api/order/${order.id}/open`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setCards(data.cards)
        setPhase('reveal')
      }
    }
    const t = setTimeout(ripPack, 1800)
    return () => clearTimeout(t)
  }, [phase, order.id])

  const handleComplete = () => {
    router.push('/collection')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      <ParticlesBg />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12">
        {/* Countdown */}
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-gray-400 mb-4 text-lg">Opening</div>
              <div className="text-2xl font-bold mb-8">{order.pack.name}</div>
              <motion.div
                key={count}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-9xl font-black text-gold-gradient"
              >
                {count === 0 ? '🎴' : count}
              </motion.div>
            </motion.div>
          )}

          {phase === 'ripping' && (
            <motion.div
              key="ripping"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [-5, 5, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
                className="text-8xl mb-6"
              >
                📦
              </motion.div>
              <div className="text-2xl font-bold">Ripping pack...</div>
              <motion.div
                animate={{ scaleX: [0, 1] }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="mt-6 mx-auto max-w-xs h-1 rounded-full"
                style={{ background: 'linear-gradient(90deg, #f5c842, #ff6b35)', transformOrigin: 'left' }}
              />
            </motion.div>
          )}

          {phase === 'reveal' && cards.length > 0 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="text-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="text-5xl mb-3"
                >
                  🎉
                </motion.div>
                <h2 className="text-2xl font-black">Pack Opened!</h2>
                <p className="text-gray-400 text-sm mt-1">
                  +{order.pack.xpReward} XP earned
                </p>
              </div>
              <CardReveal cards={cards} onComplete={handleComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

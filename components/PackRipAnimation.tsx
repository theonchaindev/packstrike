'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimate, useMotionValue } from 'framer-motion'
import PackArtwork from './PackArtwork'

interface Pack {
  name: string
  series: string
  edition: string
  rarity: string
  isWorldCup: boolean
}

interface PackRipAnimationProps {
  pack: Pack
  onRipComplete: () => void
}

// Jagged tear SVG path
const TEAR_PATH = 'M 100 0 L 96 18 L 103 32 L 97 48 L 104 62 L 95 78 L 102 94 L 97 110 L 103 126 L 95 140 L 102 156 L 96 172 L 103 188 L 97 204 L 104 220 L 95 236 L 100 280'

export default function PackRipAnimation({ pack, onRipComplete }: PackRipAnimationProps) {
  const [scope, animate] = useAnimate()
  const hasRipped = useRef(false)
  const glowOpacity = useMotionValue(0)

  useEffect(() => {
    if (hasRipped.current) return
    hasRipped.current = true

    const sequence = async () => {
      // Phase 1: Pack slides in
      await animate('#pack-wrapper', { opacity: [0, 1], scale: [0.7, 1], y: [40, 0] }, { duration: 0.5, ease: 'easeOut' })

      // Phase 2: Pack pulses and glows as energy builds
      await animate('#pack-wrapper', { scale: [1, 1.04, 0.98, 1.06, 1] }, { duration: 0.8, ease: 'easeInOut' })
      await animate('#glow-ring', { opacity: [0, 0.6, 0.3, 0.8], scale: [0.8, 1.1, 0.95, 1.2] }, { duration: 0.8, ease: 'easeInOut' })

      // Phase 3: Crack appears — the tear line draws itself
      await animate('#tear-line', { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.35, ease: 'easeIn' })

      // Phase 4: White flash
      await animate('#flash', { opacity: [0, 1, 0] }, { duration: 0.2, ease: 'easeOut' })

      // Phase 5: The two halves tear apart simultaneously
      await Promise.all([
        animate('#left-half', {
          x: [-160],
          rotate: [-18],
          opacity: [0],
        }, { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }),
        animate('#right-half', {
          x: [160],
          rotate: [18],
          opacity: [0],
        }, { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }),
        animate('#tear-line', { opacity: [0] }, { duration: 0.2 }),
        // Burst ring
        animate('#burst-ring', { scale: [0, 2.5], opacity: [0.8, 0] }, { duration: 0.6, ease: 'easeOut' }),
        animate('#burst-ring-2', { scale: [0, 3.5], opacity: [0.5, 0] }, { duration: 0.7, ease: 'easeOut', delay: 0.1 }),
      ])

      // Phase 6: Sparkle particles
      await animate('#sparks', { opacity: [1, 0] }, { duration: 0.5, delay: 0.1 })

      // Done — let parent know
      await new Promise(r => setTimeout(r, 200))
      onRipComplete()
    }

    sequence()
  }, [animate, onRipComplete])

  return (
    <div ref={scope} className="relative flex items-center justify-center" style={{ width: 220, height: 310 }}>
      {/* Glow rings */}
      <motion.div
        id="glow-ring"
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        style={{
          boxShadow: '0 0 60px 20px rgba(245,200,66,0.4), 0 0 120px 40px rgba(245,200,66,0.15)',
        }}
      />

      {/* Burst rings (hidden initially, appear on rip) */}
      <motion.div
        id="burst-ring"
        className="absolute inset-0 rounded-full pointer-events-none border-2 border-[#f5c842]"
        initial={{ scale: 0, opacity: 0 }}
        style={{ margin: '-20px' }}
      />
      <motion.div
        id="burst-ring-2"
        className="absolute inset-0 rounded-full pointer-events-none border border-white/40"
        initial={{ scale: 0, opacity: 0 }}
        style={{ margin: '-20px' }}
      />

      {/* LEFT HALF — clipped to left side */}
      <motion.div
        id="left-half"
        className="absolute inset-0 overflow-hidden rounded-2xl"
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        style={{
          clipPath: `path('M 0 0 L 100 0 L 96 18 L 103 32 L 97 48 L 104 62 L 95 78 L 102 94 L 97 110 L 103 126 L 95 140 L 102 156 L 96 172 L 103 188 L 97 204 L 104 220 L 95 236 L 100 280 L 0 280 Z')`,
          transformOrigin: 'right center',
          boxShadow: '-4px 0 20px rgba(0,0,0,0.8)',
        }}
      >
        <PackArtwork series={pack.series} edition={pack.edition} name={pack.name} rarity={pack.rarity} isWorldCup={pack.isWorldCup}/>
      </motion.div>

      {/* RIGHT HALF — clipped to right side */}
      <motion.div
        id="right-half"
        className="absolute inset-0 overflow-hidden rounded-2xl"
        initial={{ x: 0, rotate: 0, opacity: 1 }}
        style={{
          clipPath: `path('M 100 0 L 200 0 L 200 280 L 100 280 L 95 236 L 104 220 L 97 204 L 103 188 L 96 172 L 102 156 L 95 140 L 103 126 L 97 110 L 102 94 L 95 78 L 104 62 L 97 48 L 103 32 L 96 18 Z')`,
          transformOrigin: 'left center',
          boxShadow: '4px 0 20px rgba(0,0,0,0.8)',
        }}
      >
        <PackArtwork series={pack.series} edition={pack.edition} name={pack.name} rarity={pack.rarity} isWorldCup={pack.isWorldCup}/>
      </motion.div>

      {/* Tear line — draws itself then disappears */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 280"
      >
        <motion.path
          id="tear-line"
          d={TEAR_PATH}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          style={{
            filter: 'drop-shadow(0 0 6px white) drop-shadow(0 0 12px #f5c842)',
          }}
        />
      </svg>

      {/* White flash overlay */}
      <motion.div
        id="flash"
        className="absolute inset-0 bg-white rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
      />

      {/* Spark particles */}
      <motion.div
        id="sparks"
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * 360
          const dist = 80 + Math.random() * 60
          const x = Math.cos((angle * Math.PI) / 180) * dist
          const y = Math.sin((angle * Math.PI) / 180) * dist
          return (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#f5c842]"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${x}px, ${y}px)`,
                boxShadow: '0 0 6px #f5c842',
              }}
            />
          )
        })}
      </motion.div>

      {/* Pack wrapper (for initial entrance animation) */}
      <motion.div
        id="pack-wrapper"
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
      />
    </div>
  )
}

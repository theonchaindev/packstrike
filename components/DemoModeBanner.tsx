'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FlaskConical, X, Zap } from 'lucide-react'
import Link from 'next/link'
import { useDemoMode } from '@/lib/demoMode'

export default function DemoModeBanner() {
  const { demoMode, setDemoMode, demoCredits, setDemoCredits } = useDemoMode()
  const [claimed, setClaimed] = useState(false)
  const [visible, setVisible] = useState(true)

  const claimFreeCredits = () => {
    if (claimed) return
    setDemoCredits(3)
    setClaimed(true)
    setDemoMode(true)
  }

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed top-16 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
      >
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl border text-sm font-medium shadow-2xl pointer-events-auto"
          style={{
            background: demoMode
              ? 'linear-gradient(135deg, rgba(0,200,83,0.15), rgba(0,100,60,0.2))'
              : 'linear-gradient(135deg, rgba(245,200,66,0.1), rgba(255,107,53,0.1))',
            borderColor: demoMode ? 'rgba(0,200,83,0.3)' : 'rgba(245,200,66,0.2)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <FlaskConical size={16} className={demoMode ? 'text-green-400' : 'text-[#f5c842]'} />

          {demoMode ? (
            <>
              <span className="text-green-400 font-bold">Test Mode Active</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/20">
                <Zap size={12} className="text-green-400" />
                <span className="text-green-300 font-bold">{demoCredits} free packs left</span>
              </div>
              <Link
                href="/demo/panini-prizm-wc-2026"
                className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold rounded-lg hover:bg-green-500/30 transition-all whitespace-nowrap"
              >
                Open a Pack →
              </Link>
              <button
                onClick={() => setDemoMode(false)}
                className="text-gray-500 hover:text-white transition-colors text-xs underline"
              >
                Exit
              </button>
            </>
          ) : (
            <>
              <span className="text-[#f5c842]">Want to try first?</span>
              <button
                onClick={claimFreeCredits}
                className="px-4 py-1.5 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black text-xs font-black rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Claim 3 Free Packs →
              </button>
            </>
          )}

          <button
            onClick={() => setVisible(false)}
            className="ml-1 text-gray-600 hover:text-gray-300 transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

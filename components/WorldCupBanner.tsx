'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Pack {
  id: string
  name: string
  series: string
  edition: string
  price: number
  solPrice: number
  rarity: string
  stock: number
  sold: number
  xpReward: number
}

export default function WorldCupBanner({ packs }: { packs: Pack[] }) {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-[#0a0e1f] to-[#07080c]" />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #003087 0%, transparent 50%), radial-gradient(circle at 80% 50%, #cc0001 0%, transparent 50%)',
            }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative p-8 sm:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 font-medium mb-6">
                  🏆 FIFA World Cup 2026
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
                  The Greatest Show
                  <br />
                  <span className="text-gold-gradient">on the Planet</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Exclusive World Cup 2026 collections from Topps and Panini.
                  Chase rare Prizm parallels of the world&apos;s biggest stars. Limited stock — once they&apos;re gone, they&apos;re gone.
                </p>
                <Link
                  href="/world-cup"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl text-lg hover:opacity-90 transition-opacity"
                >
                  Shop World Cup Packs →
                </Link>
              </motion.div>

              {/* Pack cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex gap-4 justify-center lg:justify-end"
              >
                {packs.slice(0, 2).map((pack, i) => (
                  <Link key={pack.id} href={`/packs/${pack.id}`}>
                    <motion.div
                      whileHover={{ y: -8, rotate: i === 0 ? -3 : 3 }}
                      className="relative w-44 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-[#0a0e1f] border border-white/10 shadow-2xl cursor-pointer"
                      style={{ rotate: i === 0 ? '-4deg' : '4deg' }}
                    >
                      <div className="aspect-[3/4] flex flex-col items-center justify-center p-4 text-center">
                        <div className="text-5xl mb-3">🏆</div>
                        <div className="text-xs font-bold text-[#f5c842] mb-1">{pack.series}</div>
                        <div className="text-xs text-gray-400 leading-tight">{pack.edition}</div>
                        <div className="mt-3 text-lg font-black text-white">{pack.solPrice} SOL</div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Flags row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center gap-4 text-2xl"
            >
              <span className="text-xs text-gray-500 mr-2 uppercase tracking-wider">Featuring</span>
              {['🇧🇷', '🇦🇷', '🇫🇷', '🇩🇪', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇪🇸', '🇵🇹', '🇳🇱', '🇧🇪', '🇺🇸'].map((flag) => (
                <motion.span
                  key={flag}
                  whileHover={{ scale: 1.3 }}
                  className="cursor-default"
                >
                  {flag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

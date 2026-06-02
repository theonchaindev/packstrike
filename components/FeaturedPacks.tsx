'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import PackCard from './PackCard'

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

export default function FeaturedPacks({ packs }: { packs: Pack[] }) {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-2">Featured</div>
          <h2 className="text-3xl sm:text-4xl font-black">Hot Right Now</h2>
        </div>
        <Link
          href="/packs"
          className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
        >
          View all →
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack, i) => (
          <PackCard key={pack.id} pack={pack} index={i} />
        ))}
      </div>
    </section>
  )
}

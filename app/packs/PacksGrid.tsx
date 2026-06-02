'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import PackCard from '@/components/PackCard'

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

const SERIES = ['All', 'Topps', 'Panini']
const RARITIES = ['All', 'standard', 'premium', 'elite']

export default function PacksGrid({
  packs,
  filters,
}: {
  packs: Pack[]
  filters: { series?: string; rarity?: string; worldcup?: string }
}) {
  const router = useRouter()

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter(([, v]) => v) as [string, string][]
    )
    if (value === 'All' || value === '') params.delete(key)
    else params.set(key, value)
    router.push(`/packs?${params.toString()}`)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-2">Shop</div>
        <h1 className="text-4xl font-black mb-6">All Packs</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1.5 p-1 bg-[#0f1117] rounded-xl border border-white/5">
            {SERIES.map((s) => {
              const active = s === 'All' ? !filters.series : filters.series === s.toLowerCase()
              return (
                <button
                  key={s}
                  onClick={() => setFilter('series', s === 'All' ? '' : s.toLowerCase())}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'bg-[#f5c842] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>
          <div className="flex gap-1.5 p-1 bg-[#0f1117] rounded-xl border border-white/5">
            {RARITIES.map((r) => {
              const active = r === 'All' ? !filters.rarity : filters.rarity === r
              return (
                <button
                  key={r}
                  onClick={() => setFilter('rarity', r === 'All' ? '' : r)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    active ? 'bg-[#f5c842] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => setFilter('worldcup', filters.worldcup === '1' ? '' : '1')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              filters.worldcup === '1'
                ? 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                : 'border-white/5 bg-[#0f1117] text-gray-400 hover:text-white'
            }`}
          >
            🏆 World Cup Only
          </button>
        </div>
      </motion.div>

      {packs.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium">No packs found with these filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packs.map((pack, i) => (
            <PackCard key={pack.id} pack={pack} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

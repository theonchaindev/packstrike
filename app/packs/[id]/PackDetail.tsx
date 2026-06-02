'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Star, Zap, Truck, FlaskConical, ChevronDown, TrendingUp } from 'lucide-react'
import { useDemoMode } from '@/lib/demoMode'
import { getPackById, RARITY_CONFIG } from '@/lib/packData'
import PackArtwork from '@/components/PackArtwork'
import TradingCard from '@/components/TradingCard'

interface PackWithCards {
  id: string
  name: string
  series: string
  edition: string
  description: string
  price: number
  solPrice: number
  rarity: string
  stock: number
  sold: number
  isFeatured: boolean
  isWorldCup: boolean
  xpReward: number
  packCards: Array<{
    probability: number
    card: {
      id: string
      player: string
      team: string
      rarity: string
      cashValue: number
      number: number | null
      totalPrint: number | null
      description: string | null
    }
  }>
}

// Merge DB pack with static catalog data (for rich card inventory)
function usePackInventory(pack: PackWithCards) {
  const staticPack = getPackById(pack.id) || getPackById(
    pack.series.toLowerCase().replace(/\s+/g, '-') + '-' + pack.edition.toLowerCase().replace(/\s+/g, '-').slice(0, 10)
  )
  return staticPack?.cards || pack.packCards.map(pc => ({
    id: pc.card.id,
    player: pc.card.player,
    team: pc.card.team,
    league: '',
    nation: '🌍',
    rarity: pc.card.rarity as 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary',
    cashValue: pc.card.cashValue,
    pullOdds: `${(pc.probability * 100).toFixed(1)}%`,
    probability: pc.probability,
    year: 2025,
    parallel: pc.card.description || undefined,
    number: pc.card.number || undefined,
    totalPrint: pc.card.totalPrint || undefined,
  }))
}

export default function PackDetail({ pack }: { pack: PackWithCards }) {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const router = useRouter()
  const { demoMode, demoCredits } = useDemoMode()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'overview' | 'inventory'>('overview')
  const [rarityFilter, setRarityFilter] = useState<string>('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const staticPack = getPackById(pack.id)
  const inventory = usePackInventory(pack)
  const remaining = pack.stock - pack.sold
  const stockPct = Math.max(0, (remaining / pack.stock) * 100)

  // Stats
  const minValue = Math.min(...inventory.map(c => c.cashValue))
  const maxValue = Math.max(...inventory.map(c => c.cashValue))
  const rarityBreakdown = Object.entries(
    inventory.reduce((acc, c) => {
      acc[c.rarity] = (acc[c.rarity] || 0) + 1; return acc
    }, {} as Record<string, number>)
  )

  const handleBuy = async () => {
    if (!publicKey) { setVisible(true); return }
    setLoading(true); setError('')
    try {
      const shopWallet = new PublicKey(process.env.NEXT_PUBLIC_SHOP_WALLET || '11111111111111111111111111111111')
      const lamports = Math.round(pack.solPrice * LAMPORTS_PER_SOL)
      const tx = new Transaction().add(SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: shopWallet, lamports }))
      const { blockhash } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash; tx.feePayer = publicKey
      const sig = await sendTransaction(tx, connection)
      const res = await fetch('/api/order', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId: pack.id, txSignature: sig, wallet: publicKey.toString() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      router.push(`/open/${data.orderId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Transaction failed')
    } finally { setLoading(false) }
  }

  const filteredInventory = rarityFilter === 'all'
    ? inventory
    : inventory.filter(c => c.rarity === rarityFilter)

  const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common']
  const sortedInventory = [...filteredInventory].sort(
    (a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity)
  )

  return (
    <div className="min-h-screen bg-[#07080c]">
      {/* ── Hero band ── */}
      <div className="relative overflow-hidden pt-20 pb-8 px-4 sm:px-6 border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,200,66,0.07) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

          {/* Pack artwork */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:w-72 xl:w-80 shrink-0 mx-auto lg:mx-0"
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '3/4' }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.25 }}
            >
              <PackArtwork series={pack.series} edition={pack.edition} name={pack.name}
                rarity={pack.rarity} isWorldCup={pack.isWorldCup} size="lg" animated />
              <div className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }} />
            </motion.div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 flex flex-col gap-5"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Link href="/packs" className="hover:text-gray-400 transition-colors">Packs</Link>
              <span>/</span>
              <span className="text-gray-400">{pack.series}</span>
              {pack.isWorldCup && <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full font-semibold">🏆 World Cup</span>}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                {pack.isFeatured && (
                  <span className="flex items-center gap-1 text-xs text-[#f5c842] font-semibold">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                )}
                <span className="text-xs text-gray-500 uppercase tracking-wider">{pack.series.split(' ')[0]}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black leading-tight">{pack.name}</h1>
              <p className="text-gray-400 mt-3 leading-relaxed max-w-xl">{pack.description}</p>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Cards per Pack', value: (staticPack?.cardsPerPack || 5).toString() },
                { label: 'Value Range', value: `£${minValue.toFixed(0)}–£${maxValue.toFixed(0)}` },
                { label: 'Stock', value: `${remaining} left` },
                { label: 'XP Reward', value: `+${pack.xpReward}`, color: '#a78bfa' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-col px-4 py-3 rounded-xl bg-[#0f1117] border border-white/5">
                  <span className="text-xs text-gray-500 mb-0.5">{label}</span>
                  <span className="font-black text-sm" style={color ? { color } : {}}>{value}</span>
                </div>
              ))}
            </div>

            {/* Price + buy */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0f1117] border border-white/5">
                <div>
                  <div className="text-3xl font-black text-[#f5c842]">{pack.solPrice} SOL</div>
                  <div className="text-gray-500 text-sm">≈ £{pack.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                {error && <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

                <motion.button
                  onClick={handleBuy}
                  disabled={loading || remaining === 0}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-black rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : remaining === 0 ? 'Sold Out' : `Open Pack — ${pack.solPrice} SOL`}
                </motion.button>

                {/* Demo button — always visible */}
                <Link
                  href={`/demo/${staticPack?.id || pack.id}`}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-green-500/25 bg-green-500/8 text-green-400 font-semibold rounded-xl text-sm hover:bg-green-500/15 transition-all"
                >
                  <FlaskConical size={15} />
                  Try Demo (free)
                  {demoMode && demoCredits > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-green-500/20 rounded text-xs font-bold">{demoCredits}</span>
                  )}
                </Link>
              </div>
            </div>

            {/* Redeem note */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#f5c842]/5 border border-[#f5c842]/10">
              <Truck size={16} className="text-[#f5c842] mt-0.5 shrink-0" />
              <span className="text-xs text-gray-400 leading-relaxed">
                After opening, cash out your cards for GBP or request physical delivery in 5–7 business days.
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="sticky top-16 z-30 bg-[#07080c]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-0">
          {(['overview', 'inventory'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-6 py-4 text-sm font-semibold capitalize transition-colors ${
                tab === t ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t === 'inventory' ? `Card Inventory (${inventory.length})` : 'Overview'}
              {tab === t && (
                <motion.div layoutId="tab-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f5c842]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {tab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Rarity breakdown */}
              <div className="sm:col-span-2 lg:col-span-1 p-6 rounded-2xl bg-[#0f1117] border border-white/5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-5">Rarity Breakdown</h3>
                <div className="space-y-3">
                  {rarityOrder.map(r => {
                    const count = rarityBreakdown.find(([k]) => k === r)?.[1] || 0
                    if (count === 0) return null
                    const cfg = RARITY_CONFIG[r as keyof typeof RARITY_CONFIG]
                    return (
                      <div key={r} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ background: cfg.color }} />
                        <span className="text-sm font-medium flex-1" style={{ color: cfg.color }}>{cfg.label}</span>
                        <span className="text-sm font-bold text-white">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Value range */}
              <div className="p-6 rounded-2xl bg-[#0f1117] border border-white/5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-5 flex items-center gap-2">
                  <TrendingUp size={14} /> Value Range
                </h3>
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Min</div>
                    <div className="text-xl font-black text-white">£{minValue.toFixed(2)}</div>
                  </div>
                  <div className="text-gray-600">→</div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Max</div>
                    <div className="text-xl font-black text-[#f5c842]">£{maxValue.toFixed(2)}</div>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-gray-500 via-blue-500 to-[#f5c842]" style={{ width: '100%' }} />
                </div>
              </div>

              {/* How many cards */}
              <div className="p-6 rounded-2xl bg-[#0f1117] border border-white/5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-5 flex items-center gap-2">
                  <Zap size={14} /> Pack Details
                </h3>
                <ul className="space-y-3 text-sm">
                  {[
                    ['Cards per pack', staticPack?.cardsPerPack || 5],
                    ['Total variants', inventory.length],
                    ['Release year', staticPack?.releaseYear || 2025],
                    ['XP on open', `+${pack.xpReward}`],
                  ].map(([k, v]) => (
                    <li key={String(k)} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-semibold">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {tab === 'inventory' && (
            <motion.div
              key="inventory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Rarity filter pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['all', ...rarityOrder.filter(r => inventory.some(c => c.rarity === r))].map(r => {
                  const active = rarityFilter === r
                  const cfg = r !== 'all' ? RARITY_CONFIG[r as keyof typeof RARITY_CONFIG] : null
                  return (
                    <button
                      key={r}
                      onClick={() => setRarityFilter(r)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${
                        active ? 'text-black' : 'text-gray-400 hover:text-white bg-white/5'
                      }`}
                      style={active ? { background: cfg?.color || '#f5c842', color: '#000' } : {}}
                    >
                      {r === 'all' ? `All (${inventory.length})` : `${RARITY_CONFIG[r as keyof typeof RARITY_CONFIG].label} (${inventory.filter(c => c.rarity === r).length})`}
                    </button>
                  )
                })}
              </div>

              {/* Card grid — Arena Club-style list with card preview */}
              <div className="space-y-2">
                {sortedInventory.map((card, i) => {
                  const cfg = RARITY_CONFIG[card.rarity]
                  const isExpanded = expandedCard === card.id
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <div
                        className="p-4 rounded-xl bg-[#0f1117] border border-white/5 hover:border-white/10 cursor-pointer transition-all"
                        onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                        style={isExpanded ? { borderColor: cfg.color + '40' } : {}}
                      >
                        <div className="flex items-center gap-4">
                          {/* Rarity dot */}
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />

                          {/* Player name */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold">{card.player}</span>
                              <span className="text-gray-500 text-sm">{card.team}</span>
                              {card.nation && <span className="text-base">{card.nation}</span>}
                              {card.parallel && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: cfg.color + '18', color: cfg.color }}>
                                  {card.parallel}
                                </span>
                              )}
                              {card.totalPrint && (
                                <span className="text-xs font-bold text-gray-400">/{card.totalPrint}</span>
                              )}
                            </div>
                          </div>

                          {/* Value + odds */}
                          <div className="text-right shrink-0">
                            <div className="font-black text-[#00ff87]">£{card.cashValue.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">{card.pullOdds}</div>
                          </div>

                          {/* Rarity label */}
                          <div className="hidden sm:block shrink-0 w-20 text-right">
                            <span className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</span>
                          </div>

                          <ChevronDown
                            size={14}
                            className={`text-gray-600 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>

                      {/* Expanded card preview */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="py-5 px-4 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-t-0 border-white/5 rounded-b-xl bg-[#0a0b0e]"
                              style={{ borderColor: cfg.color + '20' }}>
                              <TradingCard card={card} size="md" />
                              <div className="flex-1 space-y-3 text-sm">
                                <div><span className="text-gray-500">Player </span><span className="font-semibold">{card.player}</span></div>
                                <div><span className="text-gray-500">Team </span><span className="font-semibold">{card.team}</span></div>
                                {card.league && <div><span className="text-gray-500">League </span><span className="font-semibold">{card.league}</span></div>}
                                {card.parallel && <div><span className="text-gray-500">Parallel </span><span className="font-semibold" style={{ color: cfg.color }}>{card.parallel}</span></div>}
                                {card.totalPrint && <div><span className="text-gray-500">Print Run </span><span className="font-semibold">/{card.totalPrint}</span></div>}
                                <div><span className="text-gray-500">Pull Odds </span><span className="font-semibold">{card.pullOdds}</span></div>
                                <div><span className="text-gray-500">Est. Value </span><span className="font-bold text-[#00ff87]">£{card.cashValue.toFixed(2)}</span></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

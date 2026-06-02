'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { SystemProgram, Transaction, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useRouter } from 'next/navigation'
import { Star, Zap, Package, Truck } from 'lucide-react'

const rarityLabels: Record<string, { label: string; color: string }> = {
  common:    { label: 'Common',    color: '#9ca3af' },
  uncommon:  { label: 'Uncommon', color: '#34d399' },
  rare:      { label: 'Rare',     color: '#60a5fa' },
  epic:      { label: 'Epic',     color: '#a78bfa' },
  legendary: { label: 'Legendary',color: '#f5c842' },
}

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

export default function PackDetail({ pack }: { pack: PackWithCards }) {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const { setVisible } = useWalletModal()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const remaining = pack.stock - pack.sold
  const stockPct = Math.max(0, (remaining / pack.stock) * 100)

  const handleBuy = async () => {
    if (!publicKey) { setVisible(true); return }

    setLoading(true)
    setError('')

    try {
      const shopWallet = new PublicKey(
        process.env.NEXT_PUBLIC_SHOP_WALLET || '11111111111111111111111111111111'
      )
      const lamports = Math.round(pack.solPrice * LAMPORTS_PER_SOL)

      const tx = new Transaction().add(
        SystemProgram.transfer({ fromPubkey: publicKey, toPubkey: shopWallet, lamports })
      )
      const { blockhash } = await connection.getLatestBlockhash()
      tx.recentBlockhash = blockhash
      tx.feePayer = publicKey

      const sig = await sendTransaction(tx, connection)

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId: pack.id, txSignature: sig, wallet: publicKey.toString() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')

      router.push(`/open/${data.orderId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  // Sort cards by rarity for display
  const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common']
  const sortedCards = [...pack.packCards].sort(
    (a, b) => rarityOrder.indexOf(a.card.rarity) - rarityOrder.indexOf(b.card.rarity)
  )

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Pack visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1d26] to-[#0f1117] border border-white/10 shadow-2xl">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="text-8xl">⚽</div>
              <div className="text-center">
                <div className="text-sm text-gray-400 uppercase tracking-wider">{pack.series}</div>
                <div className="text-2xl font-black mt-1">{pack.name}</div>
              </div>
              {pack.isWorldCup && (
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold">
                  🏆 World Cup Edition
                </span>
              )}
            </div>

            {/* Shimmer */}
            <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />
          </div>
        </motion.div>

        {/* Info & buy */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{pack.edition}</span>
              {pack.isFeatured && (
                <span className="flex items-center gap-1 text-xs text-[#f5c842] font-semibold">
                  <Star size={12} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-3">{pack.name}</h1>
            <p className="text-gray-400 leading-relaxed">{pack.description}</p>
          </div>

          {/* Price */}
          <div className="p-6 rounded-2xl bg-[#0f1117] border border-white/5">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="text-4xl font-black text-[#f5c842]">{pack.solPrice} SOL</div>
                <div className="text-gray-500 text-sm">≈ £{pack.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-1.5 text-purple-400">
                <Zap size={16} />
                <span className="font-bold">+{pack.xpReward} XP</span>
              </div>
            </div>

            {/* Stock */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-500">{remaining} of {pack.stock} remaining</span>
                <span className={stockPct < 20 ? 'text-red-400' : stockPct < 50 ? 'text-yellow-400' : 'text-green-400'}>
                  {stockPct < 20 ? '🔥 Almost gone!' : stockPct < 50 ? 'Selling fast' : 'In stock'}
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${stockPct}%`,
                    background: stockPct < 20 ? '#ff3b5c' : stockPct < 50 ? '#f5c842' : '#00ff87',
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <motion.button
              onClick={handleBuy}
              disabled={loading || remaining === 0}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl text-lg transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing...
                </span>
              ) : remaining === 0 ? 'Sold Out' : (
                `Open Pack — ${pack.solPrice} SOL`
              )}
            </motion.button>

            {!publicKey && (
              <p className="text-center text-gray-600 text-xs mt-2">
                Connect wallet to buy
              </p>
            )}
          </div>

          {/* What you get */}
          <div className="p-5 rounded-2xl bg-[#0f1117] border border-white/5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
              <Package size={14} /> What&apos;s Inside
            </h3>
            <div className="space-y-2">
              {sortedCards.map(({ card, probability }) => {
                const cfg = rarityLabels[card.rarity] || rarityLabels.common
                return (
                  <div key={card.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: cfg.color }} />
                      <span className="font-medium">{card.player}</span>
                      <span className="text-gray-600">{card.team}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span style={{ color: cfg.color }} className="text-xs font-semibold">{cfg.label}</span>
                      <span className="text-gray-600 text-xs">{(probability * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Redeem info */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f5c842]/5 border border-[#f5c842]/10">
            <Truck size={18} className="text-[#f5c842] mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-[#f5c842]">Real Cards — Real Choice</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                After opening, cash out your cards for GBP or request physical delivery within 5–7 business days.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

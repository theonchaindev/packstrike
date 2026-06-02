'use client'

import { motion } from 'framer-motion'
import { Zap, Lock } from 'lucide-react'

const tiers = [
  { name: 'Starter',   xp: 0,     color: '#9ca3af', icon: '🥉', perks: ['Access to standard packs', 'Basic card collection'] },
  { name: 'Silver',    xp: 500,   color: '#c0c0c0', icon: '🥈', perks: ['5% discount on purchases', 'Early access to new packs'] },
  { name: 'Gold',      xp: 1500,  color: '#f5c842', icon: '🥇', perks: ['10% discount', 'Guaranteed Gold card in next pack', 'Priority shipping'] },
  { name: 'Platinum',  xp: 5000,  color: '#e5e4e2', icon: '💎', perks: ['15% discount', 'Free premium pack monthly', 'Exclusive Platinum cards'] },
  { name: 'Legend',    xp: 10000, color: '#ff6b35', icon: '👑', perks: ['20% discount', 'Weekly free pack', 'Exclusive Legend 1/10 cards', 'VIP support'] },
]

interface Reward {
  id: string
  name: string
  description: string
  xpRequired: number
  type: string
  value: string
}

interface User {
  xpPoints: number
  level: number
  username?: string | null
}

export default function RewardsClient({ rewards, user }: { rewards: Reward[]; user: User | null }) {
  const userXp = user?.xpPoints ?? 0
  const currentTier = [...tiers].reverse().find(t => userXp >= t.xp) || tiers[0]
  const nextTier = tiers.find(t => t.xp > userXp)
  const progressToNext = nextTier
    ? Math.min(100, ((userXp - currentTier.xp) / (nextTier.xp - currentTier.xp)) * 100)
    : 100

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-2">Loyalty</div>
        <h1 className="text-4xl font-black">Rewards</h1>
      </motion.div>

      {/* Current status */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-6 rounded-2xl bg-[#0f1117] border border-white/5"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="text-4xl">{currentTier.icon}</div>
            <div>
              <div className="font-bold text-xl" style={{ color: currentTier.color }}>{currentTier.name}</div>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Zap size={14} />
                <span>{userXp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>

          {nextTier && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{userXp.toLocaleString()} XP</span>
                <span>{nextTier.xp.toLocaleString()} XP to {nextTier.name}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ background: currentTier.color }}
                />
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Tiers */}
      <div className="mb-12">
        <h2 className="text-xl font-black mb-6">Collector Tiers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiers.map((tier, i) => {
            const unlocked = userXp >= tier.xp
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className={`p-5 rounded-2xl border transition-all ${
                  unlocked
                    ? 'bg-[#0f1117] border-white/10'
                    : 'bg-[#0a0b0e] border-white/3 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{tier.icon}</span>
                  {!unlocked && <Lock size={14} className="text-gray-600" />}
                </div>
                <div className="font-bold mb-1" style={{ color: tier.color }}>{tier.name}</div>
                <div className="text-xs text-gray-500 mb-3">
                  {tier.xp === 0 ? 'Starting tier' : `${tier.xp.toLocaleString()} XP`}
                </div>
                <ul className="space-y-1">
                  {tier.perks.map(perk => (
                    <li key={perk} className="text-xs text-gray-400 flex items-start gap-1.5">
                      <span className="mt-0.5 shrink-0" style={{ color: tier.color }}>✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Rewards list */}
      <div>
        <h2 className="text-xl font-black mb-6">Claim Rewards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward, i) => {
            const canClaim = userXp >= reward.xpRequired
            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className={`p-5 rounded-2xl border transition-all ${
                  canClaim ? 'bg-[#0f1117] border-white/10' : 'bg-[#0a0b0e] border-white/3 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    <Zap size={12} className="text-purple-400" />
                    <span className="text-purple-400">{reward.xpRequired.toLocaleString()} XP</span>
                  </div>
                  {!canClaim && <Lock size={14} className="text-gray-600" />}
                </div>
                <h3 className="font-bold mb-1">{reward.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{reward.description}</p>
                <button
                  disabled={!canClaim || !user}
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition-all ${
                    canClaim && user
                      ? 'bg-[#f5c842] text-black hover:opacity-90'
                      : 'bg-white/5 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {!user ? 'Connect wallet' : canClaim ? 'Claim' : `Need ${(reward.xpRequired - userXp).toLocaleString()} more XP`}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

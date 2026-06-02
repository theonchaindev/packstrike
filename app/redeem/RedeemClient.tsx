'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Banknote, Truck, CheckCircle } from 'lucide-react'

interface UserCard {
  id: string
  card: {
    id: string
    player: string
    team: string
    rarity: string
    cashValue: number
    series: string
    number: number | null
    totalPrint: number | null
  }
}

interface User {
  id: string
  email?: string | null
}

export default function RedeemClient({ cards, user }: { cards: UserCard[]; user: User }) {
  const [selected, setSelected] = useState<string[]>([])
  const [mode, setMode] = useState<'cash' | 'ship' | null>(null)
  const [step, setStep] = useState<'select' | 'redeem' | 'done'>('select')
  const [shipping, setShipping] = useState({ name: '', line1: '', city: '', postcode: '', country: 'GB' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleCard = (id: string) => {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  }

  const selectedCards = cards.filter(c => selected.includes(c.id))
  const totalValue = selectedCards.reduce((sum, c) => sum + c.card.cashValue, 0)

  const handleRedeem = async () => {
    if (!mode || selected.length === 0) return
    setLoading(true)
    setError('')
    try {
      const body: Record<string, unknown> = { cardIds: selected, redeemOption: mode }
      if (mode === 'ship') body.shipping = shipping
      const res = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Redeem failed')
      setStep('done')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'done') {
    return (
      <div className="pt-32 pb-20 px-4 text-center max-w-md mx-auto">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <CheckCircle size={64} className="text-[#00ff87] mx-auto mb-6" />
        </motion.div>
        <h1 className="text-3xl font-black mb-3">Redemption Submitted!</h1>
        <p className="text-gray-400 leading-relaxed">
          {mode === 'cash'
            ? 'Your cash payout will be processed within 2–3 business days to your registered payment method.'
            : 'Your cards will be shipped within 5–7 business days. Check your email for tracking.'}
        </p>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-2">Redeem</div>
        <h1 className="text-4xl font-black">Cash Out or Ship</h1>
        <p className="text-gray-500 mt-2">Select your cards, then choose how you&apos;d like to redeem them.</p>
      </motion.div>

      {cards.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">✅</div>
          <p className="text-lg">No cards to redeem — open more packs!</p>
        </div>
      ) : step === 'select' ? (
        <>
          {/* Card selection */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
            {cards.map((uc, i) => {
              const isSelected = selected.includes(uc.id)
              return (
                <motion.button
                  key={uc.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => toggleCard(uc.id)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-[#f5c842]/10 border-[#f5c842]/40'
                      : 'bg-[#0f1117] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="text-3xl mb-2 text-center">⚽</div>
                  <div className="text-sm font-bold leading-tight">{uc.card.player}</div>
                  <div className="text-xs text-gray-500 mb-2">{uc.card.team}</div>
                  <div className="text-sm font-black text-[#00ff87]">£{uc.card.cashValue}</div>
                  {isSelected && (
                    <div className="mt-1.5 flex items-center gap-1 text-xs text-[#f5c842] font-semibold">
                      <CheckCircle size={12} /> Selected
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>

          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky bottom-6 p-5 rounded-2xl bg-[#0f1117] border border-white/10 flex items-center justify-between shadow-2xl"
            >
              <div>
                <div className="text-sm text-gray-400">{selected.length} cards selected</div>
                <div className="text-xl font-black text-[#00ff87]">£{totalValue.toFixed(2)} total</div>
              </div>
              <button
                onClick={() => setStep('redeem')}
                className="px-6 py-3 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Continue →
              </button>
            </motion.div>
          )}
        </>
      ) : (
        <div className="max-w-lg">
          {/* Choose cash or ship */}
          <h2 className="text-xl font-bold mb-5">How would you like to redeem?</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {([
              { key: 'cash', icon: Banknote, title: 'Cash Out', desc: 'Receive GBP within 2–3 days' },
              { key: 'ship', icon: Truck, title: 'Ship Cards', desc: 'Physical delivery in 5–7 days' },
            ] as const).map(({ key, icon: Icon, title, desc }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  mode === key ? 'bg-[#f5c842]/10 border-[#f5c842]/40' : 'bg-[#0f1117] border-white/5 hover:border-white/15'
                }`}
              >
                <Icon size={24} className="mb-3" style={{ color: mode === key ? '#f5c842' : '#6b7280' }} />
                <div className="font-bold">{title}</div>
                <div className="text-xs text-gray-500 mt-1">{desc}</div>
              </button>
            ))}
          </div>

          {/* Shipping form */}
          <AnimatePresence>
            {mode === 'ship' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mb-6"
              >
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'John Smith' },
                  { key: 'line1', label: 'Address', placeholder: '123 Football Lane' },
                  { key: 'city', label: 'City', placeholder: 'London' },
                  { key: 'postcode', label: 'Postcode', placeholder: 'SW1A 1AA' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                    <input
                      value={shipping[key as keyof typeof shipping]}
                      onChange={e => setShipping(s => ({ ...s, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 bg-[#0f1117] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#f5c842]/40 placeholder-gray-600"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="px-6 py-3 border border-white/10 text-gray-400 rounded-xl hover:border-white/25 transition-all text-sm font-medium"
            >
              Back
            </button>
            <button
              onClick={handleRedeem}
              disabled={!mode || loading}
              className="flex-1 py-3 bg-gradient-to-r from-[#f5c842] to-[#ff6b35] text-black font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Confirm Redemption — £${totalValue.toFixed(2)}`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

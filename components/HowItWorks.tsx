'use client'

import { motion } from 'framer-motion'
import { Wallet, Package, Sparkles, Truck } from 'lucide-react'

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Connect your Phantom, Solflare, or Backpack wallet to get started.',
    color: '#00c2ff',
  },
  {
    icon: Package,
    title: 'Choose Your Pack',
    description: 'Browse real Topps and Panini packs. Pay with SOL in seconds.',
    color: '#f5c842',
  },
  {
    icon: Sparkles,
    title: 'Rip & Reveal',
    description: 'Open your pack with a slick on-screen reveal. Every card is the real deal.',
    color: '#a78bfa',
  },
  {
    icon: Truck,
    title: 'Cash Out or Ship',
    description: 'Sell your cards for GBP or request physical delivery — your choice.',
    color: '#00ff87',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-xs text-[#f5c842] uppercase tracking-widest font-semibold mb-3">Process</div>
          <h2 className="text-3xl sm:text-4xl font-black">How It Works</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Four simple steps from wallet to card in hand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative p-6 rounded-2xl bg-[#0f1117] border border-white/5 group hover:border-white/10 transition-all"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                0{i + 1}
              </div>

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={22} style={{ color }} />
              </div>

              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

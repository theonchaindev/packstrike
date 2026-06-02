'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Menu, X, Zap, Trophy, Star, Package } from 'lucide-react'

const links = [
  { href: '/packs', label: 'Packs', icon: Package },
  { href: '/world-cup', label: 'World Cup', icon: Trophy },
  { href: '/rewards', label: 'Rewards', icon: Star },
  { href: '/collection', label: 'My Collection', icon: Zap },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#07080c]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-[#f5c842] to-[#ff6b35] rounded-lg flex items-center justify-center font-bold text-black text-sm">
              PS
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f5c842] to-[#ff6b35] rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
          <span className="font-black text-xl tracking-tight hidden sm:block">
            Pack<span className="text-[#f5c842]">Strike</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                  active
                    ? 'text-[#f5c842]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Wallet + mobile menu */}
        <div className="flex items-center gap-3">
          <WalletMultiButton
            style={{
              background: 'linear-gradient(135deg, #f5c842 0%, #ff6b35 100%)',
              color: '#000',
              fontWeight: '700',
              fontSize: '13px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '8px',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-[#07080c]/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname.startsWith(href)
                      ? 'text-[#f5c842] bg-white/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#07080c] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#f5c842] to-[#ff6b35] rounded-lg flex items-center justify-center font-bold text-black text-sm">
                PS
              </div>
              <span className="font-black text-xl tracking-tight">Pack<span className="text-[#f5c842]">Strike</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              The premier destination for football card packs on Solana. Open real packs. Real cards.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/packs" className="hover:text-white transition-colors">All Packs</Link></li>
              <li><Link href="/world-cup" className="hover:text-white transition-colors">World Cup</Link></li>
              <li><Link href="/packs?series=topps" className="hover:text-white transition-colors">Topps</Link></li>
              <li><Link href="/packs?series=panini" className="hover:text-white transition-colors">Panini</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/collection" className="hover:text-white transition-colors">My Collection</Link></li>
              <li><Link href="/rewards" className="hover:text-white transition-colors">Rewards</Link></li>
              <li><Link href="/redeem" className="hover:text-white transition-colors">Redeem Cards</Link></li>
              <li><Link href="/account" className="hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Info</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">© 2026 PackStrike. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Powered by Solana · Real Topps & Panini Packs</p>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { SolanaProvider } from '@/components/SolanaProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WalletSessionSync from '@/components/WalletSessionSync'
import DemoModeBanner from '@/components/DemoModeBanner'

export const metadata: Metadata = {
  title: 'PackStrike — Football Cards on Solana',
  description: 'Open real Topps and Panini football card packs. Pay with SOL, cash out or get cards shipped.',
  openGraph: {
    title: 'PackStrike',
    description: 'Open real football card packs on Solana',
    images: ['/og.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#07080c] text-[#f0f2f8]">
        <SolanaProvider>
          <WalletSessionSync />
          <DemoModeBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SolanaProvider>
      </body>
    </html>
  )
}

import { getUser } from '@/lib/auth'
import CollectionClient from './CollectionClient'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CollectionPage() {
  let user = null
  let userCards: Parameters<typeof CollectionClient>[0]['cards'] = []

  try {
    const { prisma } = await import('@/lib/prisma')
    user = await getUser()
    if (user) {
      userCards = await prisma.userCard.findMany({
        where: { userId: user.id },
        include: { card: true },
        orderBy: { createdAt: 'desc' },
      })
    }
  } catch {
    // DB not connected
  }

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-black mb-3">Connect Your Wallet</h1>
        <p className="text-gray-500 mb-6">Connect your Solana wallet to view your collection.</p>
        <Link href="/packs" className="px-6 py-3 bg-[#f5c842] text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
          Browse Packs
        </Link>
      </div>
    )
  }

  return <CollectionClient cards={userCards} user={user} />
}

import { getUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import RedeemClient from './RedeemClient'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function RedeemPage() {
  const user = await getUser()

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-black mb-3">Connect Your Wallet</h1>
        <p className="text-gray-500 mb-6">Connect wallet to redeem your cards.</p>
        <Link href="/" className="px-6 py-3 bg-[#f5c842] text-black font-bold rounded-xl hover:opacity-90 transition-opacity">
          Go Home
        </Link>
      </div>
    )
  }

  const userCards = await prisma.userCard.findMany({
    where: { userId: user.id, redeemed: false },
    include: { card: true },
    orderBy: { createdAt: 'desc' },
  })

  return <RedeemClient cards={userCards} user={user} />
}

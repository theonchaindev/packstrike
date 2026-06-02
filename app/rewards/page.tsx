import RewardsClient from './RewardsClient'

export const dynamic = 'force-dynamic'

const STATIC_REWARDS = [
  { id: 'r1', name: 'First Pack Free', description: 'Open your very first pack on us!', xpRequired: 0, type: 'free_pack', value: '', imageUrl: '' },
  { id: 'r2', name: 'Silver Collector', description: '5% discount on your next purchase.', xpRequired: 500, type: 'discount', value: '5', imageUrl: '' },
  { id: 'r3', name: 'Gold Collector', description: 'Exclusive Gold Mosaic guaranteed in next pack.', xpRequired: 1500, type: 'guaranteed_card', value: '', imageUrl: '' },
  { id: 'r4', name: 'Platinum Legend', description: 'Free premium pack — your choice.', xpRequired: 5000, type: 'free_premium_pack', value: 'choice', imageUrl: '' },
  { id: 'r5', name: 'Pack Master', description: 'Exclusive Pack Master card — 1 of 10.', xpRequired: 10000, type: 'exclusive_card', value: 'pack-master', imageUrl: '' },
]

export default async function RewardsPage() {
  let rewards: { id: string; name: string; description: string; xpRequired: number; type: string; value: string; imageUrl?: string | null }[] = STATIC_REWARDS
  let user = null
  try {
    const { prisma } = await import('@/lib/prisma')
    const { getUser } = await import('@/lib/auth')
    const [dbRewards, dbUser] = await Promise.all([
      prisma.reward.findMany({ where: { isActive: true }, orderBy: { xpRequired: 'asc' } }),
      getUser(),
    ])
    if (dbRewards.length > 0) rewards = dbRewards
    user = dbUser
  } catch {
    // static fallback
  }
  return <RewardsClient rewards={rewards} user={user} />
}

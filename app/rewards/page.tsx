import { prisma } from '@/lib/prisma'
import { getUser } from '@/lib/auth'
import RewardsClient from './RewardsClient'

export const dynamic = 'force-dynamic'

export default async function RewardsPage() {
  const user = await getUser()
  const rewards = await prisma.reward.findMany({
    where: { isActive: true },
    orderBy: { xpRequired: 'asc' },
  })
  return <RewardsClient rewards={rewards} user={user} />
}

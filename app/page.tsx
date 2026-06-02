import HeroSection from '@/components/HeroSection'
import FeaturedPacks from '@/components/FeaturedPacks'
import WorldCupBanner from '@/components/WorldCupBanner'
import RewardsTease from '@/components/RewardsTease'
import HowItWorks from '@/components/HowItWorks'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featuredPacks = await prisma.pack.findMany({
    where: { isFeatured: true, isActive: true },
    orderBy: { createdAt: 'desc' },
    take: 3,
  })

  const worldCupPacks = await prisma.pack.findMany({
    where: { isWorldCup: true, isActive: true },
    orderBy: { price: 'desc' },
    take: 2,
  })

  const stats = await prisma.$transaction([
    prisma.pack.count(),
    prisma.order.count({ where: { status: 'completed' } }),
    prisma.user.count(),
  ])

  return (
    <>
      <HeroSection stats={{ packs: stats[0], orders: stats[1], users: stats[2] }} />
      <FeaturedPacks packs={featuredPacks} />
      <WorldCupBanner packs={worldCupPacks} />
      <HowItWorks />
      <RewardsTease />
    </>
  )
}

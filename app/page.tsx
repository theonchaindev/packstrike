import HeroSection from '@/components/HeroSection'
import FeaturedPacks from '@/components/FeaturedPacks'
import WorldCupBanner from '@/components/WorldCupBanner'
import RewardsTease from '@/components/RewardsTease'
import HowItWorks from '@/components/HowItWorks'
import { PACK_CATALOG } from '@/lib/packData'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let featuredPacks = PACK_CATALOG.filter(p => p.isFeatured).slice(0, 3)
  let worldCupPacks = PACK_CATALOG.filter(p => p.isWorldCup).slice(0, 2)
  let stats = { packs: PACK_CATALOG.length, orders: 2847, users: 1203 }

  try {
    const { prisma } = await import('@/lib/prisma')
    const [fp, wcp, packCount, orderCount, userCount] = await Promise.all([
      prisma.pack.findMany({ where: { isFeatured: true, isActive: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
      prisma.pack.findMany({ where: { isWorldCup: true, isActive: true }, orderBy: { price: 'desc' }, take: 2 }),
      prisma.pack.count(),
      prisma.order.count({ where: { status: 'completed' } }),
      prisma.user.count(),
    ])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (fp.length > 0) featuredPacks = fp as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (wcp.length > 0) worldCupPacks = wcp as any
    stats = { packs: packCount || PACK_CATALOG.length, orders: orderCount || 2847, users: userCount || 1203 }
  } catch { /* static fallback */ }

  return (
    <>
      <HeroSection stats={stats} />
      <FeaturedPacks packs={featuredPacks} />
      <WorldCupBanner packs={worldCupPacks} />
      <HowItWorks />
      <RewardsTease />
    </>
  )
}

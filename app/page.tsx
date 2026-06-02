import HeroSection from '@/components/HeroSection'
import FeaturedPacks from '@/components/FeaturedPacks'
import WorldCupBanner from '@/components/WorldCupBanner'
import RewardsTease from '@/components/RewardsTease'
import HowItWorks from '@/components/HowItWorks'

export const dynamic = 'force-dynamic'

// Static fallback data shown when no DB is connected yet
const STATIC_PACKS = [
  {
    id: 'static-1',
    name: 'Panini Prizm World Cup 2026',
    series: 'Panini Prizm',
    edition: 'World Cup 2026',
    description: 'The ultimate World Cup collection. Chase Prizm parallels of the world\'s greatest footballers.',
    price: 29.99, solPrice: 0.18, imageUrl: '', rarity: 'premium',
    stock: 500, sold: 123, isFeatured: true, isWorldCup: true, xpReward: 150,
  },
  {
    id: 'static-2',
    name: 'Topps Chrome UCL 2025-26',
    series: 'Topps Chrome',
    edition: 'UEFA Champions League 2025-26',
    description: 'Chrome refractor technology meets Champions League glory.',
    price: 24.99, solPrice: 0.15, imageUrl: '', rarity: 'premium',
    stock: 300, sold: 89, isFeatured: true, isWorldCup: false, xpReward: 120,
  },
  {
    id: 'static-3',
    name: 'Topps Finest Bundesliga',
    series: 'Topps Finest',
    edition: 'Bundesliga 2025-26',
    description: 'Finest chromium technology showcasing Bundesliga talent. Every card a potential gem.',
    price: 34.99, solPrice: 0.21, imageUrl: '', rarity: 'elite',
    stock: 200, sold: 67, isFeatured: true, isWorldCup: false, xpReward: 200,
  },
]

const STATIC_WC_PACKS = [
  STATIC_PACKS[0],
  {
    id: 'static-4',
    name: 'Topps Match Attax World Cup',
    series: 'Topps Match Attax',
    edition: 'World Cup Special Edition',
    description: 'Collector\'s edition Match Attax with World Cup legends and rising stars.',
    price: 9.99, solPrice: 0.06, imageUrl: '', rarity: 'standard',
    stock: 2000, sold: 340, isFeatured: false, isWorldCup: true, xpReward: 40,
  },
]

export default async function HomePage() {
  let featuredPacks = STATIC_PACKS
  let worldCupPacks = STATIC_WC_PACKS
  let stats = { packs: 6, orders: 2847, users: 1203 }

  try {
    const { prisma } = await import('@/lib/prisma')
    const [fp, wcp, packCount, orderCount, userCount] = await Promise.all([
      prisma.pack.findMany({ where: { isFeatured: true, isActive: true }, orderBy: { createdAt: 'desc' }, take: 3 }),
      prisma.pack.findMany({ where: { isWorldCup: true, isActive: true }, orderBy: { price: 'desc' }, take: 2 }),
      prisma.pack.count(),
      prisma.order.count({ where: { status: 'completed' } }),
      prisma.user.count(),
    ])
    if (fp.length > 0) featuredPacks = fp
    if (wcp.length > 0) worldCupPacks = wcp
    stats = { packs: packCount || 6, orders: orderCount || 2847, users: userCount || 1203 }
  } catch {
    // DB not connected — show static fallback
  }

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

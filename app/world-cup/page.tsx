import WorldCupClient from './WorldCupClient'

export const dynamic = 'force-dynamic'

const STATIC_WC_PACKS = [
  { id: 'static-1', name: 'Panini Prizm World Cup 2026', series: 'Panini Prizm', edition: 'World Cup 2026', description: 'The ultimate World Cup collection.', price: 29.99, solPrice: 0.18, imageUrl: '', rarity: 'premium', stock: 500, sold: 123, isFeatured: true, isWorldCup: true, xpReward: 150 },
  { id: 'static-5', name: 'Topps Match Attax World Cup', series: 'Topps Match Attax', edition: 'World Cup Special Edition', description: "Collector's edition Match Attax.", price: 9.99, solPrice: 0.06, imageUrl: '', rarity: 'standard', stock: 2000, sold: 340, isFeatured: false, isWorldCup: true, xpReward: 40 },
]

export default async function WorldCupPage() {
  let packs = STATIC_WC_PACKS
  try {
    const { prisma } = await import('@/lib/prisma')
    const dbPacks = await prisma.pack.findMany({ where: { isWorldCup: true, isActive: true }, orderBy: { price: 'desc' } })
    if (dbPacks.length > 0) packs = dbPacks
  } catch {
    // static fallback
  }
  return <WorldCupClient packs={packs} />
}

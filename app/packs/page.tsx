import PacksGrid from './PacksGrid'

export const dynamic = 'force-dynamic'

const STATIC_PACKS = [
  { id: 'static-1', name: 'Panini Prizm World Cup 2026', series: 'Panini Prizm', edition: 'World Cup 2026', description: 'The ultimate World Cup collection.', price: 29.99, solPrice: 0.18, imageUrl: '', rarity: 'premium', stock: 500, sold: 123, isFeatured: true, isWorldCup: true, xpReward: 150 },
  { id: 'static-2', name: 'Topps Chrome UCL 2025-26', series: 'Topps Chrome', edition: 'UEFA Champions League 2025-26', description: 'Chrome refractor technology meets Champions League glory.', price: 24.99, solPrice: 0.15, imageUrl: '', rarity: 'premium', stock: 300, sold: 89, isFeatured: true, isWorldCup: false, xpReward: 120 },
  { id: 'static-3', name: 'Topps Finest Bundesliga', series: 'Topps Finest', edition: 'Bundesliga 2025-26', description: 'Finest chromium technology.', price: 34.99, solPrice: 0.21, imageUrl: '', rarity: 'elite', stock: 200, sold: 67, isFeatured: true, isWorldCup: false, xpReward: 200 },
  { id: 'static-4', name: 'Panini Mosaic Premier League', series: 'Panini Mosaic', edition: 'Premier League 2025-26', description: 'Stunning mosaic design meets Premier League talent.', price: 19.99, solPrice: 0.12, imageUrl: '', rarity: 'standard', stock: 1000, sold: 210, isFeatured: false, isWorldCup: false, xpReward: 75 },
  { id: 'static-5', name: 'Topps Match Attax World Cup', series: 'Topps Match Attax', edition: 'World Cup Special Edition', description: "Collector's edition Match Attax.", price: 9.99, solPrice: 0.06, imageUrl: '', rarity: 'standard', stock: 2000, sold: 340, isFeatured: false, isWorldCup: true, xpReward: 40 },
  { id: 'static-6', name: 'Panini Adrenalyn XL La Liga', series: 'Panini Adrenalyn XL', edition: 'La Liga 2025-26', description: 'The iconic Adrenalyn XL format returns.', price: 14.99, solPrice: 0.09, imageUrl: '', rarity: 'standard', stock: 800, sold: 155, isFeatured: false, isWorldCup: false, xpReward: 60 },
]

export default async function PacksPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string; rarity?: string; worldcup?: string }>
}) {
  const params = await searchParams
  let packs = STATIC_PACKS

  try {
    const { prisma } = await import('@/lib/prisma')
    const where: Record<string, unknown> = { isActive: true }
    if (params.series) where.series = { contains: params.series, mode: 'insensitive' }
    if (params.rarity) where.rarity = params.rarity
    if (params.worldcup === '1') where.isWorldCup = true
    const dbPacks = await prisma.pack.findMany({ where, orderBy: { createdAt: 'desc' } })
    if (dbPacks.length > 0) packs = dbPacks
  } catch {
    // static fallback
  }

  return <PacksGrid packs={packs} filters={params} />
}

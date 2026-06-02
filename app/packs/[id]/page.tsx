import { notFound } from 'next/navigation'
import { PACK_CATALOG, type PackDef } from '@/lib/packData'
import PackDetail from './PackDetail'

export const dynamic = 'force-dynamic'

// Convert static PackDef → PackDetail shape
function toPackDetailShape(p: PackDef) {
  return {
    id: p.id,
    name: p.name,
    series: p.series,
    edition: p.edition,
    description: p.description,
    price: p.price,
    solPrice: p.solPrice,
    rarity: p.rarity,
    stock: p.stock,
    sold: p.sold,
    isFeatured: p.isFeatured,
    isWorldCup: p.isWorldCup,
    xpReward: p.xpReward,
    packCards: p.cards.map(c => ({
      probability: c.probability,
      card: {
        id: c.id,
        player: c.player,
        team: c.team,
        rarity: c.rarity,
        cashValue: c.cashValue,
        number: c.number ?? null,
        totalPrint: c.totalPrint ?? null,
        description: c.parallel ?? null,
      },
    })),
  }
}

export default async function PackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Try DB first
  try {
    const { prisma } = await import('@/lib/prisma')
    const pack = await prisma.pack.findUnique({
      where: { id },
      include: { packCards: { include: { card: true }, orderBy: { probability: 'asc' } } },
    })
    if (pack) return <PackDetail pack={pack} />
  } catch {
    // fall through
  }

  // Try static catalog by exact ID
  const staticPack = PACK_CATALOG.find(p => p.id === id)
  if (staticPack) return <PackDetail pack={toPackDetailShape(staticPack)} />

  notFound()
}

import { notFound } from 'next/navigation'
import PackDetail from './PackDetail'

export const dynamic = 'force-dynamic'

// Static pack data for when DB isn't connected
const STATIC_PACKS: Record<string, Parameters<typeof PackDetail>[0]['pack']> = {
  'static-1': {
    id: 'static-1', name: 'Panini Prizm World Cup 2026', series: 'Panini Prizm',
    edition: 'World Cup 2026', description: 'The ultimate World Cup collection. Chase Prizm parallels of the world\'s greatest footballers.',
    price: 29.99, solPrice: 0.18, rarity: 'premium', stock: 500, sold: 123,
    isFeatured: true, isWorldCup: true, xpReward: 150,
    packCards: [
      { probability: 0.01, card: { id: 'c1', player: 'Kylian Mbappé', team: 'Real Madrid', rarity: 'legendary', cashValue: 149.99, number: 1, totalPrint: 25, description: 'Gold Prizm /25' } },
      { probability: 0.05, card: { id: 'c2', player: 'Vinicius Jr.', team: 'Real Madrid', rarity: 'epic', cashValue: 44.99, number: 10, totalPrint: 149, description: 'Silver Prizm /149' } },
      { probability: 0.1,  card: { id: 'c3', player: 'Jude Bellingham', team: 'Real Madrid', rarity: 'rare', cashValue: 24.99, number: null, totalPrint: null, description: null } },
      { probability: 0.7,  card: { id: 'c4', player: 'Common Base', team: 'Various', rarity: 'common', cashValue: 1.99, number: null, totalPrint: null, description: null } },
    ],
  },
  'static-2': {
    id: 'static-2', name: 'Topps Chrome UCL 2025-26', series: 'Topps Chrome',
    edition: 'UEFA Champions League 2025-26', description: 'Chrome refractor technology meets Champions League glory. Find Atomic and Superfractor parallels.',
    price: 24.99, solPrice: 0.15, rarity: 'premium', stock: 300, sold: 89,
    isFeatured: true, isWorldCup: false, xpReward: 120,
    packCards: [
      { probability: 0.02, card: { id: 'c5', player: 'Erling Haaland', team: 'Manchester City', rarity: 'epic', cashValue: 59.99, number: 42, totalPrint: 99, description: 'Atomic Refractor /99' } },
      { probability: 0.08, card: { id: 'c6', player: 'Jude Bellingham', team: 'Real Madrid', rarity: 'rare', cashValue: 24.99, number: null, totalPrint: null, description: null } },
      { probability: 0.7,  card: { id: 'c7', player: 'Common Base', team: 'Various', rarity: 'common', cashValue: 1.99, number: null, totalPrint: null, description: null } },
    ],
  },
}

export default async function PackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const { prisma } = await import('@/lib/prisma')
    const pack = await prisma.pack.findUnique({
      where: { id },
      include: { packCards: { include: { card: true }, orderBy: { probability: 'asc' } } },
    })
    if (pack) return <PackDetail pack={pack} />
  } catch {
    // fall through to static
  }

  const staticPack = STATIC_PACKS[id]
  if (staticPack) return <PackDetail pack={staticPack} />

  notFound()
}

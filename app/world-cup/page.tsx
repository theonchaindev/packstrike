import { prisma } from '@/lib/prisma'
import WorldCupClient from './WorldCupClient'

export const dynamic = 'force-dynamic'

export default async function WorldCupPage() {
  const packs = await prisma.pack.findMany({
    where: { isWorldCup: true, isActive: true },
    orderBy: { price: 'desc' },
  })
  return <WorldCupClient packs={packs} />
}

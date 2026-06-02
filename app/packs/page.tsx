import { prisma } from '@/lib/prisma'
import PacksGrid from './PacksGrid'

export const dynamic = 'force-dynamic'

export default async function PacksPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string; rarity?: string; worldcup?: string }>
}) {
  const params = await searchParams
  const where: Record<string, unknown> = { isActive: true }
  if (params.series) where.series = { contains: params.series, mode: 'insensitive' }
  if (params.rarity) where.rarity = params.rarity
  if (params.worldcup === '1') where.isWorldCup = true

  const packs = await prisma.pack.findMany({ where, orderBy: { createdAt: 'desc' } })

  return <PacksGrid packs={packs} filters={params} />
}

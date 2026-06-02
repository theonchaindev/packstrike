import PacksGrid from './PacksGrid'
import { PACK_CATALOG } from '@/lib/packData'

export const dynamic = 'force-dynamic'

export default async function PacksPage({
  searchParams,
}: {
  searchParams: Promise<{ series?: string; rarity?: string; worldcup?: string }>
}) {
  const params = await searchParams

  // Try DB
  let packs: typeof PACK_CATALOG = []
  try {
    const { prisma } = await import('@/lib/prisma')
    const where: Record<string, unknown> = { isActive: true }
    if (params.series) where.series = { contains: params.series, mode: 'insensitive' }
    if (params.rarity) where.rarity = params.rarity
    if (params.worldcup === '1') where.isWorldCup = true
    const dbPacks = await prisma.pack.findMany({ where, orderBy: { createdAt: 'desc' } })
    if (dbPacks.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      packs = dbPacks as any
    }
  } catch { /* fall through */ }

  // Static fallback — apply filters
  if (packs.length === 0) {
    packs = PACK_CATALOG.filter(p => {
      if (params.series && !p.series.toLowerCase().includes(params.series.toLowerCase())) return false
      if (params.rarity && p.rarity !== params.rarity) return false
      if (params.worldcup === '1' && !p.isWorldCup) return false
      return true
    })
  }

  return <PacksGrid packs={packs} filters={params} />
}

import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PackDetail from './PackDetail'

export const dynamic = 'force-dynamic'

export default async function PackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pack = await prisma.pack.findUnique({
    where: { id },
    include: {
      packCards: {
        include: { card: true },
        orderBy: { probability: 'asc' },
      },
    },
  })

  if (!pack) notFound()

  return <PackDetail pack={pack} />
}

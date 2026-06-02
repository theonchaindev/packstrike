import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PackOpenClient from './PackOpenClient'

export const dynamic = 'force-dynamic'

export default async function OpenPackPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      pack: true,
      cards: { include: { card: true } },
    },
  })

  if (!order) notFound()
  if (order.status === 'opened' || order.cards.length > 0) {
    redirect(`/collection`)
  }

  return <PackOpenClient order={order} />
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params
  const session = await getSession()

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      pack: {
        include: {
          packCards: { include: { card: true } },
        },
      },
    },
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  if (order.status === 'opened') return NextResponse.json({ error: 'Already opened' }, { status: 400 })

  // Random card selection based on probability
  const packCards = order.pack.packCards
  const drawnCards = []

  // Draw 5 cards
  for (let i = 0; i < 5; i++) {
    const roll = Math.random()
    let cumulative = 0
    let chosen = packCards[packCards.length - 1]

    for (const pc of packCards) {
      cumulative += pc.probability
      if (roll <= cumulative) { chosen = pc; break }
    }
    drawnCards.push(chosen.card)
  }

  // Save order cards and user cards
  await prisma.$transaction([
    ...drawnCards.map(card =>
      prisma.orderCard.create({ data: { orderId, cardId: card.id } })
    ),
    ...(session
      ? drawnCards.map(card =>
          prisma.userCard.create({ data: { userId: session.userId, cardId: card.id, orderId } })
        )
      : []),
    prisma.order.update({
      where: { id: orderId },
      data: { status: 'opened', openedAt: new Date() },
    }),
    ...(session
      ? [prisma.user.update({
          where: { id: session.userId },
          data: {
            xpPoints: { increment: order.pack.xpReward },
            totalSpent: { increment: order.solAmount },
          },
        })]
      : []),
  ])

  return NextResponse.json({ cards: drawnCards })
}

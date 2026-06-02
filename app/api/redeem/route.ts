import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

  const { cardIds, redeemOption, shipping } = await req.json()
  if (!cardIds?.length || !redeemOption) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const userCards = await prisma.userCard.findMany({
    where: { id: { in: cardIds }, userId: session.userId, redeemed: false },
  })
  if (userCards.length !== cardIds.length) {
    return NextResponse.json({ error: 'Invalid card selection' }, { status: 400 })
  }

  await prisma.userCard.updateMany({
    where: { id: { in: cardIds } },
    data: { redeemed: true },
  })

  // Store redeem details on first matching order (simplified)
  if (redeemOption === 'ship' && shipping) {
    await prisma.order.updateMany({
      where: {
        id: { in: userCards.map(c => c.orderId).filter(Boolean) as string[] },
        userId: session.userId,
      },
      data: {
        redeemOption: 'ship',
        shippingName: shipping.name,
        shippingLine1: shipping.line1,
        shippingCity: shipping.city,
        shippingPostcode: shipping.postcode,
        shippingCountry: shipping.country || 'GB',
      },
    })
  }

  return NextResponse.json({ success: true, redeemed: cardIds.length })
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { packId, txSignature, wallet } = await req.json()
  if (!packId || !wallet) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const pack = await prisma.pack.findUnique({ where: { id: packId } })
  if (!pack) return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
  if (pack.stock - pack.sold <= 0) return NextResponse.json({ error: 'Sold out' }, { status: 400 })

  let user = await prisma.user.findUnique({ where: { walletAddress: wallet } })
  if (!user) {
    user = await prisma.user.create({ data: { walletAddress: wallet } })
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      packId,
      txSignature,
      solAmount: pack.solPrice,
      status: 'paid',
    },
  })

  await prisma.pack.update({
    where: { id: packId },
    data: { sold: { increment: 1 } },
  })

  // Auto-sign session if not already set
  const cookieStore = await cookies()
  if (!cookieStore.get('ps-session')) {
    const token = await signToken({ userId: user.id, wallet })
    cookieStore.set('ps-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  return NextResponse.json({ orderId: order.id })
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { packId } = await req.json()
  if (!packId) return NextResponse.json({ error: 'Missing packId' }, { status: 400 })

  const pack = await prisma.pack.findUnique({ where: { id: packId } })
  if (!pack) return NextResponse.json({ error: 'Pack not found' }, { status: 404 })

  // Find or create a demo user
  const demoWallet = 'DEMO_' + Math.random().toString(36).slice(2, 10).toUpperCase()
  const user = await prisma.user.create({
    data: { walletAddress: demoWallet, username: 'Demo Player' },
  })

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      packId,
      txSignature: 'DEMO',
      solAmount: 0,
      status: 'paid',
    },
  })

  // Auto session for demo user
  const token = await signToken({ userId: user.id, wallet: demoWallet })
  const cookieStore = await cookies()
  cookieStore.set('ps-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return NextResponse.json({ orderId: order.id, demo: true })
}

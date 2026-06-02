import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { wallet } = await req.json()
  if (!wallet) return NextResponse.json({ error: 'Missing wallet' }, { status: 400 })

  let user = await prisma.user.findUnique({ where: { walletAddress: wallet } })
  if (!user) {
    user = await prisma.user.create({ data: { walletAddress: wallet } })
  }

  const token = await signToken({ userId: user.id, wallet })
  const cookieStore = await cookies()
  cookieStore.set('ps-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return NextResponse.json({ userId: user.id, wallet, xpPoints: user.xpPoints })
}

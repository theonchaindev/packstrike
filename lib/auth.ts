import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'packstrike-secret')

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('ps-session')?.value
  if (!token) return null
  try {
    const payload = await verifyToken(token)
    return payload as { userId: string; wallet: string }
  } catch {
    return null
  }
}

export async function getUser() {
  const session = await getSession()
  if (!session) return null
  return prisma.user.findUnique({ where: { id: session.userId } })
}

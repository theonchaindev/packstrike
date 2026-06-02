import { PrismaClient } from '@/app/generated/prisma'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createPrismaClient() {
  try {
    return new PrismaClient({ log: process.env.NODE_ENV === 'development' ? ['error'] : [] })
  } catch {
    return null as unknown as PrismaClient
  }
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

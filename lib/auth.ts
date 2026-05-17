import bcrypt from 'bcryptjs'
import { prisma } from './db'

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  const user = await prisma.adminUser.findUnique({ where: { username } })
  if (!user) return false
  return bcrypt.compare(password, user.password)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

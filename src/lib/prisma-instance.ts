import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../../generated/prisma/client'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
})

/**
 * Singleton instance of PrismaClient for database operations
 * @type {PrismaClient}
 */
const prismaInstance: PrismaClient = new PrismaClient({ adapter })

export { prismaInstance }
export default prismaInstance

import { prismaInstance } from '@/lib/prisma-instance'
import type { FastifyTypedInstance } from '@/types/fastify'
import { z } from 'zod'

const healthResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  timestamp: z.string(),
  uptime: z.number(),
  database: z.enum(['connected', 'disconnected']),
})

export async function healthRoutes(app: FastifyTypedInstance) {
  app.get(
    '/health',
    {
      schema: {
        tags: ['Health'],
        summary: 'Health Check',
        description: 'Check application and database health',
        response: {
          200: healthResponseSchema,
        },
      },
    },
    async (): Promise<z.infer<typeof healthResponseSchema>> => {
      const dbConnected = await prismaInstance.$connect().then(
        () => {
          prismaInstance.$disconnect()
          return 'connected' as const
        },
        () => 'disconnected' as const
      )

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: dbConnected,
      }
    }
  )

  return app
}

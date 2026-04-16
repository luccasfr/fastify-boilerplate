import type { FastifyTypedInstance } from '@/types/fastify'
import { healthRoutes } from './health'
import { userRoutes } from './user'

export async function routes(app: FastifyTypedInstance) {
  app.register(healthRoutes)
  app.register(userRoutes, { prefix: '/users' })

  return app
}

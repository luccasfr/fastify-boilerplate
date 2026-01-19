import { FastifyTypedInstance } from '../types/fastify.js'
import { userRoutes } from './user.js'

export async function routes(app: FastifyTypedInstance) {
  app.register(userRoutes, { prefix: '/users' })

  // Add more routes here as needed
  // app.register(otherRoutes, { prefix: "/other" });

  return app
}

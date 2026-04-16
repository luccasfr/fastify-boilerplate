import { env } from './config/env.config'
import { app } from './lib/fastify-instance'

await app.ready()
await app.listen({
  host: env.HOST,
  port: Number(env.PORT),
})
app.log.info(`Docs available at /docs`)

import {
  fastifyCorsOptions,
  fastifyJwtOptions,
  fastifyOptions,
  fastifySwaggerOptions,
  fastifySwaggerUiOptions,
} from '@/config/server.config'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import authHandler from '@/handlers/auth-handler'
import errorHandler from '@/handlers/error-handler'
import { routes } from '@/routes/index'

const app = fastify(fastifyOptions).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifyCors, fastifyCorsOptions)
app.register(fastifyJwt, fastifyJwtOptions)
app.register(fastifySwagger, fastifySwaggerOptions)
app.register(fastifySwaggerUi, fastifySwaggerUiOptions)
app.addHook('onRequest', authHandler)

app.register(routes)

export { app }

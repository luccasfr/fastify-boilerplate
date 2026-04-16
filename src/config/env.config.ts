import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string().default('5000'),
  HOST: z.string().default('0.0.0.0'),
  JWT_SECRET: z.string().min(32, {
    message: 'JWT_SECRET must be at least 32 characters long',
  }),
  DATABASE_URL: z.string().default('file:./dev.db'),
})

const parseEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `❌ Environment validation failed:\n${JSON.stringify(error.issues, null, 2)}`
      )
    }
    throw error
  }
}

export const env = parseEnv()

export type Env = z.infer<typeof envSchema>

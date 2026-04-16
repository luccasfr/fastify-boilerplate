import type { Env } from '@/config/env.config'

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Omit<Env, 'NODE_ENV'> {
      NODE_ENV?: Env['NODE_ENV']
    }
  }
}

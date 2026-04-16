import type { ZodTypeAny } from "zod"
import { userOutputSchema } from './user'

/**
 * Output schemas registered as OpenAPI components
 * Add new model output schemas here to make them available as $ref in Swagger
 */
export const schemas = {
  User: userOutputSchema,
} as const satisfies Record<string, ZodTypeAny>

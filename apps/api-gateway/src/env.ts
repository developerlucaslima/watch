import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .optional()
    .default('development'),
  ORIGIN_URL: z.string().url().optional().default('http://localhost:3000'),
  PORT: z.coerce.number().optional().default(3333),
  JWT_SECRET: z.string(),
  AWS_REGION: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  SQS_QUEUE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (
  !_env.success ||
  (_env.data.NODE_ENV === 'production' && !_env.data.JWT_SECRET)
) {
  console.error(
    'Invalid or missing environment variables',
    _env.error?.format?.(),
  )
  throw new Error('Invalid environment variables.')
}

export const env = _env.data

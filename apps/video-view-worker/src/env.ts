import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  AWS_REGION: z.string(),
  AWS_ACCOUNT_ID: z.string(),
  DATABASE_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid or missing environment variables', _env.error?.format?.())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data

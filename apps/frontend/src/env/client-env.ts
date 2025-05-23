import { z } from 'zod'

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
})

const _clientEnv = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
}

const parsed = clientEnvSchema.safeParse(_clientEnv)

if (!parsed.success) {
  console.error(
    '❌ Invalid CLIENT env vars:',
    JSON.stringify(parsed.error.format(), null, 2),
  )
  throw new Error('Invalid CLIENT env vars')
}

export const clientEnv = parsed.data

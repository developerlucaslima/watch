import { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type SignInFormData = z.infer<typeof signInSchema>

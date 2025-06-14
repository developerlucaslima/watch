import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Mínimo 6 caracteres'),
})

export type SignInFormData = z.infer<typeof signInSchema>

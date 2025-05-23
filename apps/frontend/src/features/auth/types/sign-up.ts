import { z } from 'zod'

export const signUpSchema = z.object({
  name: z
    .string({ required_error: 'Nome obrigatório' })
    .min(6, 'Mínimo 6 caracteres'),
  email: z
    .string({ required_error: 'E-mail obrigatório' })
    .email('E-mail inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Mínimo 6 caracteres'),
})

export type SignUpFormData = z.infer<typeof signUpSchema>

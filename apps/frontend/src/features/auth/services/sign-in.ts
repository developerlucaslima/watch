import { apiClientSide } from '@api/api-csr'
import type { User } from '@shared/types/user'

export interface SignInBody {
  email: string
  password: string
}

export async function signIn({ email, password }: SignInBody): Promise<User> {
  const response = await apiClientSide.post('/auth/sign-in', {
    email,
    password,
  })
  return response.data
}

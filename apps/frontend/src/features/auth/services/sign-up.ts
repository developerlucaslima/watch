import { apiClientSide } from '@api/api-csr'
import type { User } from '@shared/types/user'

export interface SignInBody {
  name: string
  email: string
  password: string
}
export async function signIn({
  name,
  email,
  password,
}: SignInBody): Promise<User> {
  const response = await apiClientSide.post('/auth/sign-up', {
    name,
    email,
    password,
  })
  return response.data
}

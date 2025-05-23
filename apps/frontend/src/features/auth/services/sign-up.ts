import { apiClientSide } from '@api/api-csr'
import type { User } from '@shared/types/user'

export interface SignUpBody {
  name: string
  email: string
  password: string
}
export async function signUp({
  name,
  email,
  password,
}: SignUpBody): Promise<User> {
  const response = await apiClientSide.post('/auth/sign-up', {
    name,
    email,
    password,
  })
  return response.data
}

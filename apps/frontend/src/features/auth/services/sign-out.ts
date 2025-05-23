import { apiClientSide } from '@api/api-csr'

export async function signOut() {
  await apiClientSide.post('/auth/sign-out')
}

import type { UserWithoutPassword } from '@shared/types/user'

export function mapAuthenticatedUserResponse(user: UserWithoutPassword) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

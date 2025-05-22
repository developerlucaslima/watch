import type { User, UserCreateParams } from '@shared/types/user'

export interface IUsersRepository {
  findById(id: string): Promise<User | null>

  // only for in memory tests
  create?(data: UserCreateParams): Promise<User>
}

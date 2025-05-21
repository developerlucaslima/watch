import type { User, UserCreateParams } from "@shared/types/user"

export interface IUsersRepository {
  create(data: UserCreateParams): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}

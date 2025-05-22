import type { User, UserCreateParams } from '@shared/types/user'
import { randomUUID } from 'crypto'

import type { IUsersRepository } from './users.interface-repository'

export class UsersInMemoryRepository implements IUsersRepository {
  private usersById = new Map<string, User>()
  private usersByEmail = new Map<string, User>()

  async create(data: UserCreateParams): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      createdAt: new Date(),
      ...data,
    }

    this.usersById.set(newUser.id, newUser)
    this.usersByEmail.set(newUser.email, newUser)

    return newUser
  }

  async findById(id: string): Promise<User | null> {
    return this.usersById.get(id) ?? null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersByEmail.get(email) ?? null
  }
}

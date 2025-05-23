import { prisma } from '@database/prisma'
import type { UserCreateParams } from '@shared/types/user'

import type { IUsersRepository } from './users.interface-repository'

export class UsersPrismaRepository implements IUsersRepository {
  async create(data: UserCreateParams) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }
}

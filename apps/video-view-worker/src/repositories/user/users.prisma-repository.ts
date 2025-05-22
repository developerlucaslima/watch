import { prisma } from '@database/prisma'

import type { IUsersRepository } from './users.interface-repository'

export class UsersPrismaRepository implements IUsersRepository {
  async findById(userId: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    return user
  }
}

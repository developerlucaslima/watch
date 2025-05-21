import type { IUsersRepository } from "./users.interface-repository";
import { prisma } from "@database/prisma";

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

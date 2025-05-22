import { UsersPrismaRepository } from '@auth/repositories/users.prisma-repository'
import { SignInUseCase } from '@auth/use-cases/sign-in.use-case'

export function makeSignIn() {
  const usersPrismaRepository = new UsersPrismaRepository()

  return new SignInUseCase(usersPrismaRepository)
}

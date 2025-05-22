import { UsersPrismaRepository } from '@auth/repositories/users.prisma-repository'
import { SignUpUseCase } from '@auth/use-cases/sign-up.use-case'

export function makeSignUp() {
  const usersPrismaRepository = new UsersPrismaRepository()

  return new SignUpUseCase(usersPrismaRepository)
}

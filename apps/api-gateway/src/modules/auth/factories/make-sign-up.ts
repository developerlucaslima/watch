import { UsersPrismaRepository } from "../repositories/users.prisma-repository"
import { SignUpUseCase } from "../use-cases/sign-up.use-case"

export function makeSignUp() {
  const usersPrismaRepository = new UsersPrismaRepository()

  const signUpUseCase = new SignUpUseCase(usersPrismaRepository)
  return signUpUseCase
}

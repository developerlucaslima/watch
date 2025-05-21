import { UsersPrismaRepository } from "../repositories/users.prisma-repository"
import { SignInUseCase } from "../use-cases/sign-in.use-case"

export function makeSignIn() {
  const usersPrismaRepository = new UsersPrismaRepository()

  const signInUseCase = new SignInUseCase(usersPrismaRepository)
  return signInUseCase
}

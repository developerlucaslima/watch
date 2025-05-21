import { SignInUseCase } from "../use-cases/sign-in.use-case"
import { UsersPrismaRepository } from "../repositories/users.prisma-repo"

export function makeSignIn() {
  const usersPrismaRepository = new UsersPrismaRepository()

  const signInUseCase = new SignInUseCase(usersPrismaRepository)
  return signInUseCase
}

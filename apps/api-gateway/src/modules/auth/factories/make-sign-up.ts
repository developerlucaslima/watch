import { SignUpUseCase } from "../controllers/sign-up.use-case"
import { UsersPrismaRepository } from "../repositories/users.prisma-repo"

export function makeSignUp() {
  const usersPrismaRepository = new UsersPrismaRepository()

  const signUpUseCase = new SignUpUseCase(usersPrismaRepository)
  return signUpUseCase
}

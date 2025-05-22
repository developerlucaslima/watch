import type { IUsersRepository } from '@auth/repositories/users.interface-repository'
import { InvalidCredentialsException } from '@shared/errors/invalid-credentials.exception'
import type { UserWithoutPassword } from '@shared/types/user'
import { compare } from 'bcryptjs'

interface SignInUseCaseRequest {
  email: string
  password: string
}

interface SignInUseCaseResponse {
  user: UserWithoutPassword
}

export class SignInUseCase {
  constructor(private readonly usersRepo: IUsersRepository) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    // It should prevent user authenticate with wrong email.
    const byEmail = await this.usersRepo.findByEmail(email)
    if (!byEmail) {
      throw new InvalidCredentialsException()
    }

    // It should prevent user authenticate with wrong password.
    const correctPassword = await compare(password, byEmail.passwordHash)
    if (!correctPassword) {
      throw new InvalidCredentialsException()
    }

    // It should return user without passwordHash.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = byEmail
    return {
      user: safeUser,
    }
  }
}

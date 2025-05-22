import type { IUsersRepository } from '@auth/repositories/users.interface-repository'
import { EmailNotAvailableException } from '@shared/errors/email-not-available.exception'
import { InvalidRequestException } from '@shared/errors/invalid-request.exception'
import type { UserWithoutPassword } from '@shared/types/user'
import { hash } from 'bcryptjs'

interface SignUpUseCaseRequest {
  name: string
  email: string
  password: string
}

interface SignUpUseCaseResponse {
  user: UserWithoutPassword
}

export class SignUpUseCase {
  constructor(private readonly usersRepo: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    // It should throw InvalidRequestException if the password not received registered.
    if (!password) {
      throw new InvalidRequestException('Password is required.')
    }

    // It should throw EmailNotAvailableException if the email is already registered.
    const byEmail = await this.usersRepo.findByEmail(email)
    if (byEmail) {
      throw new EmailNotAvailableException()
    }

    // It should hash the password before creating the user.
    const hashedPassword = await hash(password, 8)

    // It should create a new user with hashed password.
    const createdUser = await this.usersRepo.create({
      name,
      email,
      passwordHash: hashedPassword,
    })

    // It should return the created user without the passwordHash.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...safeUser } = createdUser
    return {
      user: safeUser,
    }
  }
}

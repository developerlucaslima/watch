import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSignUp } from '../factories/make-sign-up'
import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_EXPIRATION_SECONDS } from 'middlewares/jwt/jwt-config'
import { setAuthCookies } from 'middlewares/jwt/set-auth-cookies'
import { mapAuthenticatedUserResponse } from '../dtos/user'

const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signUpController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, password } = signUpSchema.parse(request.body)

  const signUpUseCase = makeSignUp()
  const { user } = await signUpUseCase.execute({
    name,
    email,
    password,
  })

  const accessToken = await reply.jwtSign({
    sign: {
      sub: user.id,
      expiresIn: `${ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
    },
  })

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: user.id,
      expiresIn: `${REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
    },
  })

  setAuthCookies(reply, accessToken, refreshToken)

  return reply.status(201).send(mapAuthenticatedUserResponse(user))
}

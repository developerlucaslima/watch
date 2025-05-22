import { mapAuthenticatedUserResponse } from '@auth/dtos/user'
import { makeSignIn } from '@auth/factories/make-sign-in'
import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_EXPIRATION_SECONDS } from '@middlewares/jwt/jwt-config'
import { setAuthCookies } from '@middlewares/jwt/set-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signInController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = signInSchema.parse(request.body)
  const signInUseCase = makeSignIn()
  const { user } = await signInUseCase.execute({
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

  return reply.status(200).send(mapAuthenticatedUserResponse(user))
}

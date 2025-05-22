import { ACCESS_TOKEN_EXPIRATION_SECONDS, REFRESH_TOKEN_EXPIRATION_SECONDS } from '@middlewares/jwt/jwt-config'
import { setAuthCookies } from '@middlewares/jwt/set-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshTokenController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true })

  const newAccessToken = await reply.jwtSign(
    {
      sign: {
        sub: request.user,
        expiresIn: `${ACCESS_TOKEN_EXPIRATION_SECONDS}s`,
      },
    },
  )

  const newRefreshToken = await reply.jwtSign(
    {
      sign: {
        sub: request.user,
        expiresIn: `${REFRESH_TOKEN_EXPIRATION_SECONDS}s`,
      },
    },
  )

  setAuthCookies(reply, newAccessToken, newRefreshToken)

  return reply.status(200).send({
    message: 'Token refreshed successfully.',
  })
}

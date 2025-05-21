import type { FastifyReply, FastifyRequest } from 'fastify'
import { clearAuthCookies } from 'middlewares/jwt/clear-auth-cookies'

export async function signOutController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  clearAuthCookies(reply)

  return reply.status(200).send({
    message: 'Logged out successfully.',
  })
}

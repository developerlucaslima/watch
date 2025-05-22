import { clearAuthCookies } from '@middlewares/jwt/clear-auth-cookies'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function signOutController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  clearAuthCookies(reply)

  return reply.status(200).send({
    message: 'Logged out successfully.',
  })
}

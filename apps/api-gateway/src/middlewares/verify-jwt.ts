import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  if (request.method === 'OPTIONS') return

  try {
    await request.jwtVerify()
  } catch {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}

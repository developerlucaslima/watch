import type { FastifyInstance } from "fastify"
import type { JwtUser } from "../types"

export async function authPlugin(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      app.log.warn('Missing authorization token')
      return reply.status(401).send({ error: 'Unauthorized' })
    }

    try {
      const decoded = await app.jwt.verify<JwtUser>(token)
      request.user = decoded
    } catch (error) {
      app.log.warn({ error }, 'Invalid JWT token')
      return reply.status(401).send({ error: 'Invalid token' })
    }
  })
}

import type { FastifyInstance } from 'fastify'

export function preflightRegister(app: FastifyInstance) {
  app.options('*', (request, reply) => {
    const origin = request.headers.origin

    if (!origin) {
      reply.status(400).send({ error: 'Missing origin header' })
      return
    }

    reply
      .code(204)
      .headers({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      })
      .send()

    return
  })
}

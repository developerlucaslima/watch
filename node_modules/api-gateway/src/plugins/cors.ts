import { env } from '@env'
import fastifyCors from '@fastify/cors'
import type { FastifyInstance } from 'fastify'

export function corsRegister(app: FastifyInstance) {
  const corsOrigins =
    env.NODE_ENV !== 'production'
      ? [env.ORIGIN_URL, 'http://localhost:3000']
      : [env.ORIGIN_URL]

  app.register(fastifyCors, {
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
}

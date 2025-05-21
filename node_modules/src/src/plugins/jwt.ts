import { env } from '@env'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'

export function jwtRegister(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      expiresIn: '10m',
    },
  })

  app.register(fastifyCookie)
}

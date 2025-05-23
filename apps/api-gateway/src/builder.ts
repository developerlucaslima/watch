import { corsRegister } from '@plugins/cors'
import { errorsRegister } from '@plugins/errors'
import { jwtRegister } from '@plugins/jwt'
import { routesRegister } from '@plugins/routes'
import fastify from 'fastify'

export function builder() {
  const app = fastify({ logger: true })

  corsRegister(app)
  jwtRegister(app)
  routesRegister(app)
  errorsRegister(app)

  return app
}

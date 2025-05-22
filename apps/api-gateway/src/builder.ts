import fastify from 'fastify'

import { corsRegister } from '@plugins/cors'
import { routesRegister } from '@plugins/error'
import { jwtRegister } from '@plugins/jwt'

export function builder() {
  const app = fastify({ logger: true })

  corsRegister(app)
  jwtRegister(app)
  routesRegister(app)
  routesRegister(app)
  
  return app
}
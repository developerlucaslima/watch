import Fastify from 'fastify'

import { env } from './env'

import { corsRegister } from '@plugins/cors'
import { routesRegister } from '@plugins/error'
import { jwtRegister } from '@plugins/jwt'

export function buildApp() {
  const app = Fastify({ logger: true })

  corsRegister(app)
  jwtRegister(app)
  routesRegister(app)
  routesRegister(app)
  
  return app
}

const startApp = async () => {
  const app = buildApp()
  try {
    await app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
      console.log(`🚀 HTTP server running on port ${env.PORT}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
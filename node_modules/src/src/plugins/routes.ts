import type { FastifyInstance } from 'fastify'
import { watchRoutes } from '../routes/watch'

export function routesRegister(app: FastifyInstance) {
  app.register(watchRoutes, { prefix: '/watch' })
}

import { authRoutes } from '@modules/auth/routes/auth.route'
import { videosRoutes } from '@modules/videos/routes/videos.route'
import type { FastifyInstance } from 'fastify'

export function routesRegister(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' })
  app.register(videosRoutes, { prefix: '/videos' })
}

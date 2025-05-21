import type { FastifyInstance } from 'fastify'
import { verifyJwt } from '@middlewares/verify-jwt'
import { trackWatchController } from '../controllers/track-watch.controller'

export async function watchRoutes(app: FastifyInstance) {
  app.post('/:videoId', { onRequest: [verifyJwt] }, trackWatchController)
}

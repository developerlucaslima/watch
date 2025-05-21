import type { FastifyInstance } from 'fastify'
import { listVideosController } from '../controllers/list-videos.controller'
import { getVideoController } from '../controllers/get-video.controller'
import { verifyJwt } from '@middlewares/verify-jwt'

export async function videosRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.get('/', { onRequest: [verifyJwt] }, listVideosController)
  app.get('/:id', { onRequest: [verifyJwt] }, getVideoController)
}

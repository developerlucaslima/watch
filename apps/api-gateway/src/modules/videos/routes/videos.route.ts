import { verifyJwt } from '@middlewares/verify-jwt'
import { getVideoController } from '@videos/controllers/get-video.controller'
import { listVideosController } from '@videos/controllers/list-videos.controller'
import type { FastifyInstance } from 'fastify'

export async function videosRoutes(app: FastifyInstance) {
  /** Authenticated */
  app.get('/', { onRequest: [verifyJwt] }, listVideosController)
  app.get('/:id', { onRequest: [verifyJwt] }, getVideoController)
}

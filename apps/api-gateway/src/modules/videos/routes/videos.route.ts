import type { FastifyInstance } from 'fastify'
import { listVideosController } from '../controllers/list-videos.controller'
import { getVideoController } from '../controllers/get-video.controller'

export async function videosRoutes(app: FastifyInstance) {
  app.get('/', listVideosController)
  app.get('/:id', getVideoController)
}

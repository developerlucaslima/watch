import { publishWatchEventController } from '@watch/controllers/publish-watch-event.controller'
import { FastifyInstance } from 'fastify'

export async function watchRoutes(app: FastifyInstance) {
  await publishWatchEventController(app)
}

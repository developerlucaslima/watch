import { FastifyInstance } from 'fastify'
import { watchEventParamsSchema } from '../dtos/watch-event.dto'
import { PublishWatchEventUseCase } from '../use-cases/publish-watch-event.use-case'

export async function publishWatchEventController(app: FastifyInstance) {
  app.post('/watch/:videoId', async (request, reply) => {
    try {
      const { videoId } = watchEventParamsSchema.parse(request.params)
      const userId = request.user.sub

      const useCase = new PublishWatchEventUseCase()
      await useCase.execute({
        userId,
        videoId,
        timestamp: Date.now(),
      })

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof Error && error.message.includes('SQS')) {
        request.log.error(error, 'SQS error')
        return reply.status(503).send({ error: 'Service unavailable' })
      }

      request.log.error(error, 'Unhandled error in watch')
      return reply.status(500).send({ error: 'Internal server error' })
    }
  })
}

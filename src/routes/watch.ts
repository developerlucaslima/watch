import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { publishWatchEvent, SqsError } from '../services/sqs-producer'
import { WatchEvent } from '../types'

const watchParamsSchema = z.object({
  videoId: z.string().min(1, 'Video ID is required')
})

export async function watchRoutes(app: FastifyInstance) {
  app.post('/watch/:videoId', async (request, reply) => {
    try {
      // Validate params
      const { videoId } = watchParamsSchema.parse(request.params)
      const userId = request.user.sub

      const event: WatchEvent = {
        userId,
        videoId,
        timestamp: Date.now(),
      }

      await publishWatchEvent(event)
      return reply.status(204).send()

    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        app.log.warn({ error }, 'Invalid request parameters')
        return reply.status(400).send({ 
          error: 'Invalid request parameters',
          details: error.errors 
        })
      }

      // Handle SQS errors
      if (error instanceof SqsError) {
        app.log.error({ error }, 'Failed to process watch event')
        return reply.status(503).send({ 
          error: 'Service temporarily unavailable',
          message: 'Failed to process watch event'
        })
      }

      // Handle unexpected errors
      app.log.error({ error }, 'Unexpected error in watch route')
      return reply.status(500).send({ 
        error: 'Internal server error'
      })
    }
  })
}

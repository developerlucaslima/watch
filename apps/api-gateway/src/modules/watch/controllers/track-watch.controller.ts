import { makeTrackWatch } from '@watch/factories/make-track-watch'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  videoId: z.string().uuid(),
})

export async function trackWatchController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { videoId } = paramsSchema.parse(req.params)
  const userId = req.user.sub

  const useCase = makeTrackWatch()

  await useCase.execute({ videoId, userId })

  return reply.status(204).send()
}

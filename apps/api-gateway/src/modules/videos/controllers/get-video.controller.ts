import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetVideo } from '../factories/make-get-video'
import { z } from 'zod'
import { mapVideoResponse } from '../dtos/videos.dto'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function getVideoController(req: FastifyRequest, reply: FastifyReply) {
  const { id } = paramsSchema.parse(req.params)

  const useCase = makeGetVideo()
  const { video } = await useCase.execute({ id })

  return reply.status(200).send(mapVideoResponse(video))
}

import { mapVideoResponse } from '@videos/dtos/videos.dto'
import { makeGetVideo } from '@videos/factories/make-get-video'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid(),
})

export async function getVideoController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = paramsSchema.parse(req.params)

  const useCase = makeGetVideo()
  const { video } = await useCase.execute({ id })

  return reply.status(200).send(mapVideoResponse(video))
}

import { mapVideoResponse } from '@videos/dtos/videos.dto'
import { makeListVideos } from '@videos/factories/make-list-videos'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listVideosController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const useCase = makeListVideos()
  const { videos } = await useCase.execute()
  return reply.status(200).send(videos.map(mapVideoResponse))
}

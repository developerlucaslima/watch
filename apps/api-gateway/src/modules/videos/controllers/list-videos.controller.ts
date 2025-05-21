import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeListVideos } from '../factories/make-list-videos'
import { mapVideoResponse } from '../dtos/videos.dto'

export async function listVideosController(req: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListVideos()
  const { videos } = await useCase.execute()
  return reply.status(200).send(videos.map(mapVideoResponse))
}

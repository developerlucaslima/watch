import { VideosPrismaRepository } from '../repositories/videos.prisma-repository'
import { GetVideoUseCase } from '../use-cases/get-video.use-case'

export function makeGetVideo() {
  const videosPrismaRepository = new VideosPrismaRepository()
  
  return new GetVideoUseCase(videosPrismaRepository)
}

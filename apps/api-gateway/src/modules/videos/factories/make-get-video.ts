import { VideosPrismaRepository } from '@videos/repositories/videos.prisma-repository'
import { GetVideoUseCase } from '@videos/use-cases/get-video.use-case'

export function makeGetVideo() {
  const videosPrismaRepository = new VideosPrismaRepository()
  
  return new GetVideoUseCase(videosPrismaRepository)
}

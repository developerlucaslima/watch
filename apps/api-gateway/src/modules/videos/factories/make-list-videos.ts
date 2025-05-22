import { VideosPrismaRepository } from '@videos/repositories/videos.prisma-repository'
import { ListVideosUseCase } from '@videos/use-cases/list-videos.use-case'

export function makeListVideos() {
  const videosPrismaRepository = new VideosPrismaRepository()
  
  return new ListVideosUseCase(videosPrismaRepository)
}

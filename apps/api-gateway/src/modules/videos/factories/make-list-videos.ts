import { VideosPrismaRepository } from '../repositories/videos.prisma-repository'
import { ListVideosUseCase } from '../use-cases/list-videos.use-case'

export function makeListVideos() {
  const videosPrismaRepository = new VideosPrismaRepository()
  
  return new ListVideosUseCase(videosPrismaRepository)
}

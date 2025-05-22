import { ResourceNotFoundException } from '@shared/errors/resource-not-found.exception'
import type { Video } from '@shared/types/video'
import type { IVideosRepository } from '@videos/repositories/videos.interface-repository'

interface GetVideoRequest {
  id: string
}

interface GetVideoResponse {
  video: Video
}

export class GetVideoUseCase {
  constructor(private readonly videoRepo: IVideosRepository) {}

  async execute({ id }: GetVideoRequest): Promise<GetVideoResponse> {
    const video = await this.videoRepo.findById(id)

    if (!video) {
      throw new ResourceNotFoundException('Video')
    }

    return { video }
  }
}

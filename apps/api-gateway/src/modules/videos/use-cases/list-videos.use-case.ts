import type { Video } from '@shared/types/video'
import type { IVideosRepository } from '../repositories/videos.interface-repository'

interface ListVideosResponse {
  videos: Video[]
}

export class ListVideosUseCase {
  constructor(private readonly videoRepo: IVideosRepository) {}

  async execute(): Promise<ListVideosResponse> {
    const videos = await this.videoRepo.findAll()
    return { videos }
  }
}

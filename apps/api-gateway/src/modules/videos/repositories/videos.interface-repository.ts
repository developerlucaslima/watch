import type { Video, VideoCreateParams } from '@shared/types/video'

export interface IVideosRepository {
  findAll(): Promise<Video[]>
  findById(id: string): Promise<Video | null>
  
  // only for in memory tests
  create?(data: VideoCreateParams): Promise<Video>
}

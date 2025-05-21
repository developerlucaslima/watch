import { randomUUID } from 'crypto'
import type { Video, VideoCreateParams } from '@shared/types/video'
import type { IVideosRepository } from './videos.interface-repository'

export class VideosInMemoryRepository implements IVideosRepository {
  private videosById = new Map<string, Video>()

  async create(data: VideoCreateParams): Promise<Video> {
    const newVideo: Video = {
      id: randomUUID(),
      createdAt: new Date(),
      ...data,
    }

    this.videosById.set(newVideo.id, newVideo)
    return newVideo
  }

  async findById(id: string): Promise<Video | null> {
    return this.videosById.get(id) ?? null
  }
}

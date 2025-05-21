import { prisma } from '@database/prisma'
import type { IVideoViewsRepository } from './video-views.interface-repository'
import type { VideoViewCreateParams } from '@shared/types/video-view'

export class VideoViewsPrismaRepository implements IVideoViewsRepository {
  async register(data: VideoViewCreateParams) {
    await prisma.videoView.create({ data })
  }
}
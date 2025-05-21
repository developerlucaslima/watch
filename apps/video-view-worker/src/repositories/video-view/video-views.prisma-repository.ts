import { prisma } from '@database/prisma'
import type { IVideoViewsRepository } from './video-views.interface-repository'
import type { VideoViewRegisterParams } from '@shared/types/video-view'

export class VideoViewsPrismaRepository implements IVideoViewsRepository {
  async register(data: VideoViewRegisterParams) {
    await prisma.videoView.create({ data })
  }
}
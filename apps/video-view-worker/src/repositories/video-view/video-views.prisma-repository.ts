import { prisma } from '@database/prisma'
import type { VideoViewRegisterParams } from '@shared/types/video-view'

import type { IVideoViewsRepository } from './video-views.interface-repository'

export class VideoViewsPrismaRepository implements IVideoViewsRepository {
  async register(data: VideoViewRegisterParams) {
    await prisma.videoView.create({ data })
  }
}
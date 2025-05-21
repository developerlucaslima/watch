import type { IUsersRepository } from '@repositories/user/users.interface-repository'
import type { IVideoViewsRepository } from '@repositories/video-view/video-views.interface-repository'
import type { IVideosRepository } from '@repositories/video/videos.interface-repository'
import { InvalidRequestException } from '@shared/errors/invalid-request.exception'
import { ResourceNotFoundException } from '@shared/errors/resource-not-found.exception'

interface RegisterVideoViewRequest {
  userId: string
  videoId: string
}

export class RegisterVideoViewUseCase {
  constructor(
    private readonly videoViewsRepository: IVideoViewsRepository,
    private readonly usersRepository: IUsersRepository,
    private readonly videosRepository: IVideosRepository
  ) {}

  async execute({ userId, videoId }: RegisterVideoViewRequest): Promise<void> {
     // It should throw if userId or videoId is missing
     if (!userId?.trim()) {
      throw new InvalidRequestException('User ID is required.')
    }

    if (!videoId?.trim()) {
      throw new InvalidRequestException('Video ID is required.')
    }

    // It should throw ResourceNotFoundException if userId is not valid
    const userById = this.usersRepository.findById(userId)
    if (!userById) {
      throw new ResourceNotFoundException('User')
    }

    // It should throw if ResourceNotFoundException videoId is not valid
    const videoById = this.videosRepository.findById(videoId)
    if (!videoById) {
      throw new ResourceNotFoundException('Video')
    }

    // It should register a video-view
    await this.videoViewsRepository.register({
      userId,
      videoId,
    })
  }
}

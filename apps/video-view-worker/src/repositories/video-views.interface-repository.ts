import type { VideoView, VideoViewCreateParams } from "@shared/types/video-view"

export interface IVideoViewsRepository {
  register(data: VideoViewCreateParams): Promise<void>
}

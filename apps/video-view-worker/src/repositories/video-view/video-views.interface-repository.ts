import type { VideoViewRegisterParams } from "@shared/types/video-view"

export interface IVideoViewsRepository {
  register(data: VideoViewRegisterParams): Promise<void>
}

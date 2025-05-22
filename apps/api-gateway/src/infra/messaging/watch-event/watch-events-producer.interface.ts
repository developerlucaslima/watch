import type { VideoViewRegisterParams } from '@shared/types/video-view'

export interface IWatchEventsProducer {
  send(event: VideoViewRegisterParams): Promise<void>
}

import type { IWatchEventProducer } from "@services/watch-event-producer/watch-event-producer.interface"

interface TrackWatchRequest {
  videoId: string
  userId: string
}

export class TrackWatchUseCase {
  constructor(private readonly watchEventProducer: IWatchEventProducer) {}

  async execute({ videoId, userId }: TrackWatchRequest): Promise<void> {
    const event = {
      videoId,
      userId,
      timestamp: Date.now(),
    }

    await this.watchEventProducer.send(event)
  }
}

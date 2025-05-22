import type { IWatchEventsProducer } from "infra/messaging/watch-event/watch-events-producer.interface"

interface TrackWatchRequest {
  videoId: string
  userId: string
}

export class TrackWatchUseCase {
  constructor(private readonly watchEventProducer: IWatchEventsProducer) {}

  async execute({ videoId, userId }: TrackWatchRequest): Promise<void> {
    const event = {
      videoId,
      userId,
      timestamp: Date.now(),
    }

    await this.watchEventProducer.send(event)
  }
}

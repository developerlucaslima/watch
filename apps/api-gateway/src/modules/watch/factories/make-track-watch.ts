import { WatchEventsProducer } from '@infra/messaging/watch-event/watch-events-producer'
import { TrackWatchUseCase } from '@watch/use-cases/track-watch.use-case'

export function makeTrackWatch() {
  const watchEventProducer = new WatchEventsProducer()

  return new TrackWatchUseCase(watchEventProducer)
}

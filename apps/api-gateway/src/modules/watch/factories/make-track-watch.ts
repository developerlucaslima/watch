import { WatchEventsProducer } from 'src/infra/messaging/watch-event/watch-events-producer'
import { TrackWatchUseCase } from '../use-cases/track-watch.use-case'

export function makeTrackWatch() {
  const watchEventProducer = new WatchEventsProducer()

  return new TrackWatchUseCase(watchEventProducer)
}

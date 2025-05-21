import { WatchEventProducer } from '@services/wathc-event-producer/watch-event-producer'
import { TrackWatchUseCase } from '../use-cases/track-watch.use-case'

export function makeTrackWatch() {
  const watchEventProducer = new WatchEventProducer()

  return new TrackWatchUseCase(watchEventProducer)
}

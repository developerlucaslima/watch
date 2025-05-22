import type { WatchEvent } from "@shared/types/watch";

export interface IWatchEventsProducer {
  send(event: WatchEvent): Promise<void>
}

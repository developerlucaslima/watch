import type { WatchEvent } from "@shared/types/watch";

export interface IWatchEventProducer {
  send(event: WatchEvent): Promise<void>
}

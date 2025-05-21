export interface IWatchEventProducer {
  send(event: {
    videoId: string
    userId: string
    timestamp: number
  }): Promise<void>
}

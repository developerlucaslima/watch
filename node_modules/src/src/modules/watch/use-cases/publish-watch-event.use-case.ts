import { publishWatchEvent } from '@services/sqs-publisher.service'
import { WatchEvent } from '../dtos/watch-event.dto'

export class PublishWatchEventUseCase {
  async execute(data: WatchEvent): Promise<void> {
    await publishWatchEvent(data)
  }
}

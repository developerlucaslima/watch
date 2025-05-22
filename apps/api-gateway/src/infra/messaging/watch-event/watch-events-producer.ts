import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { env } from '@env'
import type { IWatchEventsProducer } from './watch-events-producer.interface'
import type { WatchEvent } from '@shared/types/watch'

export class WatchEventsProducer  implements IWatchEventsProducer {
  private client = new SQSClient({ region: env.AWS_REGION })

  async send(event: WatchEvent) {
    const cmd = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(event),
    })

    await this.client.send(cmd)
  }
}

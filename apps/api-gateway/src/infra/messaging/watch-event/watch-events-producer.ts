import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { env } from '@env'
import type { IWatchEventsProducer } from './watch-events-producer.interface'
import type { VideoViewRegisterParams } from '@shared/types/video-view'

export class WatchEventsProducer  implements IWatchEventsProducer {
  private client = new SQSClient({ region: env.AWS_REGION })

  async send(event: VideoViewRegisterParams) {
    const cmd = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(event),
    })

    await this.client.send(cmd)
  }
}

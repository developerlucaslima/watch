import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs'
import { env } from '@env'
import type { VideoViewRegisterParams } from '@shared/types/video-view'

import type { IWatchEventsProducer } from './watch-events-producer.interface'

export class WatchEventsProducer implements IWatchEventsProducer {
  private client = new SQSClient({ region: env.AWS_REGION })

  async send(event: VideoViewRegisterParams) {
    const cmd = new SendMessageCommand({
      QueueUrl: env.SQS_QUEUE_URL,
      MessageBody: JSON.stringify(event),
    })

    await this.client.send(cmd)
  }
}

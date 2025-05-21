import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'
import { env } from '@env'
import type { WatchEvent } from '@modules/watch/dtos/watch-event.dto'

const client = new SQSClient({ region: env.AWS_REGION })

export async function publishWatchEvent(event: WatchEvent) {
  const command = new SendMessageCommand({
    QueueUrl: env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify(event),
  })

  try {
    await client.send(command)
  } catch (err) {
    throw new Error('Failed to publish message to SQS')
  }
}

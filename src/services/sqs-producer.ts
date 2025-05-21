import { SQSClient, SendMessageCommand, SQSClientConfig } from '@aws-sdk/client-sqs'
import { env } from '../env'
import { WatchEvent } from '../types'

const config: SQSClientConfig = { 
  region: env.region,
  logger: console
}

const client = new SQSClient(config)

export class SqsError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'SqsError'
  } 
}

export async function publishWatchEvent(event: WatchEvent): Promise<void> {
  try {
    const command = new SendMessageCommand({
      QueueUrl: env.queueUrl,
      MessageBody: JSON.stringify(event),
    })

    await client.send(command)
    console.info('Watch event published successfully', { videoId: event.videoId, userId: event.userId })
  } catch (error) {
    console.error('Failed to publish watch event', { 
      error, 
      videoId: event.videoId,
      userId: event.userId 
    })
    throw new SqsError('Failed to publish watch event to SQS', error)
  }
}
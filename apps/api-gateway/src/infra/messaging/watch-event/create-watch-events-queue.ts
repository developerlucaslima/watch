import { SQSClient, CreateQueueCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs'
import { env } from '@env'

const QUEUE_NAME = 'watch-events'
const VISIBILITY_TIMEOUT_SECONDS = 30
const MESSAGE_RETENTION_SECONDS = 4 * 24 * 60 * 60 // 4 dias (345600)

const sqsClient = new SQSClient({ region: env.AWS_REGION })

async function getQueueUrl(name: string): Promise<string | null> {
  try {
    const { QueueUrl } = await sqsClient.send(new GetQueueUrlCommand({ QueueName: name }))
    return QueueUrl ?? null
  } catch {
    return null
  }
}

async function createQueue(name: string): Promise<string> {
  const command = new CreateQueueCommand({
    QueueName: name,
    Attributes: {
      VisibilityTimeout: VISIBILITY_TIMEOUT_SECONDS.toString(),
      MessageRetentionPeriod: MESSAGE_RETENTION_SECONDS.toString(),
    },
  })

  const { QueueUrl } = await sqsClient.send(command)
  if (!QueueUrl) throw new Error('Failed to create queue URL.')

  return QueueUrl
}

async function ensureQueueExists(name: string) {
  const existingUrl = await getQueueUrl(name)

  if (existingUrl) {
    console.log(`ℹ️ Queue already exists: ${existingUrl}`)
    return
  }

  const newUrl = await createQueue(name)
  console.log(`✅ Queue created: ${newUrl}`)
  console.log(`🔁 Add this to your .env:\nSQS_QUEUE_URL=${newUrl}`)
}

ensureQueueExists(QUEUE_NAME).catch((error) => {
  console.error('❌ Failed to ensure queue:', error)
  process.exit(1)
})

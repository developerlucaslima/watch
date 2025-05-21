import { env } from '@/env'
import { SQSClient, CreateQueueCommand, GetQueueUrlCommand } from '@aws-sdk/client-sqs'

const QUEUE_NAME = 'watch-events'

function createSqsClient() {
  return new SQSClient({ region: env.AWS_REGION })
}

async function getExistingQueueUrl(sqs: SQSClient, queueName: string): Promise<string | null> {
  try {
    const { QueueUrl } = await sqs.send(new GetQueueUrlCommand({ QueueName: queueName }))
    return QueueUrl ?? null
  } catch {
    return null
  }
}

async function createNewQueue(sqs: SQSClient, queueName: string): Promise<string> {
  const command = new CreateQueueCommand({
    QueueName: queueName,
    Attributes: {
      VisibilityTimeout: '30',           // 30s of invisibility after receiving
      MessageRetentionPeriod: '345600',  // 4 days
    },
  })

  const { QueueUrl } = await sqs.send(command)
  if (!QueueUrl) throw new Error('Queue URL not returned after creation.')

  return QueueUrl
}

async function ensureQueueExists() {
  const sqs = createSqsClient()

  const existingUrl = await getExistingQueueUrl(sqs, QUEUE_NAME)
  if (existingUrl) {
    console.log(`ℹ️ Queue already exists: ${existingUrl}`)
    return
  }

  try {
    const newQueueUrl = await createNewQueue(sqs, QUEUE_NAME)
    console.log(`✅ Queue created: ${newQueueUrl}`)
    console.log(`🔁 Add this to your .env:`)
    console.log(`SQS_QUEUE_URL=${newQueueUrl}`)
  } catch (error) {
    console.error('❌ Failed to create queue:', error)
    process.exit(1)
  }
}

ensureQueueExists()

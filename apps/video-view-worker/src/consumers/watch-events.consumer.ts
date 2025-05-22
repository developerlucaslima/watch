import { makeRegisterVideoView } from '@factories/make-register-video-view'
import { logger } from '@services/logger'
import type { SQSEvent } from 'aws-lambda'
import { z } from 'zod'

const messageSchema = z.object({
  userId: z.string(),
  videoId: z.string(),
})

const registerVideoView = makeRegisterVideoView()

export async function handler(event: SQSEvent) {
  for (const record of event.Records) {
    try {
      const payload = JSON.parse(record.body)
      const { userId, videoId } = messageSchema.parse(payload)

      await registerVideoView.execute({ userId, videoId })

    } catch (err) {
      logger.error({ err }, '❌ Failed to process SQS message')
    }
  }
}

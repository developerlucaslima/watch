import { z } from 'zod'

export const watchEventParamsSchema = z.object({
  videoId: z.string().min(1, 'videoId is required'),
})

export type WatchEventParams = z.infer<typeof watchEventParamsSchema>

export interface WatchEvent {
  userId: string
  videoId: string
  timestamp: number
}

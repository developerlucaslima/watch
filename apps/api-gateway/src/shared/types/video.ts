export type Video = {
  id: string
  title: string
  description: string
  s3Url: string
  thumbnail: string
  duration: number
  createdAt: Date
}

export type VideoCreateParams = Omit<Video, 'id' | 'createdAt'>

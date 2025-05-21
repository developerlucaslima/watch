import type { Video } from '@shared/types/video'

export function mapVideoResponse(video: Video) {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    s3Url: video.s3Url,
    duration: video.duration,
  }
}

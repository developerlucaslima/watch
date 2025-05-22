export type Video = {
  id: string;
  title: string;
  description: string | null;
  s3Url: string;
  thumbnail: string | null;
  duration: number | null;
  createdAt: Date;
}

export type VideoCreateParams = Omit<Video, 'id' | 'createdAt'>

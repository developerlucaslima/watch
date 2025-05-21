export type VideoView = {
    id: string;
    userId: string;
    videoId: string;
    viewedAt: Date;
}

export type VideoViewRegisterParams = Omit<VideoView, 'id' | 'viewedAt'>

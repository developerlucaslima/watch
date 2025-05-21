import { FastifyInstance } from 'fastify'

export async function videosRoutes(app: FastifyInstance) {
  app.get('/videos', async () => {
    return [
      {
        id: 'vid-001',
        title: 'A Beautiful Mind',
        url: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/a_beautiful_mind.mp4',
      },
      {
        id: 'vid-002',
        title: 'Fight Club',
        url: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/fight_club.mp4',
      }
    ]
  })
}

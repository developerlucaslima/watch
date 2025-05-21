import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const videos = [
    {
      title: 'A Beautiful Mind',
      description: 'Trailer of A Beautiful Mind (2001)',
      s3Url: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/a_beautiful_mind.mp4',
      thumbnail: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/a_beautiful_mind.jpg',
      duration: 160,
    },
    {
      title: 'Fight Club',
      description: 'Opening scene of Fight Club (1999)',
      s3Url: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/fight_club.mp4',
      thumbnail: 'https://my-streaming-videos.s3.sa-east-1.amazonaws.com/fight_club.jpg',
      duration: 180,
    }
  ]

  await Promise.all(
    videos.map((video) =>
      prisma.video.upsert({
        where: { s3Url: video.s3Url },
        update: {},
        create: video,
      })
    )
  )

  console.log('✅ Seed completed: videos inserted')
}

main()
  .catch((err) => {
    console.error('❌ Seed failed', err)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })

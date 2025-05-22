import { UsersPrismaRepository } from "@repositories/user/users.prisma-repository"
import { VideosPrismaRepository } from "@repositories/video/videos.prisma-repository"
import { VideoViewsPrismaRepository } from "@repositories/video-view/video-views.prisma-repository"
import { RegisterVideoViewUseCase } from "@use-cases/register-video-view.use-case"

export function makeRegisterVideoView() {
  const videoViewsPrismaRepository = new VideoViewsPrismaRepository()
  const usersPrismaRepository = new UsersPrismaRepository()
  const videosPrismaRepository = new VideosPrismaRepository()

  return new RegisterVideoViewUseCase(
    videoViewsPrismaRepository,
    usersPrismaRepository,
    videosPrismaRepository,
  )
}

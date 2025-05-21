import { prisma } from "@database/prisma"
import type { IVideosRepository } from "./videos.interface-repository"

export class VideosPrismaRepository implements IVideosRepository {
  async findById(id: string) {
    return prisma.video.findUnique({ where: { id } })
  }
}

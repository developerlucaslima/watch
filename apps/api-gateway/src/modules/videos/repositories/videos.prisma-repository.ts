import { prisma } from '@prisma/client'

import type { IVideosRepository } from './videos.interface-repository'

export class VideosPrismaRepository implements IVideosRepository {
  async findAll() {
    return prisma.video.findMany()
  }

  async findById(id: string) {
    return prisma.video.findUnique({ where: { id } })
  }
}

import { prisma } from "../config/prisma";
import type { Prisma, Review } from "@prisma/client";

export const reviewRepository = {
  async listByUser(userId: string): Promise<Review[]> {
    return prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  async listByTmdb(tmdbId: number, mediaType: string): Promise<Review[]> {
    return prisma.review.findMany({
      where: { tmdbId, mediaType },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, username: true, displayName: true, avatarUrl: true },
        },
      },
    });
  },

  async findOwn(userId: string, tmdbId: number, mediaType: string): Promise<Review | null> {
    return prisma.review.findUnique({
      where: {
        userId_tmdbId_mediaType: { userId, tmdbId, mediaType },
      },
    });
  },

  async upsert(data: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
    const { userId, tmdbId, mediaType, ...rest } = data;
    return prisma.review.upsert({
      where: {
        userId_tmdbId_mediaType: { userId, tmdbId, mediaType: mediaType ?? "movie" },
      },
      create: data,
      update: rest,
    });
  },

  async delete(id: string, userId: string): Promise<void> {
    await prisma.review.deleteMany({ where: { id, userId } });
  },

  async aggregate(tmdbId: number, mediaType: string) {
    const agg = await prisma.review.aggregate({
      where: { tmdbId, mediaType },
      _avg: { rating: true },
      _count: { _all: true },
    });
    return {
      averageRating: agg._avg.rating ?? 0,
      count: agg._count._all,
    };
  },
};

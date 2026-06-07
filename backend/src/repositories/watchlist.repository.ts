import { prisma } from "../config/prisma";
import type { Prisma, WatchlistItem } from "@prisma/client";

export const watchlistRepository = {
  async list(userId: string, mediaType?: string): Promise<WatchlistItem[]> {
    return prisma.watchlistItem.findMany({
      where: { userId, ...(mediaType ? { mediaType } : {}) },
      orderBy: { addedAt: "desc" },
    });
  },

  async add(data: Prisma.WatchlistItemUncheckedCreateInput): Promise<WatchlistItem> {
    return prisma.watchlistItem.create({ data });
  },

  async remove(userId: string, tmdbId: number, mediaType: string): Promise<void> {
    await prisma.watchlistItem.deleteMany({
      where: { userId, tmdbId, mediaType },
    });
  },

  async exists(userId: string, tmdbId: number, mediaType: string): Promise<boolean> {
    const count = await prisma.watchlistItem.count({
      where: { userId, tmdbId, mediaType },
    });
    return count > 0;
  },
};

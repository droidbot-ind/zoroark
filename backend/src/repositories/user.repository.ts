import { prisma } from "../config/prisma";
import type { Prisma, User } from "@prisma/client";

export const userRepository = {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  },

  async stats(userId: string) {
    const [watchlistCount, reviewCount, ratingAgg] = await Promise.all([
      prisma.watchlistItem.count({ where: { userId } }),
      prisma.review.count({ where: { userId } }),
      prisma.review.aggregate({
        where: { userId },
        _avg: { rating: true },
      }),
    ]);
    return {
      watchlistCount,
      reviewCount,
      averageRating: ratingAgg._avg.rating ?? 0,
    };
  },
};

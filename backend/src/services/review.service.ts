import { reviewRepository } from "../repositories/review.repository";
import type { ReviewUpsertInput } from "../validators/review.validator";

export const reviewService = {
  listByUser(userId: string) {
    return reviewRepository.listByUser(userId);
  },

  listByTmdb(tmdbId: number, mediaType: string) {
    return reviewRepository.listByTmdb(tmdbId, mediaType);
  },

  findOwn(userId: string, tmdbId: number, mediaType: string) {
    return reviewRepository.findOwn(userId, tmdbId, mediaType);
  },

  upsert(userId: string, input: ReviewUpsertInput) {
    return reviewRepository.upsert({
      userId,
      tmdbId: input.tmdbId,
      mediaType: input.mediaType,
      title: input.title,
      posterPath: input.posterPath ?? null,
      rating: input.rating,
      content: input.content,
    });
  },

  delete(id: string, userId: string) {
    return reviewRepository.delete(id, userId);
  },

  aggregate(tmdbId: number, mediaType: string) {
    return reviewRepository.aggregate(tmdbId, mediaType);
  },
};

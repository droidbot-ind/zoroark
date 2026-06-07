import { watchlistRepository } from "../repositories/watchlist.repository";
import { Conflict } from "../utils/errors";
import type { WatchlistAddInput } from "../validators/watchlist.validator";

export const watchlistService = {
  list(userId: string, mediaType?: string) {
    return watchlistRepository.list(userId, mediaType);
  },

  async add(userId: string, input: WatchlistAddInput) {
    const exists = await watchlistRepository.exists(userId, input.tmdbId, input.mediaType);
    if (exists) throw Conflict("Already in your watchlist");
    return watchlistRepository.add({
      userId,
      tmdbId: input.tmdbId,
      mediaType: input.mediaType,
      title: input.title,
      posterPath: input.posterPath ?? null,
      releaseDate: input.releaseDate ?? null,
      voteAverage: input.voteAverage ?? null,
    });
  },

  remove(userId: string, tmdbId: number, mediaType: string) {
    return watchlistRepository.remove(userId, tmdbId, mediaType);
  },

  exists(userId: string, tmdbId: number, mediaType: string) {
    return watchlistRepository.exists(userId, tmdbId, mediaType);
  },
};

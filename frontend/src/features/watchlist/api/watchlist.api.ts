import { api, unwrap } from "@/lib/api";
import type { ApiResponse, WatchlistItem } from "@/types/api";

interface AddPayload {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  releaseDate?: string | null;
  voteAverage?: number | null;
}

export const watchlistApi = {
  async list(mediaType?: "movie" | "tv"): Promise<WatchlistItem[]> {
    const { data } = await api.get<ApiResponse<WatchlistItem[]>>("/watchlist", {
      params: mediaType ? { mediaType } : undefined,
    });
    return unwrap(data);
  },
  async add(payload: AddPayload): Promise<WatchlistItem> {
    const { data } = await api.post<ApiResponse<WatchlistItem>>("/watchlist", payload);
    return unwrap(data);
  },
  async remove(tmdbId: number, mediaType: "movie" | "tv" = "movie"): Promise<void> {
    await api.delete<ApiResponse<{ removed: boolean }>>(`/watchlist/${tmdbId}`, {
      params: { mediaType },
    });
  },
  async check(
    tmdbId: number,
    mediaType: "movie" | "tv" = "movie"
  ): Promise<{ inWatchlist: boolean }> {
    const { data } = await api.get<ApiResponse<{ inWatchlist: boolean }>>(
      `/watchlist/${tmdbId}/check`,
      { params: { mediaType } }
    );
    return unwrap(data);
  },
};

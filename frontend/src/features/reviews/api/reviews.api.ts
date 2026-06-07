import { api, unwrap } from "@/lib/api";
import type { ApiResponse, Review, ReviewAggregate } from "@/types/api";

interface UpsertPayload {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath?: string | null;
  rating: number;
  content: string;
}

export const reviewsApi = {
  async mine(): Promise<Review[]> {
    const { data } = await api.get<ApiResponse<Review[]>>("/reviews/mine");
    return unwrap(data);
  },
  async forMedia(
    tmdbId: number,
    mediaType: "movie" | "tv" = "movie"
  ): Promise<{ items: Review[]; aggregate: ReviewAggregate }> {
    const { data } = await api.get<
      ApiResponse<{ items: Review[]; aggregate: ReviewAggregate }>
    >(`/reviews/media/${tmdbId}`, { params: { mediaType } });
    return unwrap(data);
  },
  async findMine(
    tmdbId: number,
    mediaType: "movie" | "tv" = "movie"
  ): Promise<Review | null> {
    const { data } = await api.get<ApiResponse<Review | null>>(
      `/reviews/media/${tmdbId}/mine`,
      { params: { mediaType } }
    );
    return unwrap(data);
  },
  async upsert(payload: UpsertPayload): Promise<Review> {
    const { data } = await api.post<ApiResponse<Review>>("/reviews", payload);
    return unwrap(data);
  },
  async remove(id: string): Promise<void> {
    await api.delete<ApiResponse<{ removed: boolean }>>(`/reviews/${id}`);
  },
};

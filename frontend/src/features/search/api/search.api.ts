import { api, unwrap } from "@/lib/api";
import type { ApiResponse, TmdbMedia, TmdbPage } from "@/types/api";

export const searchApi = {
  async multi(query: string, page = 1): Promise<TmdbPage<TmdbMedia>> {
    const { data } = await api.get<ApiResponse<TmdbPage<TmdbMedia>>>(
      "/tmdb/search",
      { params: { query, page } }
    );
    return unwrap(data);
  },
};

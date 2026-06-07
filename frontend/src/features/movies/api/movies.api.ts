import { api, unwrap } from "@/lib/api";
import type { ApiResponse, MovieDetail, TmdbMedia, TmdbPage, Genre, PersonDetail } from "@/types/api";

const get = async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const { data } = await api.get<ApiResponse<T>>(url, { params });
  return unwrap(data);
};

export const moviesApi = {
  trending: (window: "day" | "week" = "week", page = 1) =>
    get<TmdbPage<TmdbMedia>>("/tmdb/trending", { window, page }),
  popular: (page = 1) => get<TmdbPage<TmdbMedia>>("/tmdb/movies/popular", { page }),
  topRated: (page = 1) => get<TmdbPage<TmdbMedia>>("/tmdb/movies/top-rated", { page }),
  upcoming: (page = 1) => get<TmdbPage<TmdbMedia>>("/tmdb/movies/upcoming", { page }),
  nowPlaying: (page = 1) =>
    get<TmdbPage<TmdbMedia>>("/tmdb/movies/now-playing", { page }),
  discover: (page = 1, params: Record<string, string | number> = {}) =>
    get<TmdbPage<TmdbMedia>>("/tmdb/movies/discover", { page, ...params }),
  movieGenres: () => get<{ genres: Genre[] }>("/tmdb/movies/genres"),
  tvGenres: () => get<{ genres: Genre[] }>("/tmdb/tv/genres"),
  popularTv: (page = 1) => get<TmdbPage<TmdbMedia>>("/tmdb/tv/popular", { page }),
  topRatedTv: (page = 1) => get<TmdbPage<TmdbMedia>>("/tmdb/tv/top-rated", { page }),
  movieDetail: (id: number) => get<MovieDetail>(`/tmdb/movies/${id}`),
  tvDetail: (id: number) => get<MovieDetail>(`/tmdb/tv/${id}`),
  personDetail: (id: number) => get<PersonDetail>(`/tmdb/person/${id}`),
  searchMulti: (query: string, page = 1) =>
    get<TmdbPage<TmdbMedia>>("/tmdb/search", { query, page }),
};

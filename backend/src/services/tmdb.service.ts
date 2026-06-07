import axios, { type AxiosInstance } from "axios";
import { env } from "../config/env";

const tmdb: AxiosInstance = axios.create({
  baseURL: env.TMDB_BASE_URL,
  params: { api_key: env.TMDB_API_KEY, language: "en-US" },
  timeout: 10_000,
});

interface TmdbList<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const tmdbService = {
  // Discovery
  async trending(window: "day" | "week" = "week", page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/trending/all/${window}`, {
      params: { page },
    });
    return data;
  },

  async popularMovies(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/movie/popular`, {
      params: { page },
    });
    return data;
  },

  async topRatedMovies(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/movie/top_rated`, {
      params: { page },
    });
    return data;
  },

  async upcomingMovies(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/movie/upcoming`, {
      params: { page },
    });
    return data;
  },

  async nowPlayingMovies(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/movie/now_playing`, {
      params: { page },
    });
    return data;
  },

  async popularTv(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/tv/popular`, {
      params: { page },
    });
    return data;
  },

  async topRatedTv(page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/tv/top_rated`, {
      params: { page },
    });
    return data;
  },

  async discoverMovies(page = 1, params: Record<string, string | number | undefined> = {}) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/discover/movie`, {
      params: { page, sort_by: "popularity.desc", ...params },
    });
    return data;
  },

  // Search
  async searchMulti(query: string, page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/search/multi`, {
      params: { query, page, include_adult: false },
    });
    return data;
  },

  async searchMovie(query: string, page = 1) {
    const { data } = await tmdb.get<TmdbList<unknown>>(`/search/movie`, {
      params: { query, page, include_adult: false },
    });
    return data;
  },

  // Detail
  async movieDetail(id: number) {
    const { data } = await tmdb.get<unknown>(`/movie/${id}`, {
      params: {
        append_to_response: "credits,videos,similar,recommendations,watch/providers,images",
      },
    });
    return data;
  },

  async tvDetail(id: number) {
    const { data } = await tmdb.get<unknown>(`/tv/${id}`, {
      params: {
        append_to_response: "credits,videos,similar,recommendations,watch/providers,images",
      },
    });
    return data;
  },

  async personDetail(id: number) {
    const { data } = await tmdb.get<unknown>(`/person/${id}`, {
      params: {
        append_to_response: "movie_credits,tv_credits,images",
      },
    });
    return data;
  },

  // Genres
  async movieGenres() {
    const { data } = await tmdb.get<{ genres: { id: number; name: string }[] }>(
      `/genre/movie/list`
    );
    return data;
  },

  async tvGenres() {
    const { data } = await tmdb.get<{ genres: { id: number; name: string }[] }>(
      `/genre/tv/list`
    );
    return data;
  },
};

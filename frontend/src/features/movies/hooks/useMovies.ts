import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { moviesApi } from "../api/movies.api";

export const movieKeys = {
  all: ["movies"] as const,
  trending: (w: "day" | "week", p: number) =>
    [...movieKeys.all, "trending", w, p] as const,
  popular: (p: number) => [...movieKeys.all, "popular", p] as const,
  topRated: (p: number) => [...movieKeys.all, "top-rated", p] as const,
  upcoming: (p: number) => [...movieKeys.all, "upcoming", p] as const,
  nowPlaying: (p: number) => [...movieKeys.all, "now-playing", p] as const,
  popularTv: (p: number) => [...movieKeys.all, "tv-popular", p] as const,
  topRatedTv: (p: number) => [...movieKeys.all, "tv-top-rated", p] as const,
  discover: (p: number, params: Record<string, unknown>) =>
    [...movieKeys.all, "discover", p, params] as const,
  movieDetail: (id: number) => [...movieKeys.all, "movie", id] as const,
  tvDetail: (id: number) => [...movieKeys.all, "tv", id] as const,
  genres: () => [...movieKeys.all, "genres"] as const,
};

export const useTrending = (window: "day" | "week" = "week", page = 1) =>
  useQuery({
    queryKey: movieKeys.trending(window, page),
    queryFn: () => moviesApi.trending(window, page),
    placeholderData: keepPreviousData,
  });

export const usePopular = (page = 1) =>
  useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => moviesApi.popular(page),
    placeholderData: keepPreviousData,
  });

export const useTopRated = (page = 1) =>
  useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => moviesApi.topRated(page),
    placeholderData: keepPreviousData,
  });

export const useUpcoming = (page = 1) =>
  useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => moviesApi.upcoming(page),
    placeholderData: keepPreviousData,
  });

export const useNowPlaying = (page = 1) =>
  useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => moviesApi.nowPlaying(page),
    placeholderData: keepPreviousData,
  });

export const usePopularTv = (page = 1) =>
  useQuery({
    queryKey: movieKeys.popularTv(page),
    queryFn: () => moviesApi.popularTv(page),
    placeholderData: keepPreviousData,
  });

export const useTopRatedTv = (page = 1) =>
  useQuery({
    queryKey: movieKeys.topRatedTv(page),
    queryFn: () => moviesApi.topRatedTv(page),
    placeholderData: keepPreviousData,
  });

export const useDiscover = (page = 1, params: Record<string, string | number> = {}) =>
  useQuery({
    queryKey: movieKeys.discover(page, params),
    queryFn: () => moviesApi.discover(page, params),
    placeholderData: keepPreviousData,
  });

export const useMovieDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: movieKeys.movieDetail(id),
    queryFn: () => moviesApi.movieDetail(id),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });

export const useTvDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: movieKeys.tvDetail(id),
    queryFn: () => moviesApi.tvDetail(id),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });

export const usePersonDetail = (id: number, enabled = true) =>
  useQuery({
    queryKey: [...movieKeys.all, "person", id] as const,
    queryFn: () => moviesApi.personDetail(id),
    enabled: enabled && Number.isFinite(id) && id > 0,
  });

export const useMovieGenres = () =>
  useQuery({
    queryKey: movieKeys.genres(),
    queryFn: () => moviesApi.movieGenres(),
    staleTime: Infinity,
  });

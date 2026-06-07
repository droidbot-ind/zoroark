import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { watchlistApi } from "../api/watchlist.api";
import { useAuthStore } from "@/stores/authStore";

export const watchlistKeys = {
  all: ["watchlist"] as const,
  list: (mediaType?: string) => [...watchlistKeys.all, "list", mediaType ?? "all"] as const,
  check: (id: number, type: string) =>
    [...watchlistKeys.all, "check", type, id] as const,
};

export const useWatchlist = (mediaType?: "movie" | "tv") => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: watchlistKeys.list(mediaType),
    queryFn: () => watchlistApi.list(mediaType),
    enabled: isAuthenticated,
  });
};

export const useIsInWatchlist = (tmdbId: number, mediaType: "movie" | "tv" = "movie") => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: watchlistKeys.check(tmdbId, mediaType),
    queryFn: () => watchlistApi.check(tmdbId, mediaType),
    enabled: isAuthenticated && tmdbId > 0,
  });
};

export const useAddToWatchlist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: watchlistApi.add,
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: watchlistKeys.all });
      qc.setQueryData(watchlistKeys.check(vars.tmdbId, vars.mediaType), {
        inWatchlist: true,
      });
    },
  });
};

export const useRemoveFromWatchlist = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      tmdbId,
      mediaType,
    }: {
      tmdbId: number;
      mediaType: "movie" | "tv";
    }) => watchlistApi.remove(tmdbId, mediaType),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: watchlistKeys.all });
      qc.setQueryData(watchlistKeys.check(vars.tmdbId, vars.mediaType), {
        inWatchlist: false,
      });
    },
  });
};

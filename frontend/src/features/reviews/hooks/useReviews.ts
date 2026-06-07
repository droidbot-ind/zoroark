import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reviewsApi } from "../api/reviews.api";
import { useAuthStore } from "@/stores/authStore";

export const reviewKeys = {
  all: ["reviews"] as const,
  mine: () => [...reviewKeys.all, "mine"] as const,
  forMedia: (id: number, type: string) =>
    [...reviewKeys.all, "media", type, id] as const,
  myOne: (id: number, type: string) =>
    [...reviewKeys.all, "media", type, id, "mine"] as const,
};

export const useMyReviews = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: reviewKeys.mine(),
    queryFn: reviewsApi.mine,
    enabled: isAuthenticated,
  });
};

export const useMediaReviews = (tmdbId: number, mediaType: "movie" | "tv" = "movie") =>
  useQuery({
    queryKey: reviewKeys.forMedia(tmdbId, mediaType),
    queryFn: () => reviewsApi.forMedia(tmdbId, mediaType),
    enabled: tmdbId > 0,
  });

export const useMyMediaReview = (
  tmdbId: number,
  mediaType: "movie" | "tv" = "movie"
) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: reviewKeys.myOne(tmdbId, mediaType),
    queryFn: () => reviewsApi.findMine(tmdbId, mediaType),
    enabled: isAuthenticated && tmdbId > 0,
  });
};

export const useUpsertReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reviewsApi.upsert,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });
      qc.invalidateQueries({ queryKey: reviewKeys.forMedia(vars.tmdbId, vars.mediaType) });
      qc.invalidateQueries({ queryKey: reviewKeys.myOne(vars.tmdbId, vars.mediaType) });
    },
  });
};

export const useDeleteReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: reviewsApi.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: reviewKeys.all }),
  });
};

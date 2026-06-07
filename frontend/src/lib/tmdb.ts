import { env } from "./env";

export const tmdbImage = (
  path: string | null | undefined,
  size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"
): string => {
  if (!path) {
    return "https://placehold.co/500x750/0a0a0a/525252?text=No+Image&font=inter";
  }
  return `${env.TMDB_IMAGE_URL}/${size}${path}`;
};

export const tmdbBackdrop = (
  path: string | null | undefined,
  size: "w300" | "w780" | "w1280" | "original" = "w1280"
): string => {
  if (!path) return "";
  return `${env.TMDB_IMAGE_URL}/${size}${path}`;
};

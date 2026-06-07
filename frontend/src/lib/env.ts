export const env = {
  API_URL: import.meta.env.VITE_API_URL ?? `http://${globalThis.location.hostname}:4000/api`,
  TMDB_IMAGE_URL:
    import.meta.env.VITE_TMDB_IMAGE_URL ?? "https://image.tmdb.org/t/p",
} as const;

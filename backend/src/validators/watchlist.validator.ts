import { z } from "zod";

export const mediaTypeSchema = z.enum(["movie", "tv"]);

export const watchlistAddSchema = z.object({
  tmdbId: z.coerce.number().int().positive(),
  mediaType: mediaTypeSchema.default("movie"),
  title: z.string().min(1).max(255),
  posterPath: z.string().nullable().optional(),
  releaseDate: z.string().nullable().optional(),
  voteAverage: z.coerce.number().min(0).max(10).nullable().optional(),
});

export type WatchlistAddInput = z.infer<typeof watchlistAddSchema>;

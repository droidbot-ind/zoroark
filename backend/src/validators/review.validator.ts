import { z } from "zod";
import { mediaTypeSchema } from "./watchlist.validator";

export const reviewUpsertSchema = z.object({
  tmdbId: z.coerce.number().int().positive(),
  mediaType: mediaTypeSchema.default("movie"),
  title: z.string().min(1).max(255),
  posterPath: z.string().nullable().optional(),
  rating: z.coerce.number().int().min(1).max(10),
  content: z.string().min(1).max(5000),
});

export const reviewParamsSchema = z.object({
  id: z.string().min(1),
});

export const reviewTmdbParamsSchema = z.object({
  tmdbId: z.coerce.number().int().positive(),
});

export type ReviewUpsertInput = z.infer<typeof reviewUpsertSchema>;

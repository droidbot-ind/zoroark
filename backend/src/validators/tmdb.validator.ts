import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).max(500).default(1),
});

export const searchQuerySchema = z.object({
  query: z.string().min(1).max(200),
  page: z.coerce.number().int().min(1).max(500).default(1),
});

export const tmdbIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const mediaParamsSchema = z.object({
  mediaType: z.enum(["movie", "tv"]),
  id: z.coerce.number().int().positive(),
});

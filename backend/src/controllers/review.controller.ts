import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { ok } from "../utils/response";
import { Unauthorized } from "../utils/errors";

export const reviewController = {
  async listMine(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const items = await reviewService.listByUser(req.user.userId);
    ok(res, items);
  },

  async listForMedia(req: Request, res: Response) {
    const mediaType =
      typeof req.query.mediaType === "string" ? req.query.mediaType : "movie";
    const items = await reviewService.listByTmdb(Number(req.params.tmdbId), mediaType);
    const aggregate = await reviewService.aggregate(Number(req.params.tmdbId), mediaType);
    ok(res, { items, aggregate });
  },

  async findMine(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const mediaType =
      typeof req.query.mediaType === "string" ? req.query.mediaType : "movie";
    const item = await reviewService.findOwn(
      req.user.userId,
      Number(req.params.tmdbId),
      mediaType
    );
    ok(res, item);
  },

  async upsert(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const review = await reviewService.upsert(req.user.userId, req.body);
    ok(res, review, 201);
  },

  async remove(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    await reviewService.delete(String(req.params.id), req.user.userId);
    ok(res, { removed: true });
  },
};

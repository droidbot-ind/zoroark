import type { Request, Response } from "express";
import { watchlistService } from "../services/watchlist.service";
import { ok } from "../utils/response";
import { Unauthorized } from "../utils/errors";

export const watchlistController = {
  async list(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const mediaType = typeof req.query.mediaType === "string" ? req.query.mediaType : undefined;
    const items = await watchlistService.list(req.user.userId, mediaType);
    ok(res, items);
  },

  async add(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const item = await watchlistService.add(req.user.userId, req.body);
    ok(res, item, 201);
  },

  async remove(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const mediaType =
      typeof req.query.mediaType === "string" ? req.query.mediaType : "movie";
    await watchlistService.remove(req.user.userId, Number(req.params.tmdbId), mediaType);
    ok(res, { removed: true });
  },

  async check(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const mediaType =
      typeof req.query.mediaType === "string" ? req.query.mediaType : "movie";
    const exists = await watchlistService.exists(
      req.user.userId,
      Number(req.params.tmdbId),
      mediaType
    );
    ok(res, { inWatchlist: exists });
  },
};

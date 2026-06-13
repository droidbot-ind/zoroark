import type { Request, Response } from "express";
import { tmdbService } from "../services/tmdb.service";
import { ok } from "../utils/response";

const getPage = (req: Request) => Number(req.query.page ?? 1);

export const tmdbController = {
  async trending(req: Request, res: Response) {
    const window = (req.query.window === "day" ? "day" : "week") as "day" | "week";
    const data = await tmdbService.trending(window, getPage(req));
    ok(res, data);
  },
  async popularMovies(req: Request, res: Response) {
    ok(res, await tmdbService.popularMovies(getPage(req)));
  },
  async topRatedMovies(req: Request, res: Response) {
    ok(res, await tmdbService.topRatedMovies(getPage(req)));
  },
  async upcomingMovies(req: Request, res: Response) {
    ok(res, await tmdbService.upcomingMovies(getPage(req)));
  },
  async nowPlayingMovies(req: Request, res: Response) {
    ok(res, await tmdbService.nowPlayingMovies(getPage(req)));
  },
  async popularTv(req: Request, res: Response) {
    ok(res, await tmdbService.popularTv(getPage(req)));
  },
  async topRatedTv(req: Request, res: Response) {
    ok(res, await tmdbService.topRatedTv(getPage(req)));
  },
  async discoverMovies(req: Request, res: Response) {
    const { page, ...rest } = req.query;
    const params: Record<string, string | number | undefined> = {};
    for (const [k, v] of Object.entries(rest)) {
      if (typeof v === "string" || typeof v === "number") params[k] = v;
    }
    ok(res, await tmdbService.discoverMovies(Number(page ?? 1), params));
  },
  async search(req: Request, res: Response) {
    const query = String(req.query.query ?? "");
    ok(res, await tmdbService.searchMulti(query, getPage(req)));
  },
  async movieDetail(req: Request, res: Response) {
    ok(res, await tmdbService.movieDetail(Number(req.params.id)));
  },
  async tvDetail(req: Request, res: Response) {
    ok(res, await tmdbService.tvDetail(Number(req.params.id)));
  },
  async personDetail(req: Request, res: Response) {
    ok(res, await tmdbService.personDetail(Number(req.params.id)));
  },
  async movieGenres(_req: Request, res: Response) {
    ok(res, await tmdbService.movieGenres());
  },
  async tvGenres(_req: Request, res: Response) {
    ok(res, await tmdbService.tvGenres());
  },
};

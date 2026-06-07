import type { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { ok } from "../utils/response";
import { Unauthorized } from "../utils/errors";

export const authController = {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    ok(res, result, 201);
  },

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    ok(res, result);
  },

  async me(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const user = await authService.me(req.user.userId);
    ok(res, { user });
  },

  async updateProfile(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const user = await authService.updateProfile(req.user.userId, req.body);
    ok(res, { user });
  },

  async stats(req: Request, res: Response) {
    if (!req.user) throw Unauthorized();
    const stats = await authService.stats(req.user.userId);
    ok(res, stats);
  },
};

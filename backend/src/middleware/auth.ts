import type { Request, Response, NextFunction } from "express";
import { verifyJwt, type JwtPayload } from "../utils/jwt";
import { Unauthorized } from "../utils/errors";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw Unauthorized("Missing bearer token");
  }
  const token = header.slice("Bearer ".length).trim();
  try {
    req.user = verifyJwt(token);
    next();
  } catch {
    throw Unauthorized("Invalid or expired token");
  }
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      req.user = verifyJwt(header.slice("Bearer ".length).trim());
    } catch {
      // ignore — anonymous
    }
  }
  next();
};

import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { HttpError } from "../utils/errors";
import { fail } from "../utils/response";
import { env } from "../config/env";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  if (env.NODE_ENV !== "test") {
    console.error("[error]", err);
  }

  if (err instanceof HttpError) {
    fail(res, err.status, err.message, err.details);
    return;
  }

  if (err instanceof ZodError) {
    fail(res, 400, "Validation failed", err.flatten().fieldErrors);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      fail(res, 409, "Resource already exists");
      return;
    }
    if (err.code === "P2025") {
      fail(res, 404, "Resource not found");
      return;
    }
  }

  const message =
    err instanceof Error ? err.message : "Internal server error";
  fail(res, 500, env.NODE_ENV === "production" ? "Internal server error" : message);
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  fail(res, 404, "Route not found");
};

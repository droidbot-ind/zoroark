import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

type Source = "body" | "query" | "params";

export const validate =
  (schema: ZodSchema, source: Source = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const parsed = schema.parse(req[source]);
    // Express 5 makes `req.query` a getter; reassigning to `params/body` is fine.
    if (source === "query") {
      // mutate in place to preserve the getter
      Object.assign(req.query as object, parsed);
    } else {
      (req as unknown as Record<string, unknown>)[source] = parsed;
    }
    next();
  };

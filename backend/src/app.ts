import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { env } from "./config/env";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error";

export const createApp = (): Express => {
  const app = express();

  app.disable("x-powered-by");

  // Only trust proxy when actually behind one (production)
  if (env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  // CORS — first, so headers are set even on error responses
  const allowedOrigins = env.CORS_ORIGIN.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin:
        env.NODE_ENV === "production"
          ? allowedOrigins
          : true, // dev: reflect any origin (localhost, LAN IPs, etc.)
      credentials: true,
    })
  );

  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  if (env.NODE_ENV !== "test") {
    app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  }

  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    // we manage trust proxy ourselves above — silence v7 validator
    validate: { trustProxy: false, xForwardedForHeader: false },
  });
  app.use("/api", limiter);

  app.use("/api", routes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

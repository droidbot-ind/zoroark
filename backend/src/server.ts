import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`Zoroark API running on http://localhost:${env.PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received — shutting down gracefully...`);
  server.close(() => console.log("HTTP server closed"));
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

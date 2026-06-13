# Zoroark — Backend

Express + TypeScript + Prisma + PostgreSQL API for Zoroark.

## Setup

```bash
npm install
# fill in JWT_SECRET and TMDB_API_KEY in .env
npx prisma migrate dev --name init
npm run dev       # http://localhost:4000
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run API in watch mode    |
| `npm run build`   | Compile TypeScript       |
| `npm run start`   | Run compiled production  |
| `npm test`        | Run Vitest               |
| `prisma:studio`   | Open Prisma Studio       |

## Tech

- Express 4 + TypeScript
- Prisma ORM + PostgreSQL
- JWT auth (bcryptjs + jsonwebtoken)
- Zod validation
- Helmet + CORS + rate-limit

# Zoroark

Movie and TV discovery platform built with React, Express, Prisma, and TMDB.

## Stack

**Frontend:** React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router v6, TanStack Query v5, Zustand, motion/react, Vitest, React Testing Library

**Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT, Zod, Vitest

**External API:** TMDB

## Quick Start

```bash
# Start PostgreSQL
docker compose up -d

# Backend
cd backend
npm install
npx prisma migrate dev --name init
npm run dev

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Scripts

| Workspace | Command           | Description                |
| --------- | ----------------- | -------------------------- |
| backend   | `npm run dev`     | Run API in watch mode      |
| backend   | `npm run build`   | Compile TypeScript         |
| backend   | `npm run start`   | Run compiled production    |
| backend   | `npm test`        | Run Vitest                 |
| frontend  | `npm run dev`     | Run Vite dev server        |
| frontend  | `npm run build`   | Build production bundle    |
| frontend  | `npm run preview` | Preview production build   |
| frontend  | `npm test`        | Run Vitest                 |

## Features

- JWT authentication (register / login / persisted session)
- Movie and TV discovery (trending, popular, top-rated, upcoming)
- Multi-search (movies, TV, people)
- Media detail pages (cast, trailer, similar, recommendations)
- Person pages (biography, filmography, known-for grid)
- Watchlist management
- Personal ratings and written reviews
- User profiles with stats
- Dark / light mode with theme customisation (colour, font, spacing, radius)

## Credits

Data provided by [TMDB](https://www.themoviedb.org).

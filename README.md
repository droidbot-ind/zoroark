# Zoroark

A production-quality movie explorer and watchlist platform inspired by **Netflix** + **Letterboxd**.

## Stack

**Frontend:** React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router v6, TanStack Query v5, Zustand, Vitest, React Testing Library

**Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT, Zod, Vitest

**External API:** TMDB (The Movie Database)

## Monorepo Layout

```
movie-night/
├── backend/     # Express + Prisma API
└── frontend/    # Vite + React SPA
```

## Quick Start

### 1. Prerequisites

- Node.js >= 18
- Docker & Docker Compose (for local Postgres)
- A free TMDB API key: https://www.themoviedb.org/settings/api

### 2. Start PostgreSQL (Docker)

```bash
docker compose up -d        # starts Postgres 16 on localhost:5433
docker compose ps           # verify "healthy"
```

Postgres runs on **port 5433** (to avoid clashing with a local install).
Data persists in the named volume `movie_night_pg_data`.

Useful commands:

```bash
docker compose logs -f postgres   # tail logs
docker compose down               # stop (keep data)
docker compose down -v            # stop AND wipe data
```

### 3. Backend Setup

```bash
cd backend
# .env already exists with the Docker DATABASE_URL
# 👉 fill in JWT_SECRET and TMDB_API_KEY in backend/.env
npm install
npx prisma migrate dev --name init
npm run dev                # http://localhost:4000
```

### 4. Frontend Setup

```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                # http://localhost:5173
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

- JWT auth (register / login / persisted session)
- Movie discovery: trending, popular, top-rated, upcoming
- Multi-search (movies, TV, people)
- Movie detail page (cast, similar, videos, providers)
- Watchlist add / remove / list
- Personal ratings & written reviews
- User profile with stats
- Pagination on every list
- Loading skeletons, error boundaries, toasts
- Mobile-first responsive dark theme

## License

MIT

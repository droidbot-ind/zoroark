# Zoroark

A Pokémon-themed movie & TV discovery platform inspired by **Letterboxd** — built with React, Express, Prisma, and TMDB.

## Stack

**Frontend:** React 18, TypeScript, Vite, TailwindCSS, shadcn/ui, React Router v6, TanStack Query v5, Zustand, motion/react (React Bits), Vitest, React Testing Library

**Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT, Zod, Vitest

**External API:** TMDB (The Movie Database)

## Monorepo Layout

```
zoroark/
├── backend/     # Express + Prisma API
├── frontend/    # Vite + React SPA
└── misc/        # Deploy guide & dev guidelines (gitignored)
```

## Quick Start

### 1. Prerequisites

- Node.js >= 18
- Docker & Docker Compose (for local Postgres)
- A free TMDB API key: https://www.themoviedb.org/settings/api

### 2. Start PostgreSQL (Docker)

```bash
docker compose up -d        # starts Postgres on localhost:5433
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

- JWT auth (register / login via email or username / persisted session)
- Movie & TV discovery: trending, popular, top-rated, upcoming
- Multi-search (movies, TV, people)
- Media detail page (cast, trailer dialog, similar, recommendations, streaming providers)
- Person page (bio, filmography, known-for grid with rating colours)
- Watchlist add / remove / list
- Personal ratings & written reviews
- User profile with stats & edit dialog
- Pagination on every list
- Loading skeletons, error boundaries, toasts
- Dark / light mode toggle (persisted)
- **Theme customiser** — colour picker (18 swatches + custom), font selector (10 Google Fonts with live preview), font scale, spacing mode, border radius
- Pokéball favicon, ShinyText logo animation (React Bits)
- Mobile-first responsive design

## Credits

Data provided by [TMDB](https://www.themoviedb.org). This project was built with **opencode** (deepseek-v4-flash-free).


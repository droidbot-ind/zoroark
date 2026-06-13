# Zoroark — Frontend

React 18 + TypeScript + Vite + TailwindCSS SPA for Zoroark.

## Setup

```bash
cp .env.example .env       # VITE_API_URL=http://localhost:4000/api
npm install
npm run dev                # http://localhost:5173
```

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Run Vite dev server          |
| `npm run build`     | Build production bundle      |
| `npm run preview`   | Preview production build     |
| `npm test`          | Run Vitest                   |
| `npm run lint`      | Run ESLint                   |
| `npm run typecheck` | Run tsc --noEmit             |

## Tech

- React 18, TypeScript, Vite
- TailwindCSS + shadcn/ui
- React Router v6, TanStack Query v5
- Zustand (state), react-hook-form + Zod (forms)
- motion/react (React Bits)
- Vitest + React Testing Library

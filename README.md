# Estate Cockpit

A small property-management cockpit. It shows one property and the insurance
policies attached to it — built as a clean, opinionated React codebase.

This repository is the starting point for a coding challenge. Your task lives in
**[CHALLENGE.md](./CHALLENGE.md)**; the design system you should work within is
documented in **[DESIGN.md](./DESIGN.md)**.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens
- **Zustand** for state
- **Vitest** + **Testing Library** for tests

## Getting started

Requires Node 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | What it does                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                              |
| `npm run build`        | Production build                                                  |
| `npm run test`         | Run the test suite once                                           |
| `npm run check`        | Typecheck + lint + tests + design guard (the "is it green?" gate) |
| `npm run format`       | Format with Prettier                                              |
| `npm run check:design` | Advisory: flag raw colors that bypass the design tokens           |

## Structure

```
src/
├─ app/                 # Next.js App Router (layout, page, global styles + tokens)
├─ components/
│  ├─ ui/               # Design-system primitives (Text, Card, Button, BottomSheet …)
│  ├─ Cockpit.tsx       # The page composition
│  └─ PropertyHero.tsx
├─ features/
│  └─ insurance/        # the Versicherungen feature
├─ lib/                 # types, mock data, mock API, formatting
└─ store/               # Zustand store
```

Explore the running app and the code, then read [DESIGN.md](./DESIGN.md) for the
house style.

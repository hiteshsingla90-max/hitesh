# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Full-stack starter app: a React (Vite + TypeScript) client and an Express (TypeScript) server, managed as an npm workspaces monorepo (`client/`, `server/`). Node 22, npm workspaces (no other package manager).

## Commands

Run all commands from the repo root — npm workspaces dispatches to the right package.

```sh
npm install                 # install all workspace dependencies
npm run dev                 # run client (Vite, :5173) and server (tsx watch, :3001) concurrently
npm run build                # type-check + build both workspaces (tsc && vite build; tsc)
npm run test                  # run client and server test suites (vitest run) sequentially
npm run lint                  # eslint . across the whole repo
npm run format                # prettier --write .
```

Single-workspace / single-test commands:

```sh
npm run test -w client                          # client tests only
npm run test -w server                           # server tests only
npm run test -w client -- src/App.test.tsx       # a single client test file
npm run test -w server -- test/health.test.ts    # a single server test file
npm run dev -w client                            # Vite dev server only
npm run dev -w server                            # server only (tsx watch)
```

Both workspaces use Vitest (`vitest run`), so `-- <path>` or `-- -t "<name>"` filters to a file or test name.

## Architecture

- **`client/`** — Vite + React 18 + TypeScript. Entry point `src/main.tsx` renders `src/App.tsx`. The Vite dev server proxies `/api/*` requests to the server at `http://localhost:3001` (see `client/vite.config.ts`), so client code calls the API with relative paths like `fetch('/api/health')` rather than hardcoding a host. Tests use Vitest + `@testing-library/react` with jsdom (`src/setupTests.ts` loads `@testing-library/jest-dom`).
- **`server/`** — Express + TypeScript, ESM (`NodeNext` module resolution — relative imports in server source must use explicit `.js` extensions, e.g. `import { healthRouter } from './routes/health.js'`). `src/app.ts` exports `createApp()`, which builds the Express app and mounts routers (e.g. `src/routes/health.ts`) under `/api`; `src/index.ts` is the process entry point that calls `createApp()` and starts listening on `PORT` (default 3001). Keeping app construction (`createApp`) separate from the listener (`index.ts`) is what lets tests import the app and drive it with `supertest` without binding a port.
- Both workspaces extend the shared `tsconfig.base.json` at the repo root; workspace-specific `tsconfig.json` files override `lib`, `module`/`moduleResolution`, and output settings as needed (client stays bundler-resolved/`noEmit`, server compiles to `dist/` as NodeNext).
- Linting is unified at the root: a single flat `eslint.config.js` (ESLint 9 + `typescript-eslint`) covers both `client/` and `server/` — there are no per-workspace ESLint configs.

# hitesh

Full-stack starter: React (Vite + TypeScript) client and Express (TypeScript) server, managed as an npm workspaces monorepo.

## Getting started

```sh
npm install
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3001 (proxied under `/api` from the client dev server)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run client and server in watch mode concurrently |
| `npm run build` | Type-check and build both workspaces |
| `npm run test` | Run client and server test suites |
| `npm run lint` | Lint the whole repo with ESLint |
| `npm run format` | Format the whole repo with Prettier |

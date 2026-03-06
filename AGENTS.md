# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Yarn workspaces monorepo: React/Vite frontend (port 3000) + NestJS backend (port 3001) + PostgreSQL. See `README.md` for standard commands (`yarn dev`, `yarn build`, `yarn dev:frontend`, `yarn dev:backend`).

### Important caveats

- **System-level `DATABASE_URL`**: The Cloud VM has a pre-set `DATABASE_URL` environment variable. `dotenv.config()` in `packages/backend/src/typeorm.config.ts` does **not** override existing env vars, so the system-level value takes precedence over `.env`. If the backend fails with "password authentication failed", ensure the PostgreSQL user/password matches the system `DATABASE_URL` (check with `node -e "console.log(new URL(process.env.DATABASE_URL).username)"`).
- **PostgreSQL must be running** before starting the backend: `sudo pg_ctlcluster 16 main start`.
- **Backend `.env` file**: Copy from `.env.example` if missing (`cp packages/backend/.env.example packages/backend/.env`), but note the system-level `DATABASE_URL` takes precedence (see above).
- **Backend tests**: Run with `DATABASE_URL_TEST=<connection_string> yarn workspace @wedding/backend test`. The `pg-mem` in-memory fallback (used when `DATABASE_URL_TEST` is unset) may fail with timeout errors on certain Node/TypeORM version combinations; prefer using a real PostgreSQL connection string.
- **Lint/typecheck**: `yarn workspace @wedding/frontend lint`, `yarn workspace @wedding/backend lint`, `yarn workspace @wedding/frontend typecheck`, `yarn workspace @wedding/backend typecheck`.

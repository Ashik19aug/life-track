# LifeTrack

LifeTrack is a personal productivity, health, and lifestyle tracking platform. Phase 1 provides the Docker-based Next.js and PostgreSQL foundation; business modules begin in later phases.

## Architecture decisions

- The existing root-level `app/` App Router convention is retained. Server-side foundation code lives in `src/`.
- PostgreSQL runs only in Docker for local development. Prisma owns the versioned schema and migrations.
- Timestamps are stored as PostgreSQL `timestamptz` values in UTC. Future user profiles will provide an explicit IANA timezone; date-only fields will be modeled separately to avoid timezone shifts.
- Future precise values use PostgreSQL `Decimal` or integer minor units as appropriate. Health schemas will always record their units explicitly.
- Docker starts development migrations after PostgreSQL reports healthy. Production releases run `npm run db:migrate:deploy` separately, not from every application instance.

## Requirements

- Docker Desktop with Docker Compose
- Node.js 22 LTS for host-side commands (Docker uses Node 22 automatically)

## Environment setup

```bash
cp .env.example .env
```

Use a unique local `POSTGRES_PASSWORD` and keep the matching host-side `DATABASE_URL` in sync. `.env` is ignored by Git. Docker supplies the app with a database URL using the `db` hostname.

## Local development

```bash
docker compose up --build
```

The application is available at http://localhost:3000 and the health endpoint at http://localhost:3000/api/health.

Run in the background with `docker compose up -d --build`. Inspect containers with `docker compose ps` and logs with `docker compose logs -f app`. Stop services with `docker compose down` while retaining database data.

If port 3000 is already in use, set `LIFETRACK_APP_PORT=3001` for that command and visit port 3001; the default remains port 3000.

> Warning: `docker compose down -v` removes the local PostgreSQL volume and permanently deletes its development data.

## Database

PostgreSQL data persists in the named `lifetrack_postgres_data` volume. Prisma uses `prisma/schema.prisma`, versioned files in `prisma/migrations/`, and the repeatable foundation seed in `prisma/seed.ts`.

```bash
npm run db:generate
npm run db:migrate
npm run db:migrate:deploy
npm run db:status
npm run db:seed
npm run db:studio
```

Host-side Prisma commands use `localhost:5432`; container commands use `db:5432`.

## Development commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run format
npm run format:check
npm run build
```

`GET /api/health` performs a small Prisma `SELECT 1` query and returns a standard success response. If PostgreSQL is unavailable it returns a safe `503` response without connection details or stack traces.

## Authentication

LifeTrack uses Auth.js Credentials authentication with Argon2id password hashes. Sessions use Auth.js JWT cookies that are HTTP-only, `SameSite=Lax`, and secure in production. Tokens contain only safe identity claims; protected server layouts resolve the active user from PostgreSQL and reject disabled accounts.

Create an account at `/register`, sign in at `/login`, and access `/dashboard`, `/profile`, `/profile/preferences`, and `/profile/security` after authentication. Registration creates the user, profile, and preferences in one database transaction. Email is intentionally read-only after registration; email verification and password recovery are not part of Phase 2.

Set a distinct `AUTH_SECRET` of at least 32 characters in `.env` and `.env.example`. The lightweight in-memory rate limiter protects registration and password changes in a single app process; production multi-instance deployments should replace it with shared storage.

Every future data query must derive ownership from the authenticated user and scope records by both resource id and `userId`. Never accept a client-provided `userId` as an authorization source.

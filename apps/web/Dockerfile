FROM node:24-bookworm-slim AS base

WORKDIR /app

# ----
FROM base AS prepare

ARG TURBO_VERSION=2.8.13

RUN npm install --global turbo@${TURBO_VERSION}

COPY . .

# Adds lockfile and package.json of the @evently/api workspace and
# Creates a partial monorepo with a pruned lockfile for the @evently/api workspace
RUN turbo prune @evently/web --docker

# ----
FROM base AS builder

COPY --from=prepare /app/out/json .

RUN npm ci

COPY --from=prepare /app/out/full .

RUN npm run build

# ----
FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs web

COPY --from=builder --chown=web:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=web:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=web:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js


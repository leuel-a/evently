FROM node:24-bookworm-slim AS base

WORKDIR /app

# ----
FROM base AS prepare

ARG TURBO_VERSION=2.8.13

RUN npm install --global turbo@${TURBO_VERSION}

COPY . .

# Adds lockfile and package.json of the @evently/api workspace and
# Creates a partial monorepo with a pruned lockfile for the @evently/api workspace
RUN turbo prune @evently/api --docker

# ----
FROM base AS builder

COPY --from=prepare /app/out/json .

RUN npm install

COPY --from=prepare /app/out/full .

RUN npm run build

# ----
FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 --ingroup nodejs api

COPY --from=builder --chown=api:nodejs /app/apps/api/dist ./api
COPY --from=builder --chown=api:nodejs /app/node_modules ./node_modules

CMD node api/app.js

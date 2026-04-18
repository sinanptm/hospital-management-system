# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# Base stage
# -----------------------------------------------------------------------------
# Shared setup for all client stages.
FROM node:22-alpine AS base

WORKDIR /app

# Helps with native-module compatibility when running on Alpine.
RUN apk add --no-cache libc6-compat

# Enable pnpm via Corepack.
RUN corepack enable


# -----------------------------------------------------------------------------
# Dependencies stage
# -----------------------------------------------------------------------------
# Install monorepo dependencies one time and reuse layers.
FROM base AS deps

# Copy only manifests first for better cache reuse.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

# Deterministic dependency install.
RUN pnpm install --frozen-lockfile


# -----------------------------------------------------------------------------
# Development stage
# -----------------------------------------------------------------------------
# Used by docker-compose.dev.yml to run Next.js with hot reload.
FROM deps AS development

COPY . .

# Next.js default port.
EXPOSE 3000

# Run the client workspace in development mode.
CMD ["pnpm", "--filter", "./client", "dev"]


# -----------------------------------------------------------------------------
# Build stage
# -----------------------------------------------------------------------------
# Create optimized Next.js production build.
FROM deps AS builder

COPY . .

# Next.js reads `.env.production` from the app directory at build time.
# In this repository env files live at the repo root, so we copy `.env.client`
# into the location Next.js expects before building.
RUN cp .env.client client/.env.production && pnpm --filter ./client build


# -----------------------------------------------------------------------------
# Production stage
# -----------------------------------------------------------------------------
# Final runtime image for client.
FROM base AS production

ENV NODE_ENV=production

# Reuse dependency tree from deps stage.
COPY --from=deps /app/node_modules /app/node_modules

# Copy built client app output and source needed by next start.
COPY --from=builder /app/client /app/client

EXPOSE 3000

# Run inside client folder so we don't depend on root workspace metadata.
WORKDIR /app/client

# Serve production build.
CMD ["pnpm", "start"]

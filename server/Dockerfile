# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# Base stage
# -----------------------------------------------------------------------------
# We keep common setup (Node version, pnpm setup, work directory) in one place
# so every stage reuses it.
FROM node:22-alpine AS base

# All commands below run from /app unless overridden.
WORKDIR /app

# libc6-compat helps avoid compatibility problems with some Node packages
# that expect glibc behavior on Alpine images.
RUN apk add --no-cache libc6-compat

# This repo uses pnpm. Corepack is bundled with modern Node and can manage pnpm.
RUN corepack enable


# -----------------------------------------------------------------------------
# Dependencies stage
# -----------------------------------------------------------------------------
# Install dependencies once and reuse them in dev/build/prod stages.
FROM base AS deps

# Copy only dependency manifest files first.
# This keeps Docker layer caching effective: dependencies are reinstalled only
# when package manifests/lockfiles change.
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY client/package.json ./client/package.json
COPY server/package.json ./server/package.json

# Install workspace dependencies exactly from lockfile for reproducible builds.
RUN pnpm install --frozen-lockfile


# -----------------------------------------------------------------------------
# Development stage
# -----------------------------------------------------------------------------
# Used by docker-compose.dev.yml for hot-reload development.
FROM deps AS development

# Copy full repository (source code) for dev runtime.
COPY . .

# Server listens on 8000 in this project.
EXPOSE 8000

# Run the server workspace in dev mode (nodemon + ts-node).
CMD ["pnpm", "--filter", "./server", "dev"]


# -----------------------------------------------------------------------------
# Build stage
# -----------------------------------------------------------------------------
# Compile TypeScript to JavaScript (dist/) for production runtime.
FROM deps AS builder

COPY . .

# Build only the server workspace.
RUN pnpm --filter ./server build


# -----------------------------------------------------------------------------
# Production stage
# -----------------------------------------------------------------------------
# Final runtime image:
# - includes installed dependencies
# - includes compiled server output
# - excludes TypeScript source where possible
FROM base AS production

# Explicitly set production mode.
ENV NODE_ENV=production

# Reuse installed dependencies from deps stage.
COPY --from=deps /app/node_modules /app/node_modules

# Copy compiled output and runtime assets needed by the API server.
COPY --from=builder /app/server/dist /app/server/dist
COPY --from=builder /app/server/public /app/server/public
COPY --from=builder /app/server/package.json /app/server/package.json

# Expose API port.
EXPOSE 8000

# Start compiled server.
CMD ["node", "server/dist/index.js"]

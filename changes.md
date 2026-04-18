# Docker Update: What Changed

This file explains all Docker-related changes in simple words.

## 1) New file: `docker-compose.yml`
What it does:
- Runs the full app with Docker containers.
- Starts 3 services together:
  - MongoDB database
  - Backend server (`server`)
  - Frontend client (`client`)

Why it is useful:
- One command can run the full project.
- All services are connected automatically.

## 2) New file: `docker-compose.dev.yml`
What it does:
- Adds development mode settings.
- Uses hot reload for client and server.
- Mounts your local code into containers.

Why it is useful:
- You can edit code and see changes quickly.
- Better local development experience.

## 3) New file: `.dockerignore`
What it does:
- Stops unnecessary files from going into Docker build context.
- Excludes large/unneeded folders like `node_modules`, build outputs, logs.

Why it is useful:
- Faster Docker builds.
- Smaller and cleaner images.

## 4) Updated file: `server/Dockerfile`
What it does:
- Multi-stage Dockerfile for backend.
- Has two targets:
  - `development` for local coding
  - `production` for running compiled backend

Why it is useful:
- Same Dockerfile supports both dev and prod use.
- Clear comments explain every step.

## 5) New/Updated file: `client/Dockerfile`
What it does:
- Multi-stage Dockerfile for frontend (Next.js).
- Has two targets:
  - `development` for local coding
  - `production` for optimized run

Why it is useful:
- Works cleanly with Docker Compose in both modes.
- Build and run steps are documented with comments.

## 6) Updated file: `README.md`
What it does:
- Adds Docker usage section.
- Shows exact commands for:
  - Development mode
  - Production-like mode
  - Logs, stop, cleanup

Why it is useful:
- New developer can start quickly without guessing commands.

## How all these files work together
- `docker-compose.yml` is the base setup.
- `docker-compose.dev.yml` is an extra layer for development.
- `client/Dockerfile` and `server/Dockerfile` define how each app container is built.
- `.dockerignore` keeps Docker builds fast and clean.
- `README.md` tells users what to run.

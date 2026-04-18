# Docker Commands After Update (Simple Guide)

This file tells you which commands to run and what each command means.

## Before you run commands
1. Open Docker Desktop.
2. Wait until Docker is fully running.

## 1) Start in Development Mode (best for coding)
Command:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
What it does:
- Builds images (if needed)
- Starts database + backend + frontend
- Uses dev mode with hot reload

Use this when:
- You are actively writing code.

## 2) Start in Production-Like Mode
Command:
```bash
docker compose up --build -d
```
What it does:
- Builds images
- Starts everything in background (`-d`)
- Runs production targets from Dockerfiles

Use this when:
- You want to test a near-production local setup.

## 3) See Running Logs
Command:
```bash
docker compose logs -f
```
What it does:
- Shows live logs from all containers.

Use this when:
- You want to debug errors or confirm app startup.

## 4) Stop Containers
Command:
```bash
docker compose down
```
What it does:
- Stops and removes running containers.
- Keeps database data volume.

Use this when:
- You are done working for now.

## 5) Stop and Remove Database Data
Command:
```bash
docker compose down -v
```
What it does:
- Stops containers
- Removes volumes too (including MongoDB stored data)

Use this when:
- You want a clean reset.

## 6) Check Final Compose Configuration
Command:
```bash
docker compose -f docker-compose.yml config
```
What it does:
- Validates and prints merged configuration.

Use this when:
- You want to confirm your Compose syntax is correct.

## 7) Check Dev Compose Merge Configuration
Command:
```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml config
```
What it does:
- Validates how base + dev files merge together.

Use this when:
- You want to verify dev setup before running it.

## Quick Access URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- MongoDB: mongodb://localhost:27017

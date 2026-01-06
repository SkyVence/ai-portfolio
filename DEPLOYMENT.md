# Deployment Guide

Deploy the portfolio to `skyvence.dev` using Docker.

## Prerequisites

- Docker and Docker Compose installed on VPS
- External `proxy` network exists (shared with reverse proxy)
- Reverse proxy configured to route traffic to `portfolio` container on port 80

## CI/CD Pipeline

Images are automatically built and pushed to GitHub Container Registry on every push to `main`.

- **Registry:** `ghcr.io/skyvence/ai-portfolio`
- **Tags:** `latest`, `<commit-sha>`
- **Workflow:** `.github/workflows/docker-build.yml`

## Files Overview

| File | Purpose |
|------|---------|
| `Dockerfile` | Builds nginx alpine image with static files |
| `docker-compose.yml` | Container orchestration (pulls from GHCR) |
| `nginx.conf` | Internal nginx config (gzip, caching, security headers) |
| `.dockerignore` | Excludes unnecessary files from build |
| `.github/workflows/docker-build.yml` | GitHub Action for CI/CD |

## Deployment Steps

### 1. Copy docker-compose.yml to VPS

```bash
scp docker-compose.yml user@skyvence.dev:/opt/portfolio/
```

### 2. Pull and start container

```bash
ssh user@skyvence.dev
cd /opt/portfolio
docker compose pull
docker compose up -d
```

### 3. Verify deployment

```bash
# Check container is running
docker compose ps

# Check logs
docker compose logs -f

# Test health endpoint (from within proxy network)
docker exec portfolio curl -s localhost/health
```

## Updates

Updates are automatic via GitHub Actions. To deploy the latest version on VPS:

```bash
cd /opt/portfolio
docker compose pull
docker compose up -d
```

## Commands Reference

```bash
# Stop
docker compose down

# Restart
docker compose restart

# View logs
docker compose logs -f portfolio

# Pull latest image
docker compose pull

# Remove old images
docker image prune -f
```

## Container Details

- **Image:** `ghcr.io/skyvence/ai-portfolio:latest`
- **Name:** `portfolio`
- **Internal port:** 80
- **Network:** `proxy` (external)
- **Base image:** `nginx:alpine`
- **Health check:** `GET /health`

## Troubleshooting

**Container not starting:**
```bash
docker compose logs portfolio
```

**Network issues:**
```bash
# Verify proxy network exists
docker network ls | grep proxy

# Create if missing
docker network create proxy
```

**Authentication issues with GHCR:**
```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
```

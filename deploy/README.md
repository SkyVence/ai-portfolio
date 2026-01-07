# Docker Deployment Options

This folder contains different deployment configurations for the AI Portfolio.

## Deployment Methods

### 1. Standalone Docker Run

Run the container directly with Docker:

```bash
docker run -d \
  --name ai-portfolio \
  -p 8080:80 \
  --restart unless-stopped \
  ghcr.io/skyvence/ai-portfolio:latest
```

Access the site at `http://localhost:8080`

### 2. Docker Compose

For standard Docker Compose deployments:

```bash
docker compose -f deploy/docker-compose.yml up -d
```

This exposes the site on port 8080.

### 3. Docker Stack (Swarm)

For Docker Swarm deployments with an existing proxy network:

```bash
docker stack deploy -c deploy/docker-stack.yml ai-portfolio
```

**Note:** This configuration assumes:
- An external `proxy-net` network exists
- A reverse proxy is already configured
- Shepherd labels for auto-updates are included

## Building the Image Locally

```bash
docker build -t ai-portfolio:local .
```

Then run with:

```bash
docker run -d --name ai-portfolio -p 8080:80 ai-portfolio:local
```

## Environment Variables

No environment variables are required for basic deployment.

## Stopping/Removing

### Standalone
```bash
docker stop ai-portfolio && docker rm ai-portfolio
```

### Docker Compose
```bash
docker compose -f deploy/docker-compose.yml down
```

### Docker Stack
```bash
docker stack rm ai-portfolio
```

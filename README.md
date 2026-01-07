# AI Portfolio

[![Build and Push Docker Image](https://github.com/skyvence/ai-portfolio/actions/workflows/docker-build.yml/badge.svg)](https://github.com/skyvence/ai-portfolio/actions/workflows/docker-build.yml)
[Hosted Version](https://skyvence.dev/)

A dark-themed portfolio website built entirely through AI prompts as an educational experiment in prompt engineering and LLM agent interaction.

## Quick Start

```bash
# Local development
bun serve .

# Deploy via Docker (standalone)
docker run -d --name ai-portfolio -p 8080:80 ghcr.io/skyvence/ai-portfolio:latest

# Deploy via Docker Compose
docker compose -f deploy/docker-compose.yml up -d

# Deploy via Docker Stack (Swarm)
docker stack deploy -c deploy/docker-stack.yml ai-portfolio
```

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Tailwind CSS v4 (CDN)
- Docker + nginx:alpine
- GitHub Actions CI/CD

## Project Structure

```
ai-portfolio/
├── index.html          # Main portfolio page
├── why.html            # Project transparency page
├── css/style.css       # Custom styles
├── js/main.js          # Animations & interactivity
├── img/                # Images
├── deploy/             # Docker deployment configs
│   ├── docker-compose.yml   # Standard Docker Compose
│   ├── docker-stack.yml     # Docker Swarm stack
│   └── README.md            # Deployment documentation
├── Dockerfile          # Container build
└── nginx.conf          # Nginx configuration
```

## Documentation

- [AGENTS.md](AGENTS.md) - AI coding agent guidelines
- [deploy/README.md](deploy/README.md) - Docker deployment options
- [prompt.md](prompt.md) - Complete prompt history
- [why.html](why.html) - Project transparency page

## License

MIT

# Docker Setup for Attendance System

This project has been dockerized with separate containers for the client (Next.js) and server (Express.js).

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (usually included with Docker Desktop)

## Quick Start

### Build and Run with Docker Compose

1. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

2. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

### Access the Applications

- **Client (Next.js):** http://localhost:3000
- **Server (Express API):** http://localhost:5000

## Individual Service Commands

### Build individual services

```bash
# Build client only
docker-compose build client

# Build server only
docker-compose build server
```

### Run individual services

```bash
# Run client only
docker-compose up client

# Run server only
docker-compose up server
```

## Development Mode

For development with hot-reload, you may want to use volumes (already configured in docker-compose.yml). The volumes allow you to edit code locally and see changes without rebuilding the containers.

## Production Build

For production, you should:

1. Remove the volumes from `docker-compose.yml` (they're currently included for development)
2. Ensure environment variables are properly set
3. Build with production optimizations:
   ```bash
   docker-compose -f docker-compose.yml build
   docker-compose -f docker-compose.yml up -d
   ```

## Environment Variables

You can create a `.env` file in the root directory or set environment variables in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - PORT=5000
  - NEXT_PUBLIC_API_URL=http://server:5000
```

## Troubleshooting

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs client
docker-compose logs server

# Follow logs
docker-compose logs -f
```

### Rebuild from scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Access container shell
```bash
# Client container
docker-compose exec client sh

# Server container
docker-compose exec server sh
```

## Notes

- The client is configured to use `standalone` output mode for optimal Docker deployment
- Both services run as non-root users for security
- The services communicate via the `attendance-network` Docker network
- Client can access server using the hostname `server` (as defined in docker-compose.yml)


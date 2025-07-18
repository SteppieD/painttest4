#!/bin/bash

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Stop any existing containers
docker-compose down 2>/dev/null || true

# Build and run
echo "Building and starting Paint Quote Pro with Docker..."
docker-compose up --build

# Alternative: Run in detached mode
# docker-compose up --build -d
# echo "Paint Quote Pro is running at http://localhost:3001"
# echo "To view logs: docker-compose logs -f"
# echo "To stop: docker-compose down"
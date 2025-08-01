#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🐳 Starting PaintQuote Pro Docker Test Environment${NC}"
echo "=================================================="

# Clean up any existing containers
echo -e "${YELLOW}📦 Cleaning up existing containers...${NC}"
docker-compose -f docker-compose.test.yml down -v

# Build the containers
echo -e "${YELLOW}🔨 Building Docker containers...${NC}"
docker-compose -f docker-compose.test.yml build

# Start the development server
echo -e "${YELLOW}🚀 Starting development server...${NC}"
docker-compose -f docker-compose.test.yml up -d paintquote-dev

# Wait for the server to be ready
echo -e "${YELLOW}⏳ Waiting for server to be ready...${NC}"
max_attempts=30
attempt=0
while ! docker-compose -f docker-compose.test.yml exec paintquote-dev wget -q --spider http://localhost:3000/api/health 2>/dev/null; do
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        echo -e "${RED}❌ Server failed to start after 30 attempts${NC}"
        docker-compose -f docker-compose.test.yml logs paintquote-dev
        exit 1
    fi
    echo -n "."
    sleep 2
done
echo -e "\n${GREEN}✅ Server is ready!${NC}"

# Check for build errors
echo -e "${YELLOW}🔍 Checking for build errors...${NC}"
docker-compose -f docker-compose.test.yml logs paintquote-dev | grep -i "error" | grep -v "Error: " || echo -e "${GREEN}✅ No build errors found${NC}"

# Run tests if requested
if [ "$1" == "--test" ]; then
    echo -e "${YELLOW}🧪 Running Playwright tests...${NC}"
    docker-compose -f docker-compose.test.yml --profile test up playwright-tests
    
    # Check test results
    if [ -f "./playwright-report/index.html" ]; then
        echo -e "${GREEN}📊 Test report generated at: ./playwright-report/index.html${NC}"
    fi
fi

# Show logs if requested
if [ "$1" == "--logs" ]; then
    docker-compose -f docker-compose.test.yml logs -f paintquote-dev
else
    echo -e "${GREEN}✅ Development server is running at: http://localhost:3000${NC}"
    echo -e "${YELLOW}📝 To view logs: ./run-docker-tests.sh --logs${NC}"
    echo -e "${YELLOW}🧪 To run tests: ./run-docker-tests.sh --test${NC}"
    echo -e "${YELLOW}🛑 To stop: docker-compose -f docker-compose.test.yml down${NC}"
fi